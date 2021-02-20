(function(e){function t(t){for(var n,a,c=t[0],s=t[1],u=t[2],d=0,l=[];d<c.length;d++)a=c[d],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&l.push(o[a][0]),o[a]=0;for(n in s)Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n]);p&&p(t);while(l.length)l.shift()();return i.push.apply(i,u||[]),r()}function r(){for(var e,t=0;t<i.length;t++){for(var r=i[t],n=!0,a=1;a<r.length;a++){var c=r[a];0!==o[c]&&(n=!1)}n&&(i.splice(t--,1),e=s(s.s=r[0]))}return e}var n={},a={app:0},o={app:0},i=[];function c(e){return s.p+"js/"+({help:"help",home:"home"}[e]||e)+".js"}function s(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.e=function(e){var t=[],r={help:1,home:1};a[e]?t.push(a[e]):0!==a[e]&&r[e]&&t.push(a[e]=new Promise((function(t,r){for(var n="css/"+({help:"help",home:"home"}[e]||e)+".css",o=s.p+n,i=document.getElementsByTagName("link"),c=0;c<i.length;c++){var u=i[c],d=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(d===n||d===o))return t()}var l=document.getElementsByTagName("style");for(c=0;c<l.length;c++){u=l[c],d=u.getAttribute("data-href");if(d===n||d===o)return t()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=t,p.onerror=function(t){var n=t&&t.target&&t.target.src||o,i=new Error("Loading CSS chunk "+e+" failed.\n("+n+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=n,delete a[e],p.parentNode.removeChild(p),r(i)},p.href=o;var f=document.getElementsByTagName("head")[0];f.appendChild(p)})).then((function(){a[e]=0})));var n=o[e];if(0!==n)if(n)t.push(n[2]);else{var i=new Promise((function(t,r){n=o[e]=[t,r]}));t.push(n[2]=i);var u,d=document.createElement("script");d.charset="utf-8",d.timeout=120,s.nc&&d.setAttribute("nonce",s.nc),d.src=c(e);var l=new Error;u=function(t){d.onerror=d.onload=null,clearTimeout(p);var r=o[e];if(0!==r){if(r){var n=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+n+": "+a+")",l.name="ChunkLoadError",l.type=n,l.request=a,r[1](l)}o[e]=void 0}};var p=setTimeout((function(){u({type:"timeout",target:d})}),12e4);d.onerror=d.onload=u,document.head.appendChild(d)}return Promise.all(t)},s.m=e,s.c=n,s.d=function(e,t,r){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(r,n,function(t){return e[t]}.bind(null,n));return r},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],d=u.push.bind(u);u.push=t,u=u.slice();for(var l=0;l<u.length;l++)t(u[l]);var p=d;i.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"29bb":function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));r("c975"),r("ac1f"),r("5319");function n(e){var t=window.location.port;return 0===t.indexOf("80")?e.replace("5001","8080"):e}},4360:function(e,t,r){"use strict";var n,a=r("a026"),o=r("2f62"),i=(r("a4d3"),r("e01a"),r("99af"),r("4de4"),r("7db0"),r("4160"),r("d81d"),r("b0c0"),r("4fad"),r("159b"),r("96cf"),r("1da1")),c=r("c151"),s=r("a18c"),u=r("2ef0"),d=r.n(u),l=r("e3c5"),p=r("29bb"),f=r("bc3a"),m=r.n(f),b=JSON.parse(window.localStorage.getItem("user"))||{},h=m.a.create({headers:{Authorization:"Bearer ".concat(b.token)}}),g={widgets:[],boards:null,board:null,tags:[]},v={initApp:function(e){return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.dispatch("fetchBoards");case 2:return t.abrupt("return",!0);case 3:case"end":return t.stop()}}),t)})))()},fetchTags:function(e){return Object(i["a"])(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,c["a"].fetchTags();case 3:r=t.sent,n=Object.entries(r).map((function(e){return Object.assign(e[1],{label:e[0]})})),n=n.map((function(e){return Object.assign(e,{value:"all"===e.label?"":e.label})})),e.commit("setTags",n),t.next=11;break;case 9:t.prev=9,t.t0=t["catch"](0);case 11:case"end":return t.stop()}}),t,null,[[0,9]])})))()},clearWidgets:function(e){return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})))()},fetchBoards:function(e){var t=arguments;return Object(i["a"])(regeneratorRuntime.mark((function r(){var a,o;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return a=t.length>1&&void 0!==t[1]?t[1]:{type:"full"},window.clearTimeout(n),r.next=4,c["a"].fetchBoards();case 4:return o=r.sent,e.commit("setBoards",o.boards),"full"===a.type&&(n=window.setTimeout((function(){e.dispatch("setActiveBoard",o.board)}),25)),r.abrupt("return",o.boards);case 8:case"end":return r.stop()}}),r)})))()},sortBoard:function(e,t){return Object(i["a"])(regeneratorRuntime.mark((function r(){var n,a,o;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return t.oldIndex,t.newIndex,n=t.newSort,a=e.state.boards.find((function(t){return t.name===e.state.board})),a=d.a.cloneDeep(a),o=n.map((function(e){return a.widgets.find((function(t){return t.rsc_id===e}))})),a.widgets=o,e.commit("setBoard",a),e.commit("setWidgets",o),o.filter((function(e){return e.custom_card})).forEach((function(t){e.dispatch("fetchWidget",{endpoint:Object(p["a"])(t.endpoint[0]),id:t.rsc_id,accept:"application/json"})})),r.prev=8,r.next=11,c["a"].updateBoard({boards:e.state.boards});case 11:r.next=16;break;case 13:r.prev=13,r.t0=r["catch"](8),console.error(r.t0);case 16:case"end":return r.stop()}}),r,null,[[8,13]])})))()},removeFromBoard:function(e,t){return Object(i["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return e.commit("removeFromBoard",t),r.prev=1,r.next=4,c["a"].updateBoard({boards:e.state.boards});case 4:r.next=9;break;case 6:r.prev=6,r.t0=r["catch"](1),console.error(console.error);case 9:case"end":return r.stop()}}),r,null,[[1,6]])})))()},setActiveBoard:function(e,t){return Object(i["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return e.commit("setActiveBoard",t),e.dispatch("fetchWidgets"),s["a"].history.current.params.board!==t&&s["a"].push({name:"Home",params:{board:t}}),r.next=5,c["a"].persistOptions({board:t});case 5:return r.abrupt("return",!0);case 6:case"end":return r.stop()}}),r)})))()},fetchWidgets:function(e){return Object(i["a"])(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:r=e.state.boards.find((function(t){return t.name===e.state.board}));try{n=d.a.cloneDeep(r.widgets).map((function(e){return e.icon=e.icon||"mdi-copyright",e.description=e.description||"",e.custom_card=e.custom_card||!1,e.res=null,e.error=null,e})),e.commit("setWidgets",n),r.widgets.forEach((function(t){var r="string"===typeof t?t:t.rsc_id;e.dispatch("fetchWidget",{endpoint:Object(p["a"])(t.endpoint[0]),id:r,accept:"application/json"})}))}catch(o){a["default"].prototype.raiseError(new Error("Board not found."))}case 2:case"end":return t.stop()}}),t)})))()},fetchWidget:function(e){var t=arguments;return Object(i["a"])(regeneratorRuntime.mark((function r(){var n,a,o,i,c;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return n=t.length>1&&void 0!==t[1]?t[1]:{id:-1,accept:"application/json",endpoint:""},o=n.id,i=n.accept,c=n.endpoint,r.prev=2,r.next=5,h.get("".concat(c,"/_info/card/").concat(o),{headers:{common:{Accept:i}}});case 5:a=r.sent,a=a.data,e.commit("preAddWidget",a),r.next=13;break;case 10:r.prev=10,r.t0=r["catch"](2),e.commit("preAddWidget",{rsc_id:o,error:r.t0});case 13:return r.abrupt("return",a);case 14:case"end":return r.stop()}}),r,null,[[2,10]])})))()},fixWidget:function(e,t){return Object(i["a"])(regeneratorRuntime.mark((function r(){var n,o,i,s;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return n={search:t.title,tags:[],page:0,per_page:1},r.prev=1,r.next=4,c["a"].searchWidgets(n);case 4:if(o=r.sent,!(o.data.length>0)){r.next=23;break}return i=o.data[0],s=t,e.commit("addToBoard",[i]),e.commit("removeFromBoard",s.rsc_id),r.next=12,e.dispatch("fetchWidget",{id:i.rsc_id,accept:"application/json",endpoint:Object(p["a"])(i.endpoint[0])});case 12:return r.prev=12,r.next=15,c["a"].updateBoard({boards:e.state.boards});case 15:r.next=20;break;case 17:r.prev=17,r.t0=r["catch"](12),a["default"].prototype.raiseError(r.t0);case 20:return r.abrupt("return",!0);case 23:window.alert("Not possible to fix the broken widget.");case 24:r.next=29;break;case 26:r.prev=26,r.t1=r["catch"](1),console.log(r.t1);case 29:return r.abrupt("return",!1);case 30:case"end":return r.stop()}}),r,null,[[1,26],[12,17]])})))()},createBoard:function(e,t){return Object(i["a"])(regeneratorRuntime.mark((function r(){var n,a,o,i;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(n=e.commit,a=g.boards.find((function(e){return e.name===t.board})),o=d.a.cloneDeep(g.boards)||[],null==a){r.next=7;break}throw new Error("Board exists");case 7:return i={name:t.board,widgets:[]},o=o.concat([i]),r.next=11,c["a"].createBoard(o);case 11:n("setBoards",o);case 12:return r.abrupt("return",o);case 13:case"end":return r.stop()}}),r)})))()},deleteBoard:function(e,t){return Object(i["a"])(regeneratorRuntime.mark((function r(){var n,o;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return n=d.a.cloneDeep(g.boards)||[],n=n.filter((function(e){return e.name!==t})),r.prev=2,r.next=5,c["a"].updateBoard({boards:n});case 5:return e.commit("setBoards",n),e.state.board===t&&(o=(n[0]||{}).name,e.dispatch("setActiveBoard",(n[0]||{}).name),s["a"].history.current.params.board!==o&&s["a"].push({name:"Home",params:{board:o}})),r.abrupt("return",!0);case 10:r.prev=10,r.t0=r["catch"](2),a["default"].prototype.raiseError(r.t0);case 13:case"end":return r.stop()}}),r,null,[[2,10]])})))()},editBoard:function(e,t){return Object(i["a"])(regeneratorRuntime.mark((function r(){var n,o;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(n=g.boards.find((function(e){return e.name===t.board})),null==n){r.next=5;break}throw new Error("Board exists");case 5:return r.prev=5,o=d.a.cloneDeep(g.boards)||[],o=o.map((function(e){return e.name===t.oldName&&(e.name=t.board),e})),e.commit("setBoards",o),r.next=11,c["a"].createBoard(o);case 11:if(e.state.board!==t.oldName){r.next=16;break}return e.commit("setActiveBoard",t.board),r.next=15,c["a"].persistOptions({board:t.board});case 15:s["a"].history.current.params.board!==t.board&&s["a"].push({name:"Home",params:{board:t.board}});case 16:return r.abrupt("return",!0);case 19:return r.prev=19,r.t0=r["catch"](5),a["default"].prototype.raiseError(r.t0),r.abrupt("return",!1);case 23:case"end":return r.stop()}}),r,null,[[5,19]])})))()},updateBoard:function(e,t){return Object(i["a"])(regeneratorRuntime.mark((function r(){var n,o,i,s;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return n=d.a.cloneDeep(e.getters.boardWithWidgets),o=[],i=0,t.forEach((function(t){var r=n.widgets.find((function(e){return e.rsc_id===t.rsc_id}));r?(n.widgets=n.widgets.filter((function(e){return e.rsc_id!==t.rsc_id})),e.commit("removeFromBoard",t.rsc_id),i++):(n.widgets.push(t),o.push(t))})),e.commit("addToBoard",o),r.prev=5,r.next=8,c["a"].updateBoard({boards:e.state.boards});case 8:r.next=13;break;case 10:r.prev=10,r.t0=r["catch"](5),a["default"].prototype.raiseError(r.t0);case 13:return o.forEach((function(t){e.dispatch("fetchWidget",{id:t.rsc_id,accept:"application/json",endpoint:Object(p["a"])(t.endpoint[0])})})),s="Board updated. ",o.length&&(s+="".concat(o.length," widget").concat(o.length>1?"s":""," added. ")),i>0&&(s+="".concat(i," widget").concat(i>1?"s":""," removed.")),l["a"].$emit("SHOW_NOTIFICATION",{type:"success",text:s}),r.abrupt("return",!0);case 19:case"end":return r.stop()}}),r,null,[[5,10]])})))()}},w={setBoard:function(e,t){e.boards=e.boards.map((function(e){return e.name===(t||{}).name?t:e}))},setTags:function(e,t){e.tags=t},preAddWidget:function(e,t){var r=null!=e.widgets.find((function(e){return e.rsc_id===t.rsc_id}));r?e.widgets=e.widgets.map((function(e){return e.rsc_id===t.rsc_id?Object.assign(e,t):e})):e.widgets.push(t)},addToBoard:function(e,t){e.boards=e.boards.map((function(r){if(r.name===e.board){var n=r.widgets.concat(t);r.widgets=n}return r}))},removeFromBoard:function(e,t){var r=e.boards.map((function(r){return r.name===e.board&&(r.widgets=r.widgets.filter((function(e){var r="string"===typeof e?e:e.rsc_id;return r!==t}))),r}));e.boards=r,e.widgets=e.widgets.filter((function(e){return e.rsc_id!==t}))},setWidgets:function(e,t){e.widgets=t},setBoards:function(e,t){e.boards=t},setActiveBoard:function(e,t){e.board=t}},x={widgetById:function(e){return function(t){return e.widgets.find((function(e){return e.rsc_id===t}))}},widgets:function(e){return e.widgets},boards:function(){return g.boards},board:function(){return g.board},boardWithWidgets:function(){return g.boards.find((function(e){return e.name===g.board}))}},O={namespaced:!0,state:g,actions:v,mutations:w,getters:x};a["default"].use(o["a"]);t["a"]=new o["a"].Store({modules:{widgets:O}})},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("a026"),a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("c4-webapp",{attrs:{"full-width":!0}},[r("side-navigation",{attrs:{slot:"navigation-slot"},slot:"navigation-slot"})],1)},o=[],i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",{attrs:{fluid:""}},[r("v-row",{attrs:{column:"","no-gutters":""}},[r("v-col",{staticClass:" px-3",attrs:{cols:"12"}},[r("v-divider")],1),r("v-col",{staticClass:"mt-4",attrs:{cols:"12"}},[r("v-list",[r("v-subheader",{directives:[{name:"ripple",rawName:"v-ripple"}],on:{click:function(t){e.boardsVisible=!e.boardsVisible}}},[e._v(" MY BOARDS "),e.boardsVisible?e._e():r("span",{staticClass:"ml-2"},[e._v("("+e._s(e.boards.length)+")")]),r("v-spacer"),e.boardsVisible?r("v-icon",{attrs:{small:""}},[e._v("mdi-menu-up")]):r("v-icon",{attrs:{small:""}},[e._v("mdi-menu-down")])],1),e.boardsVisible?r("v-list-item-group",{attrs:{color:"primary"}},[null!=e.boards?[e._l(e.boards,(function(t){return[r("v-list-item",{key:t.name,staticClass:"pr-0",attrs:{"mouse-over":t.over=!0,"mouse-out":t.over=!1,xxxdisabled:"(brd.name === board)"},on:{click:function(r){return e.setActiveBoard(t.name)}}},[r("v-list-item-icon",[r("v-icon",[e._v("mdi-view-dashboard-variant")])],1),r("v-list-item-content",[r("v-list-item-title",[e._v(" "+e._s(t.name)+" ")])],1),r("v-list-item-action",[r("v-icon",{attrs:{ripple:"",small:"",color:"grey"},on:{click:function(r){return e.onEditBoard(t.name)}}},[e._v("mdi-pencil")])],1)],1)]}))]:e._l(2,(function(t){return r("v-boilerplate",{key:t,staticClass:"pt-3",attrs:{loading:null==e.boards,type:"list-item-avatar"}})}))],2):e._e(),r("v-list-item-group",{model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}},[r("v-list-item",{on:{click:function(t){t.stopPropagation(),t.preventDefault(),e.dialogOpen=!0}}},[r("v-list-item-icon",[r("v-icon",[e._v("mdi-plus-circle")])],1),r("v-list-item-content",[r("v-list-item-title",[e._v(" Add board ")])],1)],1)],1)],1)],1)],1),r("v-dialog",{attrs:{width:"500"},model:{value:e.dialogOpen,callback:function(t){e.dialogOpen=t},expression:"dialogOpen"}},[r("v-card",[r("v-card-title",[r("v-row",{attrs:{"no-gutters":""}},[r("h2",{staticClass:"text-h4"},[e._v(e._s(e.oldName?"Change name":"Add board"))]),r("v-spacer"),r("v-btn",{attrs:{icon:""},on:{click:function(t){e.dialogOpen=!1}}},[r("v-icon",[e._v("mdi-close")])],1)],1)],1),r("ValidationObserver",{ref:"observer",scopedSlots:e._u([{key:"default",fn:function(t){var n=t.handleSubmit;return[r("ValidationProvider",{attrs:{name:"Boardname",rules:{required:!0,max:30,boardexists:e.error}},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.errors;return[r("v-form",{on:{submit:function(t){return t.preventDefault(),n(e.submit)}}},[r("v-card-text",{staticClass:"pt-5 pb-0"},[r("v-text-field",{attrs:{autofocus:"",clearable:"",outlined:"",filled:"","error-messages":a,label:"Boardname",required:""},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})],1),r("v-card-actions",{staticClass:"pt-4 pb-8 px-7"},[r("v-btn",{attrs:{color:"primary",text:"",disabled:e.boards.length<=1},on:{click:e.deleteBoard}},[e._v(" Delete board ")]),r("v-spacer"),r("v-btn",{attrs:{color:"primary",text:""},on:{click:function(t){e.dialogOpen=!1,e.oldName=null,e.name=null}}},[e._v(" Cancel ")]),r("v-btn",{attrs:{disabled:e.block,color:"primary",type:"submit"}},[e._v(" Save ")])],1)],1)]}}],null,!0)})]}}])})],1)],1)],1)},c=[],s=(r("b0c0"),r("96cf"),r("1da1")),u=r("5530"),d=r("2f62"),l=r("7bb1"),p={components:{ValidationProvider:l["b"],ValidationObserver:l["a"],VBoilerplate:{functional:!0,render:function(e,t){var r=t.data,n=t.props,a=t.children;return e("v-skeleton-loader",Object(u["a"])(Object(u["a"])({},r),{},{props:Object(u["a"])({boilerplate:!0,elevation:0},n)}),a)}}},computed:Object(u["a"])({},Object(d["c"])("widgets",["boards","board"])),data:function(){return{selected:null,dialogOpen:!1,block:!1,boardsVisible:!0,name:null,oldName:null,error:null}},watch:{dialogOpen:function(e,t){!1===e&&(this.selected=[],this.clear())},name:function(e,t){var r=this;null!=this.error&&e!==t&&(this.error=null,this.block=!1,requestAnimationFrame((function(){r.$refs.observer.reset()})))}},methods:Object(u["a"])(Object(u["a"])({},Object(d["b"])("widgets",{setActiveBoard:"setActiveBoard",delBoard:"deleteBoard"})),{},{deleteBoard:function(e){this.delBoard(this.name),this.dialogOpen=!1,this.oldName=null,this.name=null},onEditBoard:function(e){this.oldName=e,this.name=e,this.dialogOpen=!0},clear:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.oldName=null,e.block=!1,e.name=null,e.dialogOpen=!1,requestAnimationFrame((function(){e.$refs.observer.reset()})),e.error=null;case 6:case"end":return t.stop()}}),t)})))()},submit:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$nextTick();case 2:e.$refs.observer.validate().then(function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(r){var n,a,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(console.log(r),!r){t.next=17;break}return e.block=!0,t.prev=3,n=null!=e.oldName?"widgets/editBoard":"widgets/createBoard",a={board:e.name,oldName:e.oldName},t.next=8,e.$store.dispatch(n,a);case 8:o=null!=e.oldName?"Board „".concat(e.name,"“ changed."):"Board „".concat(e.name,"“ created."),e.$bus.$emit("SHOW_NOTIFICATION",{type:"success",text:o}),e.clear(),t.next=17;break;case 13:t.prev=13,t.t0=t["catch"](3),console.log(t.t0,"error caught"),"Board exists"===t.t0.message&&(e.error=t.t0.message+".");case 17:case"end":return t.stop()}}),t,null,[[3,13]])})));return function(e){return t.apply(this,arguments)}}());case 3:case"end":return t.stop()}}),t)})))()}})},f=p,m=(r("b72b"),r("2877")),b=Object(m["a"])(f,i,c,!1,null,"7b0b76fa",null),h=b.exports,g={components:{SideNavigation:h},mounted:function(){}},v=g,w=Object(m["a"])(v,a,o,!1,null,null,null),x=w.exports,O=r("a18c"),_=r("4360"),k=r("1528"),B=(r("caad"),r("2532"),r("4c93"));Object(l["c"])("required",Object(u["a"])(Object(u["a"])({},B["c"]),{},{message:"This field is required"})),Object(l["c"])("max",Object(u["a"])(Object(u["a"])({},B["b"]),{},{message:"This field must be {length} characters or less"})),Object(l["c"])("email",Object(u["a"])(Object(u["a"])({},B["a"]),{},{message:"This field must be a valid email"})),Object(l["c"])("boardexists",{validate:function(e,t){var r=t.customErrors;return null==r||!r.includes("exists")},params:["customErrors"],message:function(e,t){return t.customErrors}}),Object(l["d"])("eager");var j=r("e166"),y=r.n(j),R=r("6c39"),A=r.n(R);n["default"].use(y.a,{props:{spinner:"bubbles"},system:{throttleLimit:25},slots:{noMore:"No more search results …",noResults:"No results …"}}),n["default"].use(A.a),n["default"].use(k["a"],{App:x,router:O["a"],store:_["a"],config:{TITLE:"Core4os"}})},"5b3d":function(e,t,r){},a18c:function(e,t,r){"use strict";r("caad"),r("b0c0"),r("d3b7");var n=r("a026"),a=r("8c4f"),o=r("4360");n["default"].use(a["a"]);var i=[{name:"enter",path:"/enter/:widgetId/:endpoint/:payload?",component:function(){return r.e("help").then(r.bind(null,"c3ef"))}},{name:"help",path:"/help/:widgetId/:endpoint",component:function(){return r.e("help").then(r.bind(null,"c3ef"))}},{path:"/:board?",name:"Home",component:function(){return r.e("home").then(r.bind(null,"bb51"))}}],c=new a["a"]({routes:i}),s=["content","help","notfound","enter"];c.beforeEach((function(e,t,r){s.includes(e.name)&&o["a"].dispatch("widgets/fetchBoards",{type:"light"}),r()})),t["a"]=c},b72b:function(e,t,r){"use strict";r("5b3d")},c151:function(e,t,r){"use strict";r("7db0"),r("caad"),r("d81d"),r("b0c0"),r("d3b7"),r("ac1f"),r("2532"),r("841c"),r("96cf");var n=r("1da1"),a=r("dddc"),o="/setting/core_widgets_next",i={__createUser:function(){var e={name:"targobank_user",realname:"targobank user",passwd:"hans",email:"test@mail.de",role:["standard_user"],perm:["app://store/targobank"]};return a["a"].post("/roles",e).then((function(e){return!0}))},__createStore:function(){var e={dark:{primary:"#FF0266",accent:"#03DAC5",secondary:"#424242",success:"#4CAF50",info:"#2196F3",warning:"#FB8C00",error:"#FF5252"},light:{primary:"#6200ee",accent:"#03DAC5",secondary:"#424242",success:"#4CAF50",info:"#2196F3",warning:"#FB8C00",error:"#FF5252"}};return a["a"].post("/store/targobank",{json:e}).then((function(e){return!0}))},__getStore:function(){return a["a"].put("/store/targobank").then((function(e){return e.data}))},createBoard:function(e){return this._putBoards({boards:e})},updateBoard:function(e){return this._putBoards(e)},_putBoards:function(e){return a["a"].put(o,{data:e}).then((function(e){return!0}))},fetchTags:function(e){return Object(n["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,a["a"].get("/_info?tag");case 3:return t=e.sent,e.abrupt("return",t.data);case 7:e.prev=7,e.t0=e["catch"](0),console.warn(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()},fetchBoards:function(e){return Object(n["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,a["a"].get(o);case 3:return t=e.sent,e.abrupt("return",t.data||{boards:[],board:""});case 7:e.prev=7,e.t0=e["catch"](0),console.warn(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()},searchWidgets:function(){var e=arguments;return Object(n["a"])(regeneratorRuntime.mark((function t(){var r,n,o,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=e.length>0&&void 0!==e[0]?e[0]:{search:"",tags:[],per_page:2,page:0},n={per_page:r.per_page,page:r.page},o=r.search,(o||"").length&&(n.search=o),r.tags.length&&(null!=r.tags.find((function(e){return!e.default}))&&(n.api=!0),n.tag=JSON.stringify(r.tags.map((function(e){return e.value})))),t.prev=5,t.next=8,a["a"].get("/_info",{params:n});case 8:return i=t.sent,t.abrupt("return",i);case 12:t.prev=12,t.t0=t["catch"](5),console.warn(t.t0);case 15:case"end":return t.stop()}}),t,null,[[5,12]])})))()},persistOptions:function(){var e=arguments;return Object(n["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=e.length>0&&void 0!==e[0]?e[0]:{boards:[],board:null,sidebar:1},t.abrupt("return",a["a"].post(o,{data:r}).then((function(e){return e})).catch((function(e){return Promise.reject(e)})));case 2:case"end":return t.stop()}}),t)})))()}};a["a"].interceptors.response.use((function(e){return e}),function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.config.url.includes("/setting")||"get"!==t.config.method||400!==t.response.status){e.next=8;break}return r=[{name:"First board",widgets:[]}],n={boards:r,board:r[0].name,sidebar:1,technical:!1},e.next=5,i.persistOptions(n);case 5:window.location.reload(),e.next=9;break;case 8:return e.abrupt("return",Promise.reject(t));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),t["a"]=i}});
//# sourceMappingURL=app.js.map