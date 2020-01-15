<!-- packageOrder -->
<template>
    <div id="packageOrder">
        <template v-for="(item,index) in orderList">
            <router-link :to="'/packageOrderDetail?orderNo='+item.order_no" :key="index">
                <div class="bfff radius5 pd-10 mg-b-10 c000">
                    <div class="title mg-t-5">套餐名：{{item.json_data.item_name}}</div>
                    <div class="type mg-t-5">套餐类型：{{item.json_data.type | changeType}}</div>
                    <div class="tishoptle mg-t-5">适用商家：{{item.shop_name}}</div>
                    <div class="payTime mg-t-5">支付时间：{{item.pay_time | timeStr("Y-m-d H:m:s")}}</div>
                </div>
            </router-link>
        </template>
    </div>
</template>
<script>
import { user } from "~snf/api";
export default {
    name: 'packageOrder',
    data() {
        return {
            orderList: [
                // {
                //     id: 2,
                //     json_data: {
                //         item_id: 10,
                //         item_name: "次数套餐2次",
                //         unit_price: "15.00",
                //         type: 1,
                //         number: 2
                //     },
                //     item_id: 10,
                //     item_name: "次数套餐2次",
                //     number: 2,
                //     type: 1,
                //     unit_price: "15.00",
                //     macno: "2019080899880001",
                //     num: 0,
                //     order_no: "20191125135535353552607822",
                //     pay_time: 1574661344,
                //     real_money: "15.00",
                //     shop_address: "万达",
                //     shop_id: 38,
                //     shop_name: "康宁商家",
                //     status: "待发货",
                // }
            ],
            form: {
                api_name: "orderList",
                type: "2",
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
    filters: {
        changeType(val) {
            return val == 1 ? "次卡套餐" : "限时卡套餐"
        },
    },
    methods: {
        init() {
            user(this.form).then(res => {
                console.log(res)
                this.orderList = res.data
            })
        }
    }
};
</script>
<style scoped lang='less'>
#packageOrder {
  padding: 0.2rem;
}
</style>