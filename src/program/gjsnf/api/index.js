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
        url: '/outside/User/api',
        params
    })
}
/**
 * 商城接口
 * @param {*} params 
 */
export function mall(params) {
    return request({
        method: 'post',
        url: '/outside/Mall/api',
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
        url: '/outside/User/api',
        params,
        form: true
    })
}