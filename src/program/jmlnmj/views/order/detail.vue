<!-- orderDetail -->
<template>
    <div id="orderDetail">
        <div class="detail">
            <div class="content">
                <div class="flexBetween">
                    <div class="label c999">订单编号</div>
                    <div class="value tar">{{detail.order_id}}</div>
                </div>
                <div class="flexBetween">
                    <div class="label c999">设备编号</div>
                    <div class="value tar">{{detail.macno}}</div>
                </div>
                <div class="flexBetween">
                    <div class="label c999">地址</div>
                    <div class="value tar">{{detail.location}}</div>
                </div>
                <div class="flexBetween">
                    <div class="label c999">订单类型</div>
                    <div class="value tar">{{detail.pay_type | payStr}}</div>
                </div>
                <div class="flexBetween">
                    <div class="label c999">应付金额</div>
                    <div class="value tar">￥{{detail.total_price}}</div>
                </div>
                <div class="flexBetween">
                    <div class="label c999">实付金额</div>
                    <div class="value tar">￥{{detail.pay_price}}</div>
                </div>
                <div class="flexBetween">
                    <div class="label c999">分成金额</div>
                    <div class="value tar">￥{{detail.shop_money}}</div>
                </div>
                <div class="flexBetween">
                    <div class="label c999">支付方式</div>
                    <div class="value tar">{{detail.pay_type | payStr}}</div>
                </div>
                <div class="flexBetween">
                    <div class="label c999">状态</div>
                    <div class="value tar">{{detail.status | statusStr}}</div>
                </div>
                <div class="flexBetween">
                    <div class="label c999">支付时间</div>
                    <div class="value tar">{{detail.pay_time}}</div>
                </div>
            </div>
            <img src="../../img/bottom_bac.png" alt="">
        </div>
    </div>
</template>
<script>
import { shopApi } from "~jmlnmj/api";
export default {
    name: 'orderDetail',
    data() {
        return {
            detail: {
                "order_id": 21,//订单
                "macno": "54156156165",//设备
                "pay_time": 1569548453,//支付时间
                "province": null,
                "city": null,
                "area": null,
                "address": null,
                "pay_type": 1,//1 ：微信支付 2：支付宝 3：会员卡支付
                "total_price": "10.00",//总价
                "pay_price": "10.00",//支付价格
                "shop_money": "5.00",
                "status": 3,//1.已支付 2. 使用中3. 已完成  4.已退款  8.待退款 9.异常
                "location": "广东省东莞市南城区高盛科技大夏"
            },
            form: {
                api_name: "orderDetails",
                order_id: this.$route.query.order_id
            }
        };
    },
    components: {},
    computed: {},
    filters: {
        statusStr(val) {
            switch (val) {
                case 1:
                    return "已支付"
                    break;
                case 2:
                    return "使用中"
                    break;
                case 3:
                    return "已完成"
                    break;
                case 4:
                    return "已退款"
                    break;
                case 8:
                    return "待退款"
                    break;
                case 9:
                    return "异常"
                    break;
            }
        },
        payStr(val) {
            switch (val) {
                case 1:
                    return "微信支付"
                    break;
                case 2:
                    return "支付宝"
                    break;
                case 3:
                    return "会员卡支付"
                    break;
            }
        }
    },
    created() {
        const _this = this
        this.init()
    },
    methods: {
        init() {
            shopApi(this.form).then(res => {
                this.detail = res.data
            })
        }
    }
};
</script>
<style scoped lang='less'>
#orderDetail {
  min-height: 100vh;
  background: linear-gradient(#70adf9, #4a58bd);
  padding: 0.2rem;
  .detail {
    border-radius: 10px;
    background: #ffffff;
    height: calc(100vh - 0.4rem);
    .content {
      padding: 0.4rem 0.2rem;
      line-height: 2;
    }
    img {
      width: calc(100% - 0.4rem);
      margin: auto;
      position: absolute;
      bottom: 0.2rem;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }
}
</style>