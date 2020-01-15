<!-- regularOrders -->
<template>
    <div id="regularOrders">
        <van-tabs v-model="active" swipeable @change="change">
            <van-tab :title="item.title" v-for="(item,index) in tab" :key="index">
                <div class="pd-10">
                    <template v-for="(list,i) in list">
                        <div :key="i" class="list radius5 mg-b-10" @click="getDetail(list.order_no)">
                            <div class="flexBetween border-b pd-b-10">
                                <div class="cbbb">设备编号：{{list.macno}}</div>
                                <div
                                    class="status"
                                    :class="list.status=='已完成'?'cmain':'cred'"
                                >{{list.status}}</div>
                            </div>
                            <div class="fontb shopName mg-t-10">商家名称：{{list.shop_name}}</div>
                            <div class="fontb pay mg-t-5">支付金额：{{list.real_money}}元</div>
                            <div
                                class="fontb payTime mg-t-5"
                            >支付时间：{{list.pay_time|timeStr('Y.m.d H:i')}}</div>
                            <div class="address cbbb mg-t-5">
                                <i class="icon snf-location font14">{{list.shop_address}}</i>
                            </div>
                        </div>
                    </template>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
import { user } from "~snf/api";
export default {
    name: 'regularOrders',
    data() {
        return {
            active: 0,
            tab: [{ title: "已完成", status: 3 }, { title: "异常", status: 4 }],
            list: [],
            form: {
                api_name: "orderList",
                type: "1",
                status: "3",
                page: 1,
                pagesize: 20
            }
        };
    },
    components: {},
    computed: {},
    created() {
        const _this = this;
        this.init();
    },
    methods: {
        init() {
            user(this.form).then(res => {
                this.list = res.data
            })
        },
        change(i) {
            this.form.status = this.tab[i].status
            this.init()
        },
        getDetail(order_no) {
            this.$router.push({
                name: "regularOrdersDetail",
                query: {
                    order_no
                }
            })
        }
    }
};
</script>
<style lang='less'>
#regularOrders {
  .van-tab--active {
    color: #f7d052;
  }
  .list {
    padding: 0.2rem;
    background: #ffffff;
  }
}
</style>