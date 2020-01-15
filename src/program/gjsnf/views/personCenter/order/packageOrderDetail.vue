
<!-- packageOrderDetail -->
<template>
    <div id="packageOrderDetail">
        <div class="topImg">
            <div class="img">
                <div v-if="detail.type==2">限时卡套餐</div>
                <div v-else>次卡套餐</div>
                <img src="../../../img/orderTop.png" alt="">
            </div>
            <div class="detail">
                <div class="detailMsg">
                    <div class="orderNo flexBetween mg-b-10">
                        <div class="title">订单编号</div>
                        <div class="value">{{detail.order_no}}</div>
                    </div>
                    <div class="orderNo flexBetween mg-b-10">
                        <div class="title">套餐名</div>
                        <div class="value">{{detail.json_data.item_name}}</div>
                    </div>
                    <div class="orderNo flexBetween mg-b-10">
                        <div class="title">套餐类型</div>
                        <div class="value">{{detail.type==1 ? "次卡套餐" : "限时卡套餐"}}</div>
                    </div>
                    <div class="orderNo flexBetween mg-b-10">
                        <div class="title">套餐价格</div>
                        <div class="value">{{detail.json_data.unit_price}}元</div>
                    </div>
                    <div class="orderNo flexBetween mg-b-10">
                        <div class="title">{{detail.type==1 ? "可用次数" : "可用天数"}}</div>
                        <div class="value">{{detail.json_data.number}}{{detail.type==1 ? "次" : "天"}}</div>
                    </div>
                    <div class="orderNo flexBetween mg-b-10">
                        <div class="title">适用商家</div>
                        <div class="value">{{detail.shop_name}}</div>
                    </div>
                    <div class="orderNo flexBetween mg-b-10">
                        <div class="title">商家地址</div>
                        <div class="value">{{detail.shop_address}}</div>
                    </div>
                    <div class="orderNo flexBetween mg-b-10">
                        <div class="title">实付金额</div>
                        <div class="value">{{detail.real_money}}元</div>
                    </div>
                    <div class="orderNo flexBetween mg-b-10">
                        <div class="title">支付时间</div>
                        <div class="value">{{detail.pay_time | timeStr("Y-m-d H:m:s")}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { user } from "~snf/api";
export default {
    name: 'packageOrderDetail',
    data() {
        return {
            form: {
                api_name: "orderDetail",
                order_no: this.$route.query.orderNo
            },
            detail: {
                json_data: {}
            }
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
            return val == 1 ? "次卡套餐" : "限时卡套餐"
        },
    },
    methods: {
        init() {
            user(this.form).then(res => {
                console.log(res)
                this.detail = res.data
            })
        }
    }
};
</script>
<style scoped lang='less'>
#packageOrderDetail {
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
      .content {
        line-height: 2;
      }
    }
  }
}
</style>