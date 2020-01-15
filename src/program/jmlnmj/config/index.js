// import axios from "@/tools/axios"
import {
    request
} from "@/tools/request"
import router from '@/router'
import tool from "@/tools";

export let baseApi = "http://fljmlnmj.app.xiaozhuschool.com"

export let appid = 'wx5d7a9aec8308a57d'

export function login(code) {
    return localStorage.setItem("code", code)
    return request({
        method: 'post',
        url: '/wxsite/user/api',
        params: {
            api_name: "auth",
            code
        }
    })
}

export function getTicket() {
    return request({
        method: 'post',
        url: '/wxsite/public/api',
        params: {
            api_name: "getTicket",
        }
    })
}

export function auth() {
    // router.beforeEach((to, from, next) => {
    //     if (!tool.jmlnmj.opToken && !tool.jmlnmj.agToken) {
    //         next('/')
    //     } else {
    //         if (to.path == '/') {
    //             if (tool.jmlnmj.opToken) {
    //                 next('/opration')
    //             } else {
    //                 next('/agency')
    //             }
    //         } else {
    //             next()
    //         }
    //     }
    // })
}