<!-- regularOrdersDetail -->
<template>
    <div id="regularOrdersDetail">
        <div class="topImg">
            <div class="img">
                <div v-if="detail.status!='已完成'">
                    <i class="icon snf-exclamation"></i>异常
                </div>
                <div v-else>
                    <i class="icon snf-finish"></i>完成
                </div>
                <img src="../../../img/orderTop.png" alt="">
            </div>
            <div class="detail">
                <div class="detailMsg">
                    <div class="orderNo flexBetween mg-b-10">
                        <div class="title">订单编号</div>
                        <div class="value">{{detail.order_no}}</div>
                    </div>
                    <div class="orderNo flexBetween mg-b-10">
                        <div class="title">设备编号</div>
                        <div class="value">{{detail.macno}}</div>
                    </div>
                    <div class="orderNo flexBetween mg-b-10">
                        <div class="title">商家名</div>
                        <div class="value">{{detail.shop_name}}</div>
                    </div>
                    <div class="orderNo flexBetween mg-b-10">
                        <div class="title">商家地址</div>
                        <div class="value">{{detail.shop_address}}</div>
                    </div>
                    <div class="orderNo flexBetween mg-b-10">
                        <div class="title">应付金额</div>
                        <div class="value">{{detail.real_money}}元</div>
                    </div>
                    <div class="orderNo flexBetween mg-b-10">
                        <div class="title">实付金额</div>
                        <div class="value">{{detail.real_money}}元</div>
                    </div>
                    <div class="orderNo flexBetween mg-b-10">
                        <div class="title">支付方式</div>
                        <div class="value">{{detail.pay_type|changeType}}</div>
                    </div>
                    <div class="orderNo flexBetween mg-b-10">
                        <div class="title">支付时间</div>
                        <div class="value">{{detail.pay_time|timeStr("Y.m.d H:i")}}</div>
                    </div>
                </div>
                <template v-if="detail.status=='已完成'">
                    <o-button class="mg-t-50" @btnClick="exception(detail.order_no)">异常申报</o-button>
                </template>
                <template v-else>
                    <div class="reason">
                        <div class="title">故障原因</div>
                        <div class="content">{{detail.feedback_reason}}</div>
                    </div>
                    <div class="description">
                        <div class="title">故障描述</div>
                        <div class="content">
                            <div class="con">{{detail.feedback_content}}</div>
                            <div class="flexStart" v-for="src in detail.feedback_img" :key="src">
                                <div class="faultImg">
                                    <img :src="src">
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import { user } from "~snf/api";
export default {
    name: 'regularOrdersDetail',
    data() {
        return {
            form: {
                api_name: 'orderDetail',
                order_no: this.$route.query.order_no
            },
            detail: ''
        };
    },
    components: {},
    computed: {},
    created() {
        const _this = this;
        this.init()
    },
    filters: {
        changeType(val) {
            // 1微信支付，2次卡套餐支付，3限时套餐支付，4体验券
            switch (val) {
                case 1:
                    return "微信支付"
                    break;
                case 2:
                    return "次卡套餐支付"
                    break;
                case 3:
                    return "限时套餐支付"
                    break;
                case 4:
                    return "体验券"
                    break;
                default:
                    break;
            }
        }
    },
    methods: {
        init() {
            user(this.form).then(res => {
                console.log(res)
                this.detail = res.data
            })
        },
        exception(order_no) {
            this.$router.push({
                name: "exception",
                query: {
                    order_no
                }
            })
        }
    }
};
</script>
<style scoped lang='less'>
#regularOrdersDetail {
  padding: 0.2rem;
  .img,
  .img img {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    div {
      color: #ffffff;
      text-align: center;
      margin-top: 0.8rem;
      position: relative;
      z-index: 2;
      font-size: 0.35rem;
      i {
        font-size: 0.35rem;
      }
    }
  }
  .detail {
    margin-top: 1.5rem;
    background: #ffffff;
    padding: 0.35rem;
    padding-top: 1.5rem;
    .title {
    }
  }
  .reason,
  .description {
    padding: 0.15rem;
    .title {
      margin: 0.1rem 0;
      &:before {
        background: #f6a820;
        content: "";
        position: absolute;
        width: 0.1rem;
        height: 0.25rem;
        border-radius: 15px;
        margin-top: 0.05rem;
        margin-left: -0.15rem;
      }
    }
    .content {
      line-height: 2;
      .con {
        margin: 0.1rem 0;
      }
      .faultImg {
        width: 32%;
        margin-top: 0.2rem;
        margin-right: 2%;
        &:nth-child(3n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>