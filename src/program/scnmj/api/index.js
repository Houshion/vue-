import {
    request
} from "@/tools/request";

/**
 * 用户端接口
 * @param {*} params 
 */
export function user(params) {
    return request({
        method: 'post',
        url: '/wxsite/user/api',
        params
    })
}

/**
 * 公共接口
 * @param {*} params 
 */
export function pubApi(params) {
    return request({
        method: 'post',
        url: '/wxsite/public/api',
        params
    })
}

/**
 * 上传图片接口
 * @param {*} params 
 */
export function uploadImg(params) {
    return request({
        method: 'post',
        url: '/wxsite/public/api',
        params,
        form: true
    })
}