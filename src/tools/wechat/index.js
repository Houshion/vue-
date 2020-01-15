import Vue from 'vue'
import wechatAuth from './wechatAuth' //微信登录插件
import router from '../../router'
import store from '@/store'
import base from "../o_base"

import {
  wechatAppid,
  wechatLogin
} from '@/config.js'

import { authority } from "../../config";

import wechat from './jssdk'
Vue.prototype.wechat = wechat;

/**
 * 引用vuex存储数据
 */
const qs = require('qs');
router.beforeEach((to, from, next) => {
  // return next()
  if (!to.meta.wechatAuth) return next()
  next()
  if (store.state.loginStatus == 0) {
    //微信未授权登录跳转到授权登录页面
    let url = window.location.href
    //解决重复登录url添加重复的code与state问题
    let parseUrl = qs.parse(url.split('?')[1])
    let loginUrl
    if (parseUrl.code && parseUrl.state) {
      delete parseUrl.code //删除URL参数code
      delete parseUrl.state //删除URL参数state
      loginUrl = `${url.split('?')[0]}?${qs.stringify(parseUrl)}`
    } else {
      loginUrl = url
    }
    wechatAuth.redirect_uri = loginUrl
    // return console.log(wechatAuth.authUrl, base.changeUrl(wechatAuth.authUrl));
    // window.location.href = base.changeUrl(wechatAuth.authUrl)
    window.location.href = wechatAuth.authUrl
    store.dispatch('setLoginStatus', 1)
  } else if (store.state.loginStatus == 1) {
    try {
      wechatAuth.returnFromWechat(location.href)
    } catch (err) {
      store.dispatch('setLoginStatus', 0)
      // authority()
      next()
    }
    console.log("到这里了")
    wechatLogin(wechatAuth.code).then(res => {
      // if (res.code == 1) {
      //   store.dispatch("setUserInfo", res.data)
      //   store.dispatch("setToken", res.data.token)
      //   store.dispatch('setLoginStatus', 2)
      // } else {
      //   store.dispatch('setLoginStatus', 0)
      // }
      // authority()
      next()
    })
  } else {
    // authority()
    next()
  }
})
Vue.use(wechatAuth, {
  appid: wechatAppid, // 微信公众号APPID
})