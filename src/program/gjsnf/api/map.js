import {
    request
} from "@/tools/request";

/**
 * 获取各种协议
 * @param {text} api_name nearby
 * @param {text} lng 
 * @param {text} lat 
 */
export function nearby(params) {
    return request({
        method: 'post',
        url: '/outside/User/api',
        params
    })
}