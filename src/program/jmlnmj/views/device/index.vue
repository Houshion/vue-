<!-- deviceList -->
<template>
    <div id="deviceList">
        <o-refresh ref="reFresh" @onLoad="onLoad">
            <template v-for="(item,index) in list">
                <o-list :key="index">
                    <div slot="title" @click="detail(item.device_id)">
                        <div class="deviceNo fontb">编号：{{item.macno}}</div>
                        <div class="address c999">
                            <van-icon name="location-o"/>
                            {{item.location}}
                        </div>
                    </div>
                    <div slot="right" class="tac">
                        <div
                            :class="item.status==1?'status1':item.status==2?'status2':'status3'"
                        >{{item.status|statusStr}}</div>
                        <van-button
                            @click="replenishment(item)"
                            round
                            type="info"
                            size="mini"
                            class="replenishment"
                        >补货</van-button>
                    </div>
                </o-list>
            </template>
        </o-refresh>
    </div>
</template>
<script>
import { shopApi, staffApi } from "~jmlnmj/api";
export default {
    name: 'deviceList',
    data() {
        return {
            list: [],
            form: {
                api_name: 'deviceList',
                token: this.tool.jmlnmj.getToken,
                page: 0,
                page_size: 30
            }
        };
    },
    components: {},
    computed: {},
    filters: {
        statusStr(val) {
            switch (val) {
                case 1:
                    return "在线"
                    break;
                case 2:
                    return "故障"
                    break;
                default:
                    return "离线"
                    break;
            }
        },
    },
    created() {
        const _this = this
        this.init()
    },
    methods: {
        init() {
            this.form.page++
            if (this.tool.jmlnmj.loginType == 1) {
                shopApi(this.form).then(res => {
                    this.list = [...this.list, ...res.data]
                    console.log(this.list)
                    if (res.data.length < 30) {
                        setTimeout(() => {
                            this.$refs.reFresh.finished = true
                            this.$refs.reFresh.loading = false
                        }, 1000);
                    }
                })
            } else {
                staffApi(this.form).then(res => {
                    this.list = [...this.list, ...res.data]
                    console.log(res)
                    if (res.data.length < 30) {
                        setTimeout(() => {
                            this.$refs.reFresh.finished = true
                            this.$refs.reFresh.loading = false
                        }, 1000);
                    }
                })
            }
        },
        replenishment(item) {
            let { toplimit, stock, device_id, goods_id } = item
            if (goods_id == 0) return this.$toast("该设备未绑定商品，请前往后台绑定...")
            this.$router.push({
                name: "deviceReload",
                query: {
                    toplimit,
                    stock,
                    device_id,
                    goods_id
                }
            })
        },
        detail(id) {
            this.$router.push({
                name: "deviceDetail",
                query: {
                    id
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
#deviceList {
  padding: 0.2rem;
  .replenishment {
    background-color: #4b98f8 !important;
    border-color: #4b98f8 !important;
  }
  .status1 {
    color: #4cc15c;
  }
  .status2 {
    color: #f76461;
  }
  .status3 {
    color: #9f9f9f;
  }
}
</style>