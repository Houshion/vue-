<!-- oShopDetail -->
<template>
    <div id="oShopDetail">
        <van-swipe :autoplay="3000">
            <van-swipe-item v-if="typeof shopMessage.imgList == 'string'">
                <img v-lazy="shopMessage.imgList">
            </van-swipe-item>
            <van-swipe-item v-else v-for="(image, index) in shopMessage.imgList" :key="index">
                <img v-lazy="image">
            </van-swipe-item>
        </van-swipe>
        <div id="basicMessage">
            <slot name="message"></slot>
        </div>
        <div id="detail" class="pd-b-50">
            <div class="label tal border-b">
                <van-cell title="商品详情"/>
            </div>
            <div class="content bfff pd-10" v-html="shopMessage.detail"></div>
        </div>
        <van-goods-action v-if="cartAction">
            <van-goods-action-mini-btn
                icon="cart-o"
                :info="cartInfo"
                text="购物车"
                @click="$emit('goCart')"
            />
            <van-goods-action-mini-btn
                v-if="shopIcon"
                icon="shop-o"
                text="店铺"
                @click="$emit('goShop')"
            />
            <van-goods-action-big-btn text="加入购物车" @click="$emit('getInCart')"/>
            <van-goods-action-big-btn primary text="立即购买" @click="$emit('buyNow')"/>
        </van-goods-action>
    </div>
</template>
<script>
export default {
    name: 'oShopDetail',
    props: {
        shopMessage: Object,
        shopIcon: true,
        cartInfo: '',
        cartAction: false
    },
    data() {
        return {
        };
    },
    components: {},
    computed: {},
    created() {
        const _this = this
    },
    methods: {
        goCart() {
            const _this = this;
            this.$emit()
        },
        goShop() {
            const _this = this;
            console.log(2)
        },
        getInCart() {
            const _this = this;
            console.log(3)
        },
        buyNow() {
            const _this = this;
            console.log(4)
        },
    }
};
</script>
<style scoped lang='less'>
.van-swipe {
  height: 250px;
  img {
    width: 100%;
    height: 100%;
  }
}
#detail {
  .content {
    width: 100%;
    max-width: 100%;
    img {
      width: 100% !important;
    }
  }
}
</style>