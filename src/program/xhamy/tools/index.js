import axios from "@/tools/axios"
import {
    oHideLoading
} from "@/components/oceans/oToast"
class tool {
    // 套餐信息相关处理
    static set orderTc(val) {
        window.localStorage.setItem("orderTc", JSON.stringify(val));
    }
    static get orderTc() {
        return JSON.parse(window.localStorage.getItem("orderTc"));
    }
    static get agentType(){
        return window.localStorage.getItem("agentType");
    }
    // 支付成功后相关处理
    static successPay() {
        window.localStorage.removeItem("orderTc")
        window.localStorage.removeItem("couponMsg")
    }
    // 获取个人信息
    static getUser(call) {
        axios.post("/wxsite/user/api", {
            api_name: "user_info"
        }).then(res => {
            console.log(this)
            oHideLoading()
            if (res.code == 1) {
                window.localStorage.setItem("userMsg", JSON.stringify(res.data));
                call ? call() : ''
            }
        })
    }
    // 获取套餐信息
    static getOrder(id, call) {
        axios.post("/wxsite/user/api", {
            api_name: "order_info",
            order_id: id
        }).then(res => {
            console.log(this)
            oHideLoading()
            if (res.code == 1) {
                this.orderTc = res.data;
                call ? call(res.data) : ''
            }
        })
    }
    // 获取优惠券信息
    static getCouponList(call) {
        axios.post("/Wxsite/Device/api", {
            api_name: 'get_user_coupon',
            page: 1,
            pagesize: 9999
        }).then(res => {
            oHideLoading()
            call ? call(res.data) : ''
        })
    }
}

export default tool