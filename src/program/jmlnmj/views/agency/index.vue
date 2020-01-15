<!-- agency -->
<template>
    <div id="agency">
        <div class="income">
            <div class="flexAround pd-20">
                <div class="tac sColor">
                    <div class="font32 fontb">{{shopData.today_order}}</div>
                    <div>今日订单数</div>
                </div>
                <div class="tac sColor">
                    <div class="font32 fontb">{{shopData.device_on_line+"/"+shopData.device_total}}</div>
                    <div>在线/总台数</div>
                </div>
            </div>
            <div class="flexAround">
                <div class="tac">
                    <div class="font22">￥{{shopData.today_income}}</div>
                    <div>今日收益</div>
                </div>
                <div class="tac">
                    <div class="font22">￥{{shopData.month_income}}</div>
                    <div>本月收益</div>
                </div>
                <div class="tac">
                    <div class="font22">￥{{shopData.total_income}}</div>
                    <div>累计收益</div>
                </div>
            </div>
        </div>
        <div class="wd-100 flexBetween">
            <router-link class="bfff btns" :to="item.url" v-for="(item,index) in list" :key="index">
                <div>
                    <img :src="item.icon" alt="">
                    <div class="mg-t-10">{{item.name}}</div>
                </div>
            </router-link>
        </div>
        <o-button class="logout" @btnClick="logout">退出登录</o-button>
    </div>
</template>
<script>
import { shopApi } from "~jmlnmj/api";
export default {
    name: 'agency',
    data() {
        return {
            list: [
                {
                    name: "收入统计",
                    icon: require("~jmlnmj/img/i_count.png"),
                    url: "/count"
                },
                {
                    name: "设备管理",
                    icon: require("~jmlnmj/img/i_list.png"),
                    url: "/device"
                },
                {
                    name: "订单管理",
                    icon: require("~jmlnmj/img/i_order.png"),
                    url: "/order"
                },
                {
                    name: "消息管理",
                    icon: require("~jmlnmj/img/i_message.png"),
                    url: "/message"
                },
            ],
            shopData: {
                "today_order": 0,//今日订单
                "today_income": 0,//今日收入
                "month_income": 0,//本月收入
                "total_income": 0,//累计收益
                "device_on_line": 1,//在线
                "device_total": 2//总台数
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
            shopApi({
                api_name: "shopIndex",
                token: this.tool.jmlnmj.agToken
            }).then(res => {
                this.shopData = res.data
            })
        },
        logout() {
            this.confirm({
                title: "温馨提示", // 标题
                content: "是否退出登录？", // 内容
                leftBtn: "取消", // 左边按钮
                rightBtn: "退出", // 右边按钮
                confirm: () => {
                    this.tool.jmlnmj.agToken = ""
                    this.$router.push("/?key_string="+this.tool.jmlnmj.keyString)
                }
            })
        }
    }
};
</script>
<style scoped lang='less'>
#agency {
  background: linear-gradient(#73aff9, #4a58bd);
  height: 100vh;
  padding: 0.2rem;

  .income {
    background: #ffffff;
    border-radius: 5px;
    padding: 0.5rem;
    background-image: url("../../img/agency.png");
    background-size: 3rem;
    background-position: center;
    background-repeat: no-repeat;
    .sColor {
      color: #ee7601;
    }
  }

  a {
    color: #000000 !important;
  }
  .btns {
    width: calc((100% - 0.2rem) / 2);
    text-align: center;
    padding: 0.5rem 0;
    border-radius: 5px;
    margin-top: 0.2rem;
    img {
      width: 0.8rem;
    }
  }

  .logout {
    width: calc(70% - 0.4rem);
    margin: .5rem 15%;
  }
}
</style>