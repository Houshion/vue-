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

/**
 * 商家端接口
 * @param {*} params 
 */
export function shopApi(params) {
    return request({
        method: 'post',
        url: '/wxsite/shop/api',
        params
    })
}

/**
 * 运维端接口
 * @param {*} params 
 */
export function staffApi(params) {
    return request({
        method: 'post',
        url: '/wxsite/staff/api',
        params
    })
}