<!-- myCoupon -->
<template>
    <div id="myCoupon">
        <template v-for="item in list">
            <div class="coupon" :key="item.id">
                <div class="coupon-left">
                    <div class="coupon-inner">
                        <div class="coupon-money">体验券名：{{item.name}}</div>
                        <div class="coupon-condition">体验券描述：{{item.describe}}</div>
                    </div>
                </div>
                <div class="coupon-right">
                    <div class="label box">
                        <div>体验券</div>
                    </div>
                    <div class="coupon-inner">
                        <i class="coupon-circle top"></i>
                        <i class="coupon-circle bottom"></i>
                    </div>
                </div>
                <!-- <div class="coupon-light"></div> -->
            </div>
        </template>
    </div>
</template>
<script>
import { user } from "~snf/api";
export default {
    name: 'myCoupon',
    data() {
        return {
            list: []
        };
    },
    components: {},
    computed: {},
    created() {
        const _this = this
        this.init();
    },
    methods: {
        init() {
            user({
                api_name: "wallet",
                type: 2
            }).then(res => {
                this.list = res.data
                console.log(res)
            })
        }
    }
};
</script>
<style scoped lang='less'>
@import "./coupon.less";
#myCoupon {
  padding: 0.2rem;
}
</style>