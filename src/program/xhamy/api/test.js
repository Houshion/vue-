import {
    request
} from "@/tools/request";

export function testApi(params) {
    return request({
        method: 'post',
        url: '/wxsite/user/api321',
        params: params
    })
}