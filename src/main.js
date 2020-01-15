import Vue from 'vue'
import App from './App.vue'

import router from './router/index.js'
import store from './store/index.js'

// import oceans from "@/oceans.js"
// Vue.use(oceans)

// Ocean's components
import oceansComponents from "@/components/oceans"
Vue.use(oceansComponents)
// Ocean's game
import games from "@/components/games"
Vue.use(games)

// 引入公共样式
// import "@/assets/css/o_index.less";
import "@/assets/css/o_index.css";
import "@/assets/css/o_loading.less";
import "@/assets/css/o_color.less";
import "@/assets/icons"

// 全局引入axios请求
import axios from "@/tools/axios";
Vue.prototype.axios = axios;

// 全局引入公共函数
import o_base from '@/tools/o_base'
Vue.prototype.base = o_base

import { authority } from "./config";
authority()

/**** 全局引用filters过滤器 ****/
// 全局方法Vue.filter()统一注册自定义过滤器
import * as filters from "@/tools/filters"
Object.keys(filters).forEach(key => { //返回filters对象中属性名组成的数组
  Vue.filter(key, filters[key])
})

import tools from "@/tools/"
Vue.prototype.tool = tools

// 引入keyCode相应事件
import "@/tools/keyEvent" // 未完成...

// 引入微信登录授权
import "@/tools/wechat"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})