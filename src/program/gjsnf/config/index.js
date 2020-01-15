// import axios from "@/tools/axios"
import {
    request
} from "@/tools/request"
import {
    oHideLoading
} from "~/oToast"

import store from '@/store'
import router from '@/router'

export let baseApi = "http://gdgjsnf.app.xiaozhuschool.com"

export let appid = 'wx89604713d6c55662'

export function login(code) {
    return request({
        method: 'post',
        url: '/outside/User/api',
        params: {
            api_name: "auth",
            code
        }
    })
}

export function getTicket() {
    return request({
        method: 'post',
        url: '/outside/User/api',
        params: {
            api_name: "getTicket",
        }
    })
}

export function auth() {
    router.beforeEach((to, from, next) => {
        if (!to.meta.wechatAuth) return next()
        console.log(123)
        const userInfo = JSON.parse(window.localStorage.getItem("User-Info"))
        console.log(userInfo.mobile)
        if (userInfo) {
            if (userInfo.mobile) {
                next()
            } else {
                if (to.path == "/agreement") return next()
                if (to.path != '/login') {
                    next('/login')
                } else {
                    next()
                }
            }
        }
    })
}