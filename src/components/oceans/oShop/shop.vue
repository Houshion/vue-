<!-- oShop -->
<template>
    <div id="oShop">
        <van-search
            class="searchBar"
            v-if="search"
            v-model="value"
            placeholder="请输入搜索关键词"
            show-action
            shape="round"
            @search="onSearch"
        >
            <div slot="action" @click="onSearch">搜索</div>
        </van-search>
        <div class="main" v-if="shopData">
            <div class="double flex" v-if="double">
                <div class="left">
                    <van-badge-group :active-key="activeKey" @change="onChange">
                        <van-badge
                            :title="item.title"
                            v-for="(item,index) in shopData"
                            :key="index"
                        />
                    </van-badge-group>
                </div>
                <div class="right border-l">
                    <!-- <van-card
                        v-if="item.originPrice!=0"
                        class="tal"
                        v-for="(item,index) in shopGoods"
                        centered
                        :key="index"
                        :tag="item.tag?item.tag:''"
                        :price="item.price"
                        :desc="item.desc"
                        :title="item.name"
                        :thumb="item.img"
                        :origin-price="item.originPrice"
                    >
                        <div slot="tags" class="cbbb mg-t-5">{{item.saleNum?item.saleNum:0}}人付款</div>
                        <div slot="footer">
                            <van-stepper min="0" v-model="item.num"/>
                        </div>
                    </van-card>-->

                    <van-card
                        class="tal"
                        v-for="(item,index) in shopGoods"
                        centered
                        :key="index"
                        :tag="item.tag?item.tag:''"
                        :price="item.price"
                        :desc="item.desc"
                        :title="item.name"
                        :thumb="item.img"
                        @click-thumb="getDetail(item.id)"
                    >
                        <div
                            @click="getDetail(item.id)"
                            v-if="item.saleNum && item.saleNum>0"
                            slot="tags"
                            class="cbbb mg-t-5"
                        >{{item.saleNum?item.saleNum:0}}人付款</div>
                        <div
                            @click="getDetail(item.id)"
                            v-if="item.inventory"
                            slot="tags"
                            class="cbbb mg-t-5"
                        >库存：{{item.inventory}}</div>
                        <div slot="footer">
                            <van-stepper min="0" :max="item.inventory" v-model="item.num" @change="goCount(item)"/>
                        </div>
                    </van-card>
                </div>
                <van-submit-bar
                    class="border-t"
                    :price="totalPrice"
                    button-text="去结算"
                    @submit="onSubmit"
                >
                    <div class="pd-l-10" v-if="!cart">
                        共
                        <span class="cred fontb">{{totalNum}}</span>
                        件商品
                    </div>
                    <div class="cart" @click="getCart">
                        <div class="cartNum box">{{totalNum}}</div>
                        <img src="./img/cart.png">
                    </div>
                </van-submit-bar>
                <div class="shopCart">
                    <van-actionsheet v-model="cartShow" title="购物车">
                        <div class="cartList pd-b-20">
                            <template v-for="shop in shopData">
                                <template v-for="(item,index) in shop.goodsList">
                                    <van-cell :title="item.name" :key="index" v-if="item.num>0">
                                        <div class="flexBetween">
                                            <div>￥{{item.price|toFixed(2)}}</div>
                                            <div>
                                                <van-stepper min="0" v-model="item.num"/>
                                            </div>
                                        </div>
                                    </van-cell>
                                </template>
                            </template>
                        </div>
                    </van-actionsheet>
                </div>
            </div>
            <div v-else class="list">
                <van-card
                    class="tal"
                    v-for="(item,index) in shopGoods"
                    :key="index"
                    :tag="item.tag?item.tag:''"
                    :price="item.price"
                    :desc="item.desc"
                    :title="item.name"
                    :thumb="item.img"
                    :origin-price="item.originPrice"
                >
                    <div slot="tags" class="cbbb mg-t-5">{{item.saleNum?item.saleNum:0}}人付款</div>
                </van-card>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'oShop',
    props: {
        search: { type: Boolean, default: false },
        double: { type: Boolean, default: false },
        shopData: Array,
        cart: { type: Boolean, default: false },
        // cartList: Array,
    },
    data() {
        return {
            value: '',
            activeKey: 0,
            shopGoods: '',
            cartShow: false,
        };
    },
    components: {},
    computed: {
        totalPrice() {
            let price = 0
            if (this.shopData.length == 0) return false;
            if (this.double) {
                this.shopData.forEach(item => {
                    item.goodsList.forEach(i => {
                        price += i.price * i.num
                    });
                });
            } else {
                this.shopData.forEach(item => {
                    price += item.price * item.num
                });
            }
            return price * 100
        },
        totalNum() {
            let num = 0
            if (this.shopData.length == 0) return false;
            if (this.double) {
                this.shopData.forEach(item => {
                    item.goodsList.forEach(i => {
                        num += i.num
                    });
                });
            } else {
                this.shopData.forEach(item => {
                    num += item.num
                });
            }
            return num
        },
        cartList: {
            set() {
                // console.log("setter---->154681635165")
            },
            get() {
                if (this.shopData.length == 0) return false;
                let cartList = new Array();
                this.shopData.forEach(item => {
                    item.goodsList.forEach(i => {
                        if (i.num > 0) {
                            cartList.push(
                                { name: i.name, price: i.price, num: i.num, id: i.id, type: item.title, img: i.img }
                            )
                        }
                    });
                });
                this.testCartList = cartList
                console.log("this.testCartList", this.testCartList)
                return cartList;
            }
        },
    },
    watch: {
        cartList: {
            handler(n, o) {
                // console.log("cartList========>123231313")
            },
            immediate: true
        },
        shopData: {
            handler(n, o) {
                if (this.shopData.length == 0) return false;
                this.shopGoods = this.double ? this.shopData[0].goodsList : this.shopData
            },
            // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
            immediate: true
        }
    },
    created() {
        const _this = this
        if (this.shopData.length == 0) return false;
        // this.shopGoods = this.double ? this.shopData[0].goodsList : this.shopData
    },
    methods: {
        onSearch() {
            this.$emit('onSearch', this.value)
        },
        onChange(key) {
            if (this.shopData.length == 0) return false;
            this.activeKey = key;
            this.shopGoods = this.shopData[key].goodsList;
            this.$emit("changeType", key)
        },
        onSubmit() {
            // this.$emit('submit',this.shopData,this.cartList)
            this.$emit('submit', this.cartList)
        },
        getCart() {
            this.cartShow = true
            this.$emit('getCart')
        },
        goCount(item) {
            console.log(item)
        },
        getDetail(id) {
            this.$emit('getDetail', id)
        }
    }
};
</script>
<style lang='less'>
#oShop {
  .searchBar {
    position: fixed;
    width: 100%;
    z-index: 9;
  }
  .main {
    .double {
      //   padding: 200px 0 52px;
      .left {
        position: fixed;
        top: 200px;
        left: 0;
        bottom: 55px;
        width: 25%;
        overflow: scroll;
        .van-badge--select {
          border-color: aqua;
        }
      }
      .right {
        position: fixed;
        top: 200px;
        right: 0;
        width: 75%;
        overflow: scroll;
        bottom: 55px;
        .van-card {
          background: #ffffff;
        }
      }
    }
  }
  .cart {
    img {
      position: absolute;
      width: 1.2rem;
      bottom: 0.1rem;
      left: 0.2rem;
    }
    .cartNum {
      width: 0.4rem;
      height: 0.4rem;
      color: #ffffff;
      background: #ff0000;
      font-size: 0.15rem;
      border-radius: 50%;
      position: absolute;
      left: 1rem;
      bottom: 1rem;
      z-index: 1;
    }
  }

  .van-submit-bar {
    z-index: 999999999999999;
  }
  .van-actionsheet {
    bottom: 50px;
  }
}
</style>