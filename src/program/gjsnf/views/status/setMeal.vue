<!-- setMealStatus -->
<template>
    <div id="setMealStatus">
        <div class="content">
            <div class="top">
                <div class="title fontb font18">套餐名：{{initData.item_name}}</div>
                <div class="title fontb font18">套餐类型：{{initData.type==1?'次卡套餐':'限时卡套餐'}}</div>
                <div class="title fontb font18">可用{{initData.type==1?'次':'天'}}数：{{initData.number}}</div>
                <div class="title fontb font18">适用商家：{{initData.shop_name}}</div>
                <div class="address c999">
                    <i class="icon snf-location"></i>
                    {{initData.shop_address}}
                </div>
            </div>
            <div class="price tar font18">
                金额：
                <span class="cred">￥{{initData.unit_price}}</span>
            </div>
        </div>
        <o-pay-way class="mg-t-10" :price="initData.unit_price*1" :payWay="pay.payWay"></o-pay-way>
        <o-button class="baseBtn" @btnClick="payNow">立即支付</o-button>
    </div>
</template>
<script>
import { user } from "~snf/api";
export default {
    name: 'setMealStatus',
    data() {
        return {
            initData: '',
            pay: {
                price: 100,
                payWay: {
                    way: [
                        {
                            name: "微信支付",
                            icon: require("@/program/gjsnf/img/i_wxpay.png"),
                            status: false
                        }
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
                type: '2',
                item_id: this.$route.query.id,
                is_payment: '0', // 是否支付，1支付 获取支付参数，0或者不传获取确认订单页面数据
                pay_type: '1' // 1微信支付
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
            user(this.form).then(res => {
                this.initData = res.data
            })
        },
        payNow() {
            if (this.payLock) return false
            this.payLock = true
            this.form.is_payment = 1
            user(this.form).then(res => {
                this.payLock = false
                this.wechat.callpay(res.data, (res) => {
                    if (res) {
                        this.$toast("微信支付成功")
                        setTimeout(() => {
                            this.$router.push("/packageOrder")
                        }, 1500);
                    } else {
                        this.$toast("微信支付失败，请重新支付")
                    }
                })
            })
        }
    }
};
</script>
<style scoped lang='less'>
#setMealStatus {
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