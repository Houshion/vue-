import axios from 'axios';
import qs from 'qs';
import store from '@/store'
import tool from '@/tools'
import {
    loadToken
} from '@/tools/cache'
import {
    oAlert,
    oToast,
    oShowLoading,
    oHideLoading
} from '~/oToast/index.js'

//设置超时时间
axios.defaults.timeout = 10000;
// post请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//对外接口
export function request({
    method,
    url,
    params,
    form
}) {
    // 请求参数类型
    let formData = form ? "multipart/form-data" : "application/x-www-form-urlencoded;charset=UTF-8"
    axios.defaults.headers.post['Content-Type'] = formData;
    // form ? '' : params.token = loadToken()
    // form ? '' : params.token = store.state.token
    if (method == 'get') {
        return get(url, params);
    } else if (method == 'post') {
        return post(url, params, form);
    }
}

// 封装get方法
function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, params).then(res => {
            // try {
            resolve(res.data);
            // } catch (error) {
            //     throw error.data
            // }
        }).catch(err => {
            reject(err.data);
        })
    });
}

// 封装post方法
function post(url, params, form) {
    console.log(params)
    let param = form ? params : qs.stringify(params)
    oShowLoading()
    return new Promise((resolve, reject) => {
        axios.post(url, param).then(res => {
            resolve(res.data);
            oHideLoading()
        }).catch(err => {
            console.log(err)
            reject(err);
            oHideLoading()
        })

    });
}

//请求拦截(请求发出前处理请求)
/* axios.interceptors.request.use(
    confirm => {
        //将token放入header，这里用Vuex把token放在store中，取出
        const token = store.state.token;
        token && (config.headers.Authorization = token);
        return config;
    },
    error => {
        return Promise.error(error);
    }
) */

// 响应拦截器（处理响应数据）
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            const res = response.data
            switch (res.code) {
                case 1000:
                    oToast("登录过期，请重新登录")
                    setTimeout(() => {
                        store.dispatch('LogOut').then(() => {
                            store.dispatch('setLoginStatus', 0)
                            location.reload() // 为了重新实例化vue-router对象 避免bug
                        })
                    }, 1500);
                    return Promise.reject(response)
                    break;
                case -1:
                    oToast("接口缺失参数，请联系开发人员")
                    return Promise.reject(response)
                    break;
                case 0:
                    oToast(res.msg)
                    return Promise.reject(response)
                    break;
                case 402:
                    oToast(res.msg)
                    tool.jmlnmj.opToken = ''
                    tool.jmlnmj.agToken = ''
                    location.reload() // 为了重新实例化vue-router对象 避免bug
                    return Promise.reject(response)
                    break;
                case 404:
                    return Promise.resolve(response)
                    break;
                case 8:
                    oToast("支付成功")
                    return Promise.resolve(response)
                    break;
                default:
                    return Promise.resolve(response);
                    break
            }
        } else {
            // 可以由后台编辑状态码区分不同情况，做不同的逻辑处理
            return Promise.reject(response);
        }
    },
    error => {
        // 请求失败，可根据error.response.status统一处理一些界面逻辑
        return Promise.reject(error.response);
    }
)