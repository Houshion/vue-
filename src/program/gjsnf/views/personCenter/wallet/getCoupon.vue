<!-- getCoupon -->
<template>
    <div id="getCoupon" class="box">
        <div class="wd-80">
            <img src="../../../img/get.png" v-if="status==1">
            <img src="../../../img/unget.png" v-else>
        </div>
    </div>
</template>
<script>
export default {
    name: 'getCoupon',
    data() {
        return {
            status: this.$route.query.is_success
        };
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
#getCoupon {
  width: 100%;
  height: 100vh;
}
</style>