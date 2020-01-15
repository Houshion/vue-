<!-- orderIndex -->
<template>
    <div id="orderIndex" class="pd-10">
        <van-cell class="mg-b-10" title="普通订单" is-link to="regularOrders"/>
        <van-cell class="mg-b-10" title="套餐订单" is-link to="packageOrder"/>
        <van-cell class="mg-b-10" title="商城订单" is-link to="shopOrder"/>
    </div>
</template>
<script>
export default {
    name: 'orderIndex',
    data() {
        return {};
    },
    components: {},
    computed: {},
    created() {
        const _this = this
    },
    methods: {
    }
};
</script>
<style scoped lang='less'>
</style>