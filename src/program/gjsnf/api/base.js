import {
    request
} from "@/tools/request";

/**
 * 绑定手机&修改手机
 * @param {text} api_name bindMobile
 * @param {text} mobile 手机号
 * @param {text} code 验证码
 * @param {text} token token
 */
export function bindMobile(params) {
    return request({
        method: 'post',
        url: '/outside/User/api',
        params
    })
}

/**
 * 绑定手机&修改手机
 * @param {text} api_name sendMobileCode
 * @param {text} mobile 手机号
 * @param {text} token token
 */
export function sendMobileCode(params) {
    return request({
        method: 'post',
        url: '/outside/User/api',
        params
    })
}