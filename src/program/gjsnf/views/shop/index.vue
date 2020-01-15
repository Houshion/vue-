<!-- shop -->
<template>
    <div id="shop">
        <o-swiper :images="images"></o-swiper>
        <shop
            double
            cart
            :shopData="shopData"
            @getCart="getCart"
            @changeType="changeType"
            @submit="submit"
            @getDetail="getDetail"
        ></shop>
    </div>
</template>
<script>
import { mall } from "~snf/api";
import { cartdata } from "@/tools/cache"
export default {
    name: 'shopIndex',
    data() {
        return {
            shopData: [
                // {
                //     id: 1, // Number 唯一标识符
                //     title: "啤酒", // String 左侧标题
                //     goodsList: [ // Array 商品列表
                //         {
                //             id: 1, // Number 唯一标识符
                //             name: "商品名称", // String 商品名称
                //             desc: "", // String 商品描述
                //             price: '19.00', // Number 商品价格（现价）
                //             desCount: 0, // Number 商品折扣
                //             originPrice: 0, // Number 商品原价
                //             num: 0, // Number 商品数量
                //             saleNum: 0, // Number 商品销售数量
                //             tag: "", // String 商品标签名
                //             inventory: 10, // String 商品库存数量
                //             img: '', // String 商品图片
                //         },
                //     ]
                // },
                /* {
                    id: 2, // Number 唯一标识符
                    title: "青菜", // String 左侧标题
                    goodsList: [ // Array 商品列表
                        {
                            id: 2, // Number 唯一标识符
                            name: "商品名称222", // String 商品名称
                            desc: "", // String 商品描述
                            price: '19.00', // Number 商品价格（现价）
                            desCount: 0, // Number 商品折扣
                            originPrice: 0, // Number 商品原价
                            num: 0, // Number 商品数量
                            saleNum: 0, // Number 商品销售数量
                            tag: "", // String 商品标签名
                            inventory: 10, // String 商品库存数量
                            img: require("@/program/gjsnf/img/image.png"), // String 商品图片
                        },
                    ]
                } */
            ],
            images: [
                // { img: require("../../img/swiper.png"), url: 'a' }
            ],
            // cartList: [
            //     { name: '商品名', price: 120, num: 10 }
            // ],
            indexFrom: {
                api_name: 'index',
                page: 1,
                pagesize: 20,
            }
        };
    },
    components: {},
    computed: {

    },
    created() {
        const _this = this
        this.init();
    },
    mounted() {
        // this.init();
    },
    methods: {
        getCart() {
            console.log('getCart')
        },
        init() {
            mall(this.indexFrom).then(res => {
                // banner
                let image = new Array();
                res.data.banner.forEach(item => {
                    image.push({ img: item.img, url: item.url })
                });
                this.images = image
                classify
                let classify = new Array();
                res.data.classify.forEach(item => {
                    classify.push({
                        id: item.id,
                        title: item.name,
                        goodsList: item.goods_list
                    })
                });
                classify.forEach(ci => {
                    if (ci.goodsList.length > 0) {
                        var goodsListArr = new Array();
                        console.log(ci)
                        ci.goodsList.forEach(gitem => {
                            console.log(gitem)
                            // console.log(gitem.name,"=====>",gitem.stock)
                            goodsListArr.push({
                                id: gitem.id, // Number 唯一标识符
                                name: gitem.name, // String 商品名称
                                price: gitem.price, // Number 商品价格（现价）
                                num: 0, // Number 商品数量
                                inventory: gitem.stock, // String 商品库存数量
                                img: gitem.img, // String 商品图片
                            })
                        })
                        ci.goodsList = goodsListArr
                    }
                });
                this.shopData = classify
                console.log("this.shopData", classify)
            })
        },
        changeType(key) {
            const id = this.shopData[key].id
            this.indexFrom.goods_type_id = id
            // mall(this.indexFrom).then(res => {
            //     console.log(res)
            // })
        },
        submit(cart) {
            if (cart.length <= 0) return this.$toast("购物车内没有商品")
            cartdata(cart)
            if (this.$route.query.macno) {
                this.$router.push({
                    path: '/confirmOrder',
                    query: {
                        macno: this.$route.query.macno
                    }
                })
            } else {
                this.$router.push('/confirmOrder')
            }

        },
        getDetail(id){
            this.$router.push({
                path: '/shopDetail',
                query: {
                    id
                }
            })
        }
    }
};
</script>
<style lang='less'>
</style>