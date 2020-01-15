<!-- confirmOrder -->
<template>
    <div id="confirmOrder">
        <router-link to="/addressList?getAdd=1">
            <div class="address">
                <van-cell is-link v-if="addressMsg.name">
                    <div slot="title">
                        <span class="mg-lr-10">{{addressMsg.name}}</span>
                        <span class="mg-lr-10">{{addressMsg.mobile}}</span>
                    </div>
                    <div slot="label">
                        <i class="icon snf-location"></i>
                        {{addressMsg.address}}
                    </div>
                </van-cell>
                <van-cell is-link v-else title="请选择地址"></van-cell>
                <img src="../../img/addressLine.png" alt="">
            </div>
        </router-link>
        <div class="lists pd-lr-10 bfff">
            <!-- <div class="border-b pd-tb-20 flex">
                <div class="message"></div>
                <div class="number"></div>
            </div>-->
            <van-card
                class="tal pd-tb-10 bfff mg-t-0 border-b"
                v-for="(item,index) in shops"
                centered
                :key="index"
                :title="item.name"
                :thumb="item.img"
            >
                <div slot="desc" class="mg-t-10 c999">{{item.type}}</div>
                <div slot="price" class="mg-t-10 flexBetween wd-100">
                    <div>￥{{item.price}}</div>
                    <div class="cbbb">
                        x
                        <span class="font14">{{item.num}}</span>
                    </div>
                </div>
            </van-card>
            <div class="count tar pd-tb-10">
                共{{count.num}}件商品
                <span class="mg-l-15">
                    合计:
                    <span class="cred">￥{{count.price | toFixed(2)}}</span>
                </span>
            </div>
        </div>
        <o-button class="wd-80 mg-t-20" @btnClick="wxPay">微信支付</o-button>
    </div>
</template>
<script>
import { getCartdata, getaddressdata } from "@/tools/cache"
import { mall } from "~snf/api"
export default {
    name: 'confirmOrder',
    data() {
        return {
            addressMsg: {},
            shops: getCartdata() ? getCartdata() : [ // Array 商品列表
                // {
                //     id: 2, // Number 唯一标识符
                //     name: "商品名称222", // String 商品名称
                //     desc: "分类", // String 商品描述
                //     price: '19.00', // Number 商品价格（现价）
                //     num: 1, // Number 商品数量
                //     img: require("@/program/gjsnf/img/image.png"), // String 商品图片
                // },
                // {
                //     id: 3, // Number 唯一标识符
                //     name: "商品名称333", // String 商品名称
                //     desc: "分类", // String 商品描述
                //     price: '19.00', // Number 商品价格（现价）
                //     num: 15, // Number 商品数量
                //     img: require("@/program/gjsnf/img/image.png"), // String 商品图片
                // },
            ],
            payLock: false
        };
    },
    components: {},
    computed: {
        count() {
            let count = new Object();
            let num = 0, price = 0;
            this.shops.forEach(item => {
                num += item.num;
                price += item.num * item.price
            });
            return count = { num, price }
        }
    },
    created() {
        const _this = this
        this.addressMsg = getaddressdata() ? getaddressdata() : {}
    },
    methods: {
        wxPay() {
            if (this.payLock) return false
            this.payLock = true
            let buy_data = new Array()
            this.shops.forEach(item => {
                buy_data.push(
                    { "goods_id": item.id, "num": item.num }
                )
            });
            let form = {
                api_name: 'confirmOrder',
                buy_data: JSON.stringify(buy_data),
                type: '2',
                address_id: this.addressMsg.id,
            }

            this.$route.query.macno ? form.macno = this.$route.query.macno : ''
            mall(form).then(res => {
                this.payLock = false
                this.wechat.callpay(res.data, (res) => {
                    if (res) {
                        this.$toast("微信支付成功")
                        setTimeout(() => {
                            this.$router.go(-1)
                        }, 1500);
                    } else {
                        this.$toast("微信支付失败，请重新支付")
                    }
                })
            })
        },
    }
};
</script>
<style scoped lang='less'>
.van-card__price {
  width: 100%;
}
</style>