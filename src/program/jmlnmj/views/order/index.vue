<!-- order -->
<template>
  <div id="order">
    <o-refresh ref="reFresh" @onLoad="onLoad">
      <template v-for="(item,index) in orderList">
        <router-link :to="'/orderDetail?order_id='+item.order_id" :key="index">
          <div class="orderList">
            <div class="title">设备编号：{{item.order_id}}</div>
            <div class="main">
              <div>设备编号：{{item.macno}}</div>
              <div>地址：{{item.location}}</div>
              <div>支付时间：{{item.pay_time | timeStr}}</div>
            </div>
            <div class="price status1">￥{{item.total_price}}</div>
          </div>
        </router-link>
      </template>
    </o-refresh>
  </div>
</template>
<script>
import { shopApi } from "~jmlnmj/api";
export default {
  name: 'order',
  data() {
    return {
      orderList: [],
      form: {
        api_name: "orderList",
        token: this.tool.jmlnmj.getToken,
        page: 0,
        page_size: 30
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
      this.form.page++
      shopApi(this.form).then(res => {
        this.orderList = [...this.orderList, ...res.data]
        if (res.data.length < 30) {
          setTimeout(() => {
            this.$refs.reFresh.finished = true
            this.$refs.reFresh.loading = false
          }, 1000);
        }
      })
    },
    onLoad() {
      this.init()
    }
  }
};
</script>
<style scoped lang='less'>
#order {
  .orderList {
    color: #000000;
    margin-bottom: 0.2rem;
    .title,
    .price {
      background: #ffffff;
      padding: 0.2rem;
    }
    .title {
      color: #999999;
    }
    .price {
      &.status1 {
        text-align: right;
        color: #4cc15c;
      }
    }
    .main {
      padding: 0.2rem;
      line-height: 2;
    }
  }
}
</style>