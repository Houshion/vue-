<!-- countDetail -->
<template>
    <div id="countDetail">
        <div class="pd-10">
            <img src="../../img/count.png" class="wd-100">
            <div class="flexCenter tac countTitle cfff">
                <div class="wd-100 font32">{{this.$route.query.money}}元</div>
                <div class="label wd-100">总收入</div>
            </div>
        </div>
        <div class="bfff mg-t-30">
            <van-tabs color="#4b98f8" @click="changeTab">
                <van-tab v-for="(item,index) in tabs" :title="item.title" :key="index">
                    <div class="pd-10">
                        <template v-if="index==0">
                            <div class="tar c999 font12">销售日报（{{day}}）</div>
                            <div class="list">
                                <div>收入金额：{{countList.day.money}}</div>
                                <div>发生时间：{{countList.day.start_time | timeStr}}</div>
                                <div>销售收入：{{countList.day.total_price}}元</div>
                                <div>在线支付：{{countList.day.online_pay}}元</div>
                                <div>副卡支付：{{countList.day.swipe_pay}}元</div>
                                <div>合计销售稻谷：{{countList.day.weight}}斤</div>
                            </div>
                        </template>
                        <template v-else>
                            <template v-for="(item,index) in countList.month">
                                <div :key="index">
                                    <div class="tar c999 font12">销售月报（{{item.month}}）</div>
                                    <div class="list">
                                        <div>收入金额：{{item.money}}</div>
                                        <div>发生时间：{{item.start_time}} - {{item.end_time}}</div>
                                        <div>销售收入：{{item.total_price}}元</div>
                                        <div>在线支付：{{item.online_pay}}元</div>
                                        <div>副卡支付：{{item.swipe_pay}}元</div>
                                        <div>合计销售稻谷：{{item.weight}}斤</div>
                                    </div>
                                </div>
                            </template>
                        </template>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>
<script>
const now = new Date();
const year = now.getFullYear(); //得到年份
const month = now.getMonth() + 1;//得到月份
const date = now.getDate();//得到日期
import { shopApi } from "~jmlnmj/api";
export default {
    name: 'countDetail',
    data() {
        return {
            tabs: [
                { title: "日", type: 1 },
                { title: "月", type: 2 },
            ],
            countList: {
                day: {
                    "money": 0,//收入金额
                    "total_price": 0,//销售收入
                    "online_pay": 0,//在线支付
                    "swipe_pay": 0,//副卡支付
                    "weight": 0,//销售稻谷
                    "start_time": 1577276738//发生时间
                },
                month: [
                    {
                        "money": "35.00",//收入金额
                        "ctime": 1574392329,
                        "total_price": "40.00",//销售收入
                        "online_pay": "3.00",//在线支付
                        "swipe_pay": "3.00",//副卡支付
                        "weight": 11,//销售稻谷
                        "month": 12,
                        "start_time": "2019-12-01", //发生时间
                        "end_time": "2019-12-31"//发生时间
                    },
                    {
                        "money": "20.00",
                        "ctime": 1574392329,
                        "total_price": "20.00",
                        "online_pay": "2.00",
                        "swipe_pay": "2.00",
                        "weight": 6,
                        "month": 11,
                        "start_time": "2019-11-01",
                        "end_time": "2019-11-30"
                    }
                ]
            },
            form: {
                api_name: 'deviceStatistics',
                device_id: this.$route.query.id,
                type: 1
            }
        };
    },
    components: {},
    computed: {
        day() {
            return year + "年" + month + "月" + date + "日"
        },
        // month() {
        //     return year + "年" + month + "月"
        // }
    },
    created() {
        const _this = this
        this.init()
    },
    methods: {
        changeTab(index) {
            this.form.type = this.tabs[index].type
            this.init()
        },
        init() {
            shopApi(this.form).then(res => {
                switch (this.form.type) {
                    case 1:
                        this.countList.day = res.data
                        break;
                    default:
                        this.countList.month = res.data
                        break;
                }
            })
        }
    }
};
</script>
<style scoped lang='less'>
.countTitle {
  margin-top: -1.6rem;
}
.list {
  line-height: 2;
  padding: 0.2rem;
  background: #f5f5f5;
  border-radius: 5px;
  margin-top: 0.2rem;
}
</style>