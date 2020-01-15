<!-- shopsDetail -->
<template>
    <div id="shopsDetail">
        <!-- <o-swiper :images="images"></o-swiper>
        <div class="message">
            <div class="title">这是商品的title</div>
            <div class="priceNum flexBetween">
                <div class="price cred">￥120.00</div>
                <div class="number">月售20份</div>
            </div>
            <div class="content">一蚕丝寒暑假的</div>
        </div>-->
        <shop-detail :shopMessage="shopMessage">
            <div slot="message" class="pd-15 bfff mg-b-10">
                <div class="title fontb font20 mg-b-10">{{shopMessage.title}}</div>
                <div class="priceNum flexBetween">
                    <div class="price cred">￥{{shopMessage.price}}</div>
                    <div class="number">月售{{shopMessage.number}}份</div>
                </div>
            </div>
        </shop-detail>
    </div>
</template>
<script>
import { mall } from "~snf/api";
export default {
    name: 'shopsDetail',
    data() {
        return {
            shopMessage: {
                imgList: [
                    require("@/program/gjsnf/img/image.png"),
                    require("@/program/gjsnf/img/image.png")
                ],
                title: "商品名称",
                price: "12.00",
                number: 50,
                detail: "123",
            },
            form: {
                api_name: "goodsDetail",
                id: this.$route.query.id
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
            mall(this.form).then(res => {
                this.shopMessage.imgList = res.data.img
                this.shopMessage.title = res.data.name
                this.shopMessage.price = res.data.price
                this.shopMessage.number = res.data.sale
                this.shopMessage.detail = res.data.describe
            })
        }
    }
};
</script>
<style scoped lang='less'>
</style>