// import { BUSY_ON, BUSY_OFF } from '@/external/types.js'
import api, { getSSE } from '@//api/api2.js'
import { extractError, formatDate } from '@/components/misc/helper.js'
import _ from 'lodash'
import store from '@/store'
import Vue from 'vue'

let sses = []
// let ti,
let tiFetchJobs
function clearSSE (e) {
  try {
    if (e != null) {
      e.source.removeEventListener('log')
      e.source.removeEventListener('update')
      e.source.removeEventListener('state')
      e.source.removeEventListener('close')
      e.source.removeEventListener('error')
      e.source.close()
    } else {
      sses.forEach(sse => {
        sse.removeEventListener('log')
        sse.removeEventListener('update')
        sse.removeEventListener('state')
        sse.removeEventListener('close')
        sse.removeEventListener('error')
        sse.close()
      })
      sses = []
    }
  } catch (err) {}
}
function onSseError (e) {
  if (typeof e.error === 'string') {
    const extracted = JSON.parse(e.error)
    const errorRaw = extractError(extracted.error)
    store.commit('jobs/addError', errorRaw)
  }
}
const state = {
  pagination: {
    descending: true,
    page: 0,
    itemsPerPage: 10,
    rowsPerPageItems: [10, 25, 50, -1],
    totalJobs: 0
  },
  jobDetailDialogOpen: false,
  filter: null,
  log: '',
  error: null,
  job: { _id: null, args: '' },
  jobs: [],
  jobManagerBusy: false
}

const actions = {
  /**
   * Error occured in sse, add extracted errormessages,
   * which is meant to be displayed in components validation
   *
   */
  clearJobError (context) {
    context.commit('addError', null)
  },
  clearJob (context, sse) {
    context.commit('clearJob', null)
    context.commit('clearJobs')
    context.commit('clearLog')
    context.commit('addStateFilter', null)
    // window.clearTimeout(ti)
    window.clearTimeout(tiFetchJobs)
    if (sses.length > 0) {
      clearSSE()
    }
    return true
  },
  addLog (context, payload) {
    context.commit('addLog', payload)
  },
  setJob (context, job) {
    context.commit('setJob', job)
    context.dispatch('logJob', job._id)
  },
  async fetchJob (context, id) {
    const job = await api.get(`job/${id}`)
    context.commit('setJob', job.data)
    return job.data
  },
  async fetchJobArgs (context, id) {
    const job = await api.get(`job/${id}`)
    context.commit('setJobArgs', job.data.args)
  },
  logJob (context, jobId = null) {
    context.commit('clearLog')
    const id = jobId || state.job._id
    const token = JSON.parse(localStorage.getItem('user')).token
    const sse = getSSE({
      endpoint: `job/follow/${id}?token=${token}`,
      json: null,
      GET: true
    })
    sses.push(sse)
    sse.addEventListener('log', e => {
      const json = JSON.parse(e.data)
      const { message, epoch } = json
      context.dispatch('addLog', {
        message,
        date: formatDate(new Date(epoch * 1000))
      })
    })
    sse.addEventListener('error', onSseError)
    sse.addEventListener('close', clearSSE)
    sse.stream()
  },
  /*   logJob2 (context, jobId = null) {
    context.commit('clearLog')
    const id = jobId || state.job._id
    const token = JSON.parse(localStorage.getItem('user')).token
    const json = {
      identifier: id,
      start: state.job.started_at
    }
    const sse = getSSE({
      endpoint: `log?token=${token}`,
      json
    })
    sses.push(sse)
    sse.addEventListener('log', e => {
      const json = JSON.parse(e.data)
      const { message, epoch } = json
      context.dispatch('addLog', {
        message,
        date: formatDate(new Date(epoch * 1000))
        // level
      })
    })
    sse.addEventListener('error', onSseError)
    sse.addEventListener('close', clearSSE)
    sse.stream()
  }, */
  updateJob (context, delta) {
    context.commit('updateJob', delta)
  },
  /**
   * Used for sse on new enqueued job
   * Use on existing job group
   *
   */
  pollEnqueuedJob (
    context,
    conf = {
      job: null,
      follow: true
    }
  ) {
    return new Promise((resolve, reject) => {
      context.commit('addError', null)
      context.commit('clearJob')
      const token = JSON.parse(localStorage.getItem('user')).token
      let endpoint
      if (conf.follow === true) {
        endpoint = `job/follow/${conf.job._id}?token=${token}`
      } else {
        endpoint = `job/${conf.job._id}?token=${token}`
      }
      const sse = getSSE({
        endpoint
      })

      sse.addEventListener('state', function (e) {
        const delta = JSON.parse(e.data)
        context.dispatch('updateJob', delta)
      })
      /*     sse.addEventListener('update', function (e) {
        const delta = JSON.parse(e.data)
        context.dispatch('updateJob', delta)
      }) */
      sse.addEventListener('log', function (e) {
        const json = JSON.parse(e.data)
        const message = {
          message: json.message,
          date: formatDate(new Date()),
          level: null
        }
        context.dispatch('addLog', message)
      })
      sse.addEventListener('error', e => {
        onSseError(e)
      })
      sse.addEventListener('close', clearSSE)
      sse.stream()
      sses.push(sse)
    })
  },
  async enqueueJob (context, payload) {
    context.dispatch('clearJob')
    const name = payload.job
    const args = payload.args
    const dto = Object.assign({}, { args }, { qual_name: name, follow: false })
    let jobId

    try {
      const ret = await api.post('job', dto)
      jobId = ret.data
      const jobPre = { _id: jobId, name, qual_name: name }
      context.commit('setJob', jobPre) // only name, id, triggers dialog to open, starts logging
      context.dispatch('fetchJob', jobId).then(val => {
        context.commit('setJobs', [val])
      })
      context.dispatch('pollEnqueuedJob', {
        job: jobPre,
        follow: true
      })
      context.dispatch('pollEnqueuedJob', {
        job: jobPre,
        follow: false
      })
      return true
    } catch (error) {
      const errorRaw = extractError(error.response.data.error)
      store.commit('jobs/addError', errorRaw)
    }
  },
  async openJobsDialog (context, job) {
    context.dispatch('setJob', _.cloneDeep(job))
    context.commit('setJobsDialogOpen', true)
  },
  async fetchJobsByName (context, job) {
    let name
    try {
      name = (job || {}).name || context.state.job.qual_name || context.state.job.name
    } catch (err) {
      name = ''
    }

    const params = {
      per_page: 1000,
      page: 0,
      filter: {
        name
      }
    }
    /// const jobs = await api.post('jobs?per_page=1000&page=0', json)
    const jobs = await api.get('job/queue', params)
    // clicked state first, then other states
    const sortedJobs = jobs.data.sort(function compare (a, b) {
      if (a.state === job.state) {
        return -1
      }
      if (a.state !== job.state) {
        return 1
      }
      return 0
    })
    context.commit('setJobs', sortedJobs)
    if (jobs.data.length > 0) {
      // select by state
      const selected = jobs.data.find(val => val.state === job.state)
      context.dispatch('setJob', _.cloneDeep(selected || jobs.data[0]))
    }
  },
  async addStateFilter (context, states) {
    context.commit('addStateFilter', states)
  },
  async setJobManagerBusy (context, val) {
    context.commit('setJobManagerBusy', val)
  },
  async manageJob (context, action = 'restart') {
    context.commit('setJobManagerBusy', true)
    window.clearTimeout(tiFetchJobs)
    const current = _.cloneDeep(context.state.job)
    try {
      const param = action === 'restart' ? '?follow=false' : ''
      await api.put(`job/${action}/${context.state.job._id}${param}`)
      tiFetchJobs = window.setTimeout(function () {
        context.dispatch('fetchJobsByName', current)
      }, 500)
    } catch (err) {
      Vue.prototype.raiseError(err)
    } finally {
      context.commit('setJobManagerBusy', false)
    }
  }
}

const mutations = {
  setJobManagerBusy (state, payload) {
    state.jobManagerBusy = payload
  },
  addStateFilter (state, payload) {
    state.filter = payload
  },
  addLog (state, payload) {
    state.log =
      (state.log || '') + payload.date + ' | ' + payload.message + '\n'
  },
  clearLog (state, payload) {
    state.log = []
  },

  addError (state, payload) {
    state.error = payload
  },
  clearJobs (state) {
    state.jobs = []
  },
  clearJob (state) {
    state.job = { _id: null }
  },
  removeJob (state, id) {
    state.jobs = state.jobs.filter(val => val._id !== id)
    if (state.job._id === id) {
      state.job = state.jobs[0] || null
    }
  },
  updateJob (state, delta) {
    state.jobs = state.jobs.map(val => {
      if (val._id === delta._id) {
        val = _.merge(val, delta)
        if (val.state === 'complete') {
          val.prog.value = 1
        }
        if (state.job._id === delta._id) {
          state.job = val
        }
      }
      return val
    })
  },
  setJobs (state, payload) {
    state.jobs = payload || []
  },
  setJob (state, payload) {
    state.job = payload
  },
  setJobArgs (state, args) {
    state.job.args = args
  }
}

const getters = {
  jobDetailDialogOpen (state) {
    return state.jobDetailDialogOpen
  },
  totalJobs (state) {
    return state.pagination.totalJobs
  },
  jobRowsPerPageItems (state) {
    return state.pagination.rowsPerPageItems
  },
  //
  job (state) {
    return state.job
  },
  jobManagerBusy (state) {
    return state.jobManagerBusy
  },

  filter (state) {
    return state.filter
  },
  jobs (state) {
    return state.jobs
  },
  filteredJobs (state) {
    if (state.filter != null && Array.isArray(state.filter)) {
      return state.jobs.filter(val => {
        if (state.filter.includes(val.state)) {
          return true
        }
        return false
      })
    }
    return state.jobs
  },
  log (state) {
    return state.log
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
