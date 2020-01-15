<!-- myPackage -->
<template>
    <div id="myPackage">
        <template v-for="(item,index) in packageList">
            <div class="mg-t-20" :key="index">
                <div class="shopMsg pd-10 bfff radius10">
                    <div class="shopName">商家名称：{{item.shop_name}}</div>
                    <div class="shopName">商家地址：{{item.shop_address}}</div>
                </div>
                <div class="cardMsg flexAround wd-90 bfff pd-30">
                    <div class="times box">
                        <i class="icon snf-package font20 mg-r-10"></i>
                        <div>
                            <div class="tac cmain">
                                <span class="font20">{{item.subCard}}</span>次
                            </div>
                            <!-- <div>{{item.type==1?"次卡套餐":"限时卡套餐"}}</div> -->
                            <div>次卡套餐</div>
                        </div>
                    </div>
                    <div class="days box">
                        <i class="icon snf-clock font20 mg-r-10"></i>
                        <div>
                            <div class="tac cmain">
                                <span class="font20">{{item.limitCard}}</span>天
                            </div>
                            <!-- <div>{{item.type==1?"次卡套餐":"限时卡套餐"}}</div> -->
                            <div>限时卡套餐</div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
import { user } from "~snf/api";
export default {
    name: 'myPackage',
    data() {
        return {
            packageList: [
                // {
                //     voucher: 0, //体验券数量
                //     subCard: 0, //次卡数量
                //     limitCard: 0, //限时卡天数
                //     shop_name: "", //商家名称
                //     shop_address: "" //商家地址
                // },
            ]
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
                type: 1
            }).then(res => {
                this.packageList = res.data
                console.log(res)
            })
        }
    }
};
</script>
<style scoped lang='less'>
#myPackage {
  padding: 0 0.2rem;
  .shopMsg {
    box-shadow: 0 1px 3px 0 #f7d052;
    position: relative;
  }
  .cardMsg {
    border-bottom-left-radius: 0.2rem;
    border-bottom-right-radius: 0.2rem;
  }
  .snf-package {
    color: #49e4fc;
  }
  .snf-clock {
    color: #ff823e;
  }
}
</style>