import {
    baseApi,
    appid,
    login,
    getTicket,
    auth,
    title
} from "~jmlnmj/config"
// import { baseApi, appid, login, getTicket, auth, title } from "~snf/config"
// import {
//     baseApi,
//     appid,
//     login,
//     getTicket,
//     auth,
//     title
// } from "~nmj/config"

// axios请求地址
export let baseUrl = baseApi

// 微信appid
export let wechatAppid = appid

// 微信授权登录，前端用code换取token方法
export function wechatLogin(code) {
    return login(code)
}

// 微信JS-SDK 获取ticket信息
export function getWechatTicket(code) {
    return getTicket(code)
}

export function authority() {
    return auth()
}
