<!-- walletIndex -->
<template>
    <div id="walletIndex" class="pd-10">
        <van-cell class="mg-b-10" title="我的套餐" is-link to="myPackage"/>
        <van-cell class="mg-b-10" title="我的体验券" is-link to="myCoupon"/>
        <van-cell class="mg-b-10" title="明细" is-link to="walletDetail"/>
    </div>
</template>
<script>
export default {
    name: 'walletIndex',
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