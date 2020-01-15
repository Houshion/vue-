import {
    request
} from "@/tools/request";

/**
 * 获取各种协议
 * @param {text} api_name getAgreement
 * @param {text} type 1用户协议，2客户电话，3logo，4关于我们的标题，5关于我们的内容
 */
export function agreement(params) {
    return request({
        method: 'post',
        url: '/outside/User/api',
        params
    })
}