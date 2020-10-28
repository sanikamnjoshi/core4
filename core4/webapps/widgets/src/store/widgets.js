import api from '@/store/api.js'
import router from '@/router'
// import { axiosInternal } from 'core4ui/core4/internal/axios.config.js'
import _ from 'lodash'
import Vue from 'vue'
import bus from 'core4ui/core4/event-bus.js'
import { replacePort } from '@/plugins/fixme.js'
import axios from 'axios'
const user = JSON.parse(window.localStorage.getItem('user')) || {}
const axiosInstance = axios.create({
  timeout: 5000,
  headers: { Authorization: `Bearer ${user.token}` }
})

function swap (item, oldIndex, newIndex) {
  const temp = item[oldIndex]

  item[oldIndex] = item[newIndex]
  item[newIndex] = temp
}
let ti
const state = {
  widgets: [],
  boards: [],
  board: null,
  tags: []
/*   client: {
    logo: 'targobank-logo.svg'
  } */
}

const actions = {
  async initApp (context) {
    await context.dispatch('fetchBoards')
    // await context.dispatch('fetchWidgets')
    return true
  },
  async fetchTags (context) {
    try {
      const tags = await api.fetchTags()
      let tags2 = Object.entries(tags)
        .map(val => {
          return Object.assign(val[1], { label: val[0] })
        })
        .filter(val => {
          return ['app', 'api', 'new'].includes(val.label)
        })
      tags2.unshift({
        label: 'all',
        default: true,
        count: -1
      })
      tags2 = tags2.map(val => {
        return Object.assign(val, { value: val.label })
      })
      context.commit('setTags', tags2)
    } catch (err) {}
  },
  async fetchBoards (context, config = { type: 'full' }) {
    window.clearTimeout(ti)
    const boards = await api.fetchBoards()
    context.commit('setBoards', boards.boards)
    //  wait for route params
    if (config.type === 'full') {
      ti = window.setTimeout(function () {
        context.dispatch('setActiveBoard', boards.board)
      }, 25)
    }
    return boards.boards
  },
  async sortBoard (context, dto) {
    const { oldIndex, newIndex } = dto
    const boardComplete = _.cloneDeep(
      context.state.boards.find(val => val.name === context.state.board)
    )
    swap(boardComplete.widgets, oldIndex, newIndex)
    context.commit('setBoard', boardComplete)
    try {
      await api.updateBoard({
        boards: context.state.boards
      })
    } catch (err) {
      console.error(err)
    }
  },
  async removeFromBoard (context, widgetId) {
    context.commit('removeFromBoard', widgetId)

    try {
      await api.updateBoard({
        boards: context.state.boards
      })
    } catch (err) {
      console.error(console.error)
    }
  },
  async setActiveBoard (context, board) {
    context.commit('setActiveBoard', board)
    context.dispatch('fetchWidgets')
    if (router.history.current.params.board !== board) {
      router.push({ name: 'Home', params: { board } })
    }
    await api.persistOptions({
      board
    })
    return true
  },

  async fetchWidgets (context) {
    const boardComplete = context.state.boards.find(
      val => val.name === context.state.board
    )
    // TODO - queue this
    // let modernize = false
    const w = _.cloneDeep(boardComplete.widgets).map(val => {
      if (typeof val === 'string') {
        // modernize = true
        return val
      }
      val.icon = val.icon || 'mdi-copyright'
      val.description = val.description || ''
      val.description_html = val.description_html || ''
      val.html = val.html || null
      val.custom_card = val.custom_card || false
      val.error = null
      return val
    })

    context.commit('setWidgets', w)
    boardComplete.widgets.forEach(val => {
      // update existing widgets in boards to be in obj format
      const id = typeof val === 'string' ? val : val.rsc_id
      context.dispatch('fetchWidget', {
        endpoint: replacePort(val.endpoint[0]), // dev server mac localhost workaround / hack
        id,
        accept: 'application/json'
      })
    })
  },
  async fetchWidget (
    context,
    config = {
      id: -1,
      accept: 'application/json',
      endpoint: ''
    }
  ) {
    let widget
    const { id, accept, endpoint } = config
    try {
      widget = await axiosInstance.get(`${endpoint}/_info/card/${id}`, {
        headers: { common: { Accept: accept } }
      })
      widget = widget.data
      if (widget.custom_card === true) {
        const html = await context.dispatch('fetchHtmlWidget', {
          id,
          accept: 'text/html',
          endpoint
        })
        widget = Object.assign({}, widget, { html })
      }
      context.commit('preAddWidget', widget)
    } catch (error) {
      context.commit('preAddWidget', {
        rsc_id: id,
        error
      })
    }
    return widget
  },
  async fetchHtmlWidget (
    context,
    config = {
      id: -1,
      accept: 'application/json',
      endpoint: ''
    }
  ) {
    const { id, accept, endpoint } = config
    try {
      const ret = await axiosInstance.get(`${endpoint}/_info/card/${id}`, {
        headers: { common: { Accept: accept } }
      })
      return ret.data
    } catch (error) {
      return {
        rsc_id: id,
        error
      }
    }
  },

  async createBoard ({ commit, getters, state }, dto) {
    const exists = state.boards.find(val => {
      return val.name === dto.board
    })
    let boards = _.cloneDeep(state.boards) || []
    if (exists != null) {
      throw new Error('Board exists') // do not change message
    } else {
      const nb = {
        name: dto.board,
        widgets: []
      }
      boards = boards.concat([nb])
      await api.createBoard(boards)
      commit('setBoards', boards)
    }
    return boards
  },
  async editBoard (context, dto) {
    try {
      let boards = _.cloneDeep(state.boards) || []
      boards = boards.map(val => {
        if (val.name === dto.oldName) {
          val.name = dto.board
        }
        return val
      })
      context.commit('setBoards', boards)
      await api.createBoard(boards)
      // this is the active board
      if (context.state.board === dto.oldName) {
        context.commit('setActiveBoard', dto.board)
        await api.persistOptions({
          board: dto.board
        })
        if (router.history.current.params.board !== dto.board) {
          router.push({ name: 'Home', params: { board: dto.board } })
        }
      }
      return true
    } catch (err) {
      Vue.prototype.raiseError(err)
      return false
    }
  },

  async updateBoard (context, delta) {
    const boardWithWidgets = _.cloneDeep(context.getters.boardWithWidgets)
    const toAdd = []
    let toRemove = 0
    delta.forEach(val => {
      const isAdded = boardWithWidgets.widgets.find(
        val2 => val2.rsc_id === val.rsc_id
      )
      if (isAdded) {
        boardWithWidgets.widgets = boardWithWidgets.widgets.filter(
          val2 => val2.rsc_id !== val.rsc_id
        )
        context.commit('removeFromBoard', val.rsc_id)
        toRemove++
      } else {
        boardWithWidgets.widgets.push(val)
        toAdd.push(val)
      }
    })
    context.commit('addToBoard', toAdd)
    // ajax, perist
    try {
      await api.updateBoard({
        boards: context.state.boards
      })
    } catch (err) {
      console.error(err)
    }
    toAdd.forEach(val => {
      context.dispatch('fetchWidget', {
        id: val.rsc_id,
        accept: 'application/json',
        endpoint: replacePort(val.endpoint[0])// .replace('5001', '8080') // dev server port
      })
    })
    let text = 'Board updated. '
    if (toAdd.length) {
      text += `${toAdd.length} widget${toAdd.length > 1 ? 's' : ''} added. `
    }
    if (toRemove > 0) {
      text += `${toRemove} widget${toRemove > 1 ? 's' : ''} removed.`
    }
    bus.$emit('SHOW_NOTIFICATION', {
      type: 'success',
      text
    })
    return true
  }
}

const mutations = {
  setBoard (state, board) {
    state.boards = state.boards.map(val => {
      if (val.name === board.name) {
        return board
      }
      return val
    })
  },

  setTags (state, tags) {
    state.tags = tags
  },
  preAddWidget (state, widget) {
    const added =
      state.widgets.find(val => val.rsc_id === widget.rsc_id) != null
    if (added) {
      state.widgets = state.widgets.map(val => {
        if (val.rsc_id === widget.rsc_id) {
          return Object.assign(val, widget)
        }
        return val
      })
    } else {
      state.widgets.push(widget)
    }
  },
  addToBoard (state, widgets) {
    state.boards = state.boards.map(val => {
      if (val.name === state.board) {
        const w = val.widgets.concat(widgets)
        val.widgets = w
      }
      return val
    })
  },
  removeFromBoard (state, id) {
    const b = state.boards.map(val => {
      if (val.name === state.board) {
        val.widgets = val.widgets.filter(val2 => {
          const id2 = typeof val2 === 'string' ? val2 : val2.rsc_id
          return id2 !== id
        })
      }
      return val
    })
    state.boards = b
    state.widgets = state.widgets.filter(val => val.rsc_id !== id)
  },
  setWidgets (state, payload) {
    state.widgets = payload
  },
  setBoards (state, payload) {
    state.boards = payload
  },
  setActiveBoard (state, payload) {
    state.board = payload
  }
}

const getters = {
  widgetById: state => id => {
    return state.widgets.find(val => {
      return val.rsc_id === id
    })
  },
  widgets (state) {
    return state.widgets
  },
  boards () {
    return state.boards
  },
  board () {
    return state.board
  },
  boardWithWidgets () {
    return state.boards.find(val => val.name === state.board)
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
