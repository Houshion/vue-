// import axios from "@/tools/axios"
import request from "@/tools/request"
import {
    oHideLoading
} from "~/oToast"

export let baseApi = "http://szshg.a.xiaozhuschool.com"

export let appid = 'wxb43e42dfd0b9c150'

export function login(params) {
    // return axios.post("/wxsite/user/api", {
    //     api_name: "user_info",
    //     token: window.localStorage.getItem("token")
    // }).then(res => {
    //     oHideLoading()
    //     call(res)
    // })
    console.log(params,call)
    return request({
        method: 'post',
        url: '/app/user/auth/wechat/openId',
        params: params
    }).then(res=>{
        call(res)
    })
}