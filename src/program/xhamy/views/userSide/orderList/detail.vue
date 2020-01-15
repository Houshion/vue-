<!-- orderDetail -->
<template>
    <div id="orderDetail" class="pd-15">
        <div class="boxShadow radius10 tal pd-15">
            <van-cell title="订单编号" :border="false" :value="orderDetail.order_order_no" />
            <van-cell title="设备编号" :border="false" :value="orderDetail.order_macno" />
            <van-cell title="套餐" :border="false" :value="orderDetail.item_name" v-if="orderDetail.item_name" />
            <van-cell title="付款时间" :border="false" :value="orderDetail.ctime | timeStr('Y-m-d H:i')" />
            <van-cell title="结束时间" :border="false" :value="orderDetail.end_time | timeStr('Y-m-d H:i')" v-if="orderDetail.end_time!=0" />
            <van-cell title="实付金额" :border="false" :value="orderDetail.real_money" />
        </div>
    </div>
</template>
<script>
export default {
    name: 'orderDetail',
    data() {
        return {
            orderDetail: Object,
            form: {
                api_name: "order_info",
                order_id: this.$route.query.order_id,
                token: this.base.getItem("agentToken")
            },
        };
    },
    components: {},
    computed: {},
    created() {
        const _this = this;
        this.axios.post("/wxsite/user/api", this.form).then(res => {
            _this.hideLoading()
            if (res.code != 1) return _this.toast(res.msg)
            _this.orderDetail = res.data
        })
    },
    methods: {}
};
</script>
<style scoped lang='less'>
.van-cell__value {
  flex:2
}
</style>