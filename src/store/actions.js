import * as types from './mutationTypes'
import axios from "@/tools/axios"
import {
  saveToken,
  saveLoginStatus,
  saveUserInfo,
  removeToken,
  removeUserInfo,
}
  from '@/tools/cache'

//登录相关
export const loginWechatAuth = function ({
  commit,
  state
}, query) {
  let data = {
    code: query,
  }
  return new Promise(((resolve, reject) => {
    axios.post("http://hzchuangd.app.xiaozhuschool.com/api/public/wx_oauth", {
      params: data
    }).then((res1, error) => {
      if (res1) {
        resolve(res1)
      } else {
        reject(error)
      }
    })


  }))
}

//设置状态
export const setLoginStatus = function ({
  commit,
  state
}, query) {
  if (query == 0 || query == 1) {
    //上线打开注释，本地调试注释掉
    // removeToken()
    // removeUserInfo()
  }
  commit(types.SET_LOGIN_STATUS, saveLoginStatus(query))
}

//保存用户个人信息
export const setUserInfo = function ({
  commit,
  state
}, query) {
  commit(
    types.SET_USERINFO, saveUserInfo(query)
  )
}

//保存用户token
export const setToken = function ({
  commit,
  state
}, query) {
  commit(types.SET_TOKEN, saveToken(query))
}

export const LogOut = function({
  commit,
  state
}) {
  return new Promise((resolve, reject) => {
    commit('SET_TOKEN', '')
    commit('SET_USERINFO', '')
    commit('SET_LOGIN_STATUS', 0)
    removeToken()
    removeUserInfo()
    resolve()
  })
}
