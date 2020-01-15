import axios from "@/tools/axios"
import {
    oHideLoading
} from "~/oToast"

export let baseApi = "http://szshg.a.xiaozhuschool.com"

export let appid = 'wx92e20269733bf97d'

export function login(code, call) {
    return axios.post("/app/user/auth/wechat", {
        code: code,
    }).then(res => {
        oHideLoading()
        call(res)
    })
}