<!-- confirmStatus -->
<template>
    <div id="confirmStatus">
        <div class="content">
            <div class="top">
                <div class="title fontb font18">设备编号：{{initData.macno}}</div>
                <div class="title fontb font18">商家名称：{{initData.shop_name}}</div>
                <div class="address c999">
                    <i class="icon snf-location"></i>
                    {{initData.address}}
                </div>
            </div>
            <div class="price tar font18">
                金额：
                <span class="cred">￥{{initData.unit_price}}</span>
            </div>
        </div>
        <o-pay-way class="mg-t-10" :price="payPrice" :payWay="pay.payWay" @getPayWay="getPayWay"></o-pay-way>
        <o-button class="baseBtn" @btnClick="payNow">立即支付</o-button>
    </div>
</template>
<script>
import { user } from "~snf/api";
export default {
    name: 'confirmStatus',
    data() {
        return {
            payPrice: 0,
            initData: '',
            pay: {
                price: 100,
                payWay: {
                    way: [
                        // {
                        //     name: "微信支付",
                        //     icon: require("@/program/gjsnf/img/i_wxpay.png"),
                        //     status: false,
                        // },
                        // {
                        //     name: "次卡套餐",
                        //     icon: require("@/program/gjsnf/img/i_card.png"),
                        //     status: false,
                        // },
                        // {
                        //     name: "限时套餐",
                        //     icon: require("@/program/gjsnf/img/i_time.png"),
                        //     status: false,
                        // },
                        // {
                        //     name: "体验券",
                        //     icon: require("@/program/gjsnf/img/i_coupon.png"),
                        //     status: true,
                        // },
                    ],
                    icon: {
                        normal: require("@/program/gjsnf/img/unselect.png"),
                        active: require("@/program/gjsnf/img/select.png")
                    },
                }
            },
            form: {
                api_name: 'itemConfirmOrder',
                macno: this.$route.query.macno,
                type: '1',
                is_payment: '0',
                pay_type: '1' // 1微信支付，2次卡套餐支付，3限时套餐支付，4体验券
            },
            payLock: false
        };
    },
    components: {},
    computed: {},
    created() {
        const _this = this
        this.init()
    },
    methods: {
        init() {
            let payWay = [{
                name: "微信支付",
                icon: require("@/program/gjsnf/img/i_wxpay.png"),
                status: false,
                type: 1
            }]
            user(this.form).then(res => {
                this.initData = res.data
                if (res.data.subCard > 0) {
                    payWay.push({
                        name: "次卡套餐（剩余" + res.data.subCard + "次）",
                        icon: require("@/program/gjsnf/img/i_card.png"),
                        status: false,
                        type: 2
                    })
                }
                if (res.data.limitCard > 0) {
                    payWay.push({
                        name: "限时套餐（剩余" + res.data.limitCard + "天）",
                        icon: require("@/program/gjsnf/img/i_time.png"),
                        status: false,
                        type: 3
                    })
                }
                if (res.data.voucher > 0) {
                    payWay.push({
                        name: "体验券",
                        icon: require("@/program/gjsnf/img/i_coupon.png"),
                        status: true,
                        type: 4
                    })
                }
                this.pay.payWay.way = payWay
                this.payPrice = this.initData.unit_price
            })
        },
        getPayWay(e) {
            let type = this.pay.payWay.way[e].type
            this.form.pay_type = type
            console.log(type)
            if (type == 1) {
                this.payPrice = this.initData.unit_price
            } else {
                this.payPrice = 0
            }
        },
        payNow() {
            if (this.payLock) return false
            this.payLock = true
            this.form.is_payment = 1
            user(this.form).then(res => {
                this.payLock = false
                const orderNo = res.data.order_no
                if (this.form.pay_type == 1) {
                    this.wechat.callpay(res.data, (res) => {
                        if (res) {
                            this.$toast("微信支付成功")
                            setTimeout(() => {
                                this.checkOrder(orderNo)
                            }, 1500);
                        } else {
                            this.$toast("微信支付失败，请重新支付")
                        }
                    })
                } else {
                    if (res.code != 8) {
                        this.$toast("支付成功")
                    }
                    setTimeout(() => {
                        // this.checkOrder(orderNo)
                        this.$router.push("/regularOrders")
                    }, 1500);
                }
            })
        },
        checkOrder(order_no) {
            this.showLoading()
            user({
                api_name: "polling",
                order_no
            }).then(res => {
                this.hideLoading()
                // this.$router.push("/regularOrders")
                if (res.code == 2) {
                    this.checkOrder(order_no)
                } else if (res.code == 1) {
                    setTimeout(() => {
                        this.$router.push("/regularOrders")
                    }, 1500);
                }
            })
        }
    }
};
</script>
<style scoped lang='less'>
#confirmStatus {
  padding: 0.2rem;
  .content {
    background: #ffffff;
    border-radius: 10px;
    .top {
      padding: 0.2rem;
      border-bottom: 1px solid #efefef;
    }
    .price {
      padding: 0.2rem;
    }
  }
  .baseBtn {
    bottom: 1rem;
    position: absolute;
    width: calc(100% - 0.4rem);
    border-radius: 30px;
  }
}
</style>