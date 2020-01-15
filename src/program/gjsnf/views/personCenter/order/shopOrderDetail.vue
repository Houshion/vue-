<!-- shopOrderDetail -->
<template>
    <div id="shopOrderDetail">
        <div class="orderBox">
            <div class="baseMsg pd-lr-10">
                <div class="type pd-tb-20 border-b font16 box">
                    <i class="icon snf-finish font16"></i>
                    {{orderMsg.status}}
                </div>
                <div class="addressMsg pd-tb-10">
                    <div class="flexStart">
                        <div class="name mg-r-5">{{orderMsg.buy_name}}</div>
                        <div class="mobile">{{orderMsg.buy_phone}}</div>
                    </div>
                    <div class="address mg-t-10">
                        <i class="icon snf-location"></i>
                        {{orderMsg.address}}
                    </div>
                </div>
            </div>
            <div class="goodsMsg pd-lr-10">
                <template v-for="(goods,gi) in orderMsg.json_data">
                    <div class="pd-tb-10 flexBetween" :key="gi">
                        <div class="img">
                            <img :src="goods.goods_img" alt="">
                        </div>
                        <div class="message">
                            <div class="goodsName wd-100 font16">{{goods.goods_name}}</div>
                            <div class="flexBetween wd-100 c999">
                                <div clsss="price">￥{{goods.unit_price}}</div>
                                <div class="number">x{{goods.buy_num}}</div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <div class="pd-10 bfff tar fontb">
                共{{orderMsg.num}}件商品 合计：
                <span class="cred">￥{{orderMsg.real_money}}</span>
            </div>
            <div class="orderMsg pd-10">
                <div class="flexStart mg-t-5 orderNum">
                    <div class="c999 title mg-r-10">订单编号</div>
                    <div>{{orderMsg.order_no}}</div>
                </div>
                <div class="flexStart mg-t-5 price">
                    <div class="c999 title mg-r-10">支付金额</div>
                    <div>￥{{orderMsg.real_money}}</div>
                </div>
                <div class="flexStart mg-t-5 payTime">
                    <div class="c999 title mg-r-10">付款时间</div>
                    <div>{{orderMsg.pay_time | timeStr("Y-m-d H:i:s")}}</div>
                </div>
                <div class="flexStart mg-t-5 express" v-if="orderMsg.status=='已完成'">
                    <div class="c999 title mg-r-10">物流编号</div>
                    <div>{{orderMsg.trade_no}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { user } from "~snf/api";
export default {
    name: 'shopOrderDetail',
    data() {
        return {
            orderMsg: {
                order_no: "20191009093135353577237936", //订单编号
                macno: "2019080899880001", //设备号
                trade_no: "", //支付流水号
                json_data: [ //商品或套餐数据
                    {
                        goods_id: "1", //商品id
                        goods_name: "测试1", //商品名称
                        goods_type_name: "分类2", //商品分类名称
                        goods_img: "http://gdgjsnf.app.xiaozhuschool.com/public/uploads/imgs/20190903/0ff08d39c8f3afd5ddff691804a4cd83.jpg", //商品图片
                        unit_price: "1.00", //商品单价
                        buy_num: 1, //购买数量
                        agent_ratio: 0,
                        shop_ratio: 0,
                        subtotal: 1
                    }
                ],
                real_money: "1.00", //支付金额
                pay_time: 1570613920, //支付时间
                status: "待发货", //订单状态
                buy_name: "",
                buy_phone: "",
                address: "",
                num: 0
            }
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
            user({
                api_name: "orderDetail",
                order_no: this.$route.query.order_no
            }).then(res => {
                console.log(res)
                this.orderMsg = res.data
            })
        }
    }
};
</script>
<style scoped lang='less'>
#shopOrderDetail {
  min-height: 100vh;
  background: #fcf9f1;
  padding: 0.2rem;
  .orderBox {
    min-height: calc(100vh - 0.4rem);
    box-shadow: 0px 0px 5px 0px #f7d052;
    border-radius: 0.2rem;
    background: #ffffff;
    .goodsMsg {
      background: #fafafa;
    }
    .goodsMsg > div {
      &:nth-child(n + 2) {
        border-top: 1px solid #dfdfdf;
      }
      .img {
        width: 1.5rem;
      }
      .message {
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
        width: calc(100% - 1.7rem);
      }
    }
    .orderMsg {
      border-top: 1px #efefef solid;
      border-bottom: 1px #efefef solid;
      box-shadow: inset 0 0 5px 0 #efefef;
    }
  }
}
</style>