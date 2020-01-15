// import axios from "@/tools/axios"
import {
    request
} from "@/tools/request"

export let title = "谷米一体机"

export let baseApi = "http://scxxnmj.app.xiaozhuschool.com"

export let appid = 'wx8b5cfa2bc037259f'

export function login(code) {
    localStorage.setItem("code", code)
    console.log(code)
    // return request({
    //     method: 'post',
    //     url: '/wxsite/user/api',
    //     params: {
    //         api_name: "auth",
    //         code
    //     }
    // })
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
    //
}