<!-- shopOrder -->
<template>
    <div id="shopOrder">
        <template v-for="(item,index) in orderList">
            <div :key="index" class="mg-b-10" @click="go(item.order_no)">
                <div class="flexBetween pd-10 bfff">
                    <div class="orderNum">订单编号：{{item.order_no}}</div>
                    <div class="status cmain">{{item.status}}</div>
                </div>
                <div class="goodsMsg pd-lr-10">
                    <template v-for="(goods,gi) in item.json_data">
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
                <div class="pd-10 bfff tar">共{{item.num}}件商品 合计：￥{{item.real_money}}</div>
            </div>
        </template>
    </div>
</template>
<script>
import { user } from "~snf/api";
export default {
    name: 'shopOrder',
    data() {
        return {
            orderList: [
                // { 
                //     "id": 27, 
                //     "order_no": "20191009093135353577237936", 
                //     "status": "已完成", 
                //     "json_data": [
                //         { 
                //             "goods_id": "1", 
                //             "goods_name": "测试1", 
                //             "goods_type_name": "分类2", 
                //             "goods_img": "http://gdgjsnf.app.xiaozhuschool.com/public/uploads/imgs/20190903/0ff08d39c8f3afd5ddff691804a4cd83.jpg", 
                //             "unit_price": "1.00", 
                //             "buy_num": 1, 
                //             "agent_ratio": 0, 
                //             "shop_ratio": 0, 
                //             "subtotal": 1 
                //         }
                //     ], 
                //     "shop_id": 38, 
                //     "real_money": "1.00", 
                //     "pay_time": 1570613920, 
                //     "macno": "2019080899880001", 
                //     "num": 0 
                // }, 
                // { 
                //     "id": 26, 
                //     "order_no": "20191009093035353565497171", 
                //     "status": "已完成", 
                //     "json_data": [
                //         { 
                //             "goods_id": "1", 
                //             "goods_name": "测试1", 
                //             "goods_type_name": "分类2", 
                //             "goods_img": "http://gdgjsnf.app.xiaozhuschool.com/public/uploads/imgs/20190903/0ff08d39c8f3afd5ddff691804a4cd83.jpg", 
                //             "unit_price": null, 
                //             "buy_num": 1, 
                //             "agent_ratio": 0, 
                //             "shop_ratio": 0, 
                //             "subtotal": 1 
                //         }
                //     ], 
                //     "shop_id": 38, 
                //     "real_money": "1.00", 
                //     "pay_time": 0, 
                //     "macno": "2019080899880001", 
                //     "num": 0 
                // }
            ],
            form: {
                api_name: "orderList",
                type: "3",
                page: 1,
                pagesize: 20
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
        go(order_no) {
            this.$router.push({
                name: 'shopOrderDetail',
                query: {
                    order_no
                }
            })
        },
        init() {
            user(this.form).then(res => {
                this.orderList = res.data
            })
        }
    }
};
</script>
<style scoped lang='less'>
#shopOrder {
  .img {
    width: 1.5rem;
  }
  .goodsMsg > div {
    &:nth-child(n + 2) {
      border-top: 1px solid #dfdfdf;
    }
  }
  .message {
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    width: calc(100% - 1.7rem);
  }
}
</style>