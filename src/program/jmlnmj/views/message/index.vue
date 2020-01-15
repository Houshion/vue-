<!-- message -->
<template>
    <div id="message">
        <o-refresh ref="reFresh" @onLoad="onLoad">
            <template v-for="(item,index) in list">
                <o-list :key="index">
                    <div slot="title">
                        <div class="deviceNo fontb">编号：{{item.macno}}</div>
                        <div class="address c999">
                            <van-icon name="location-o"/>
                            {{item.location}}
                        </div>
                        <div class="address c999">
                            <van-icon name="clock-o"/>
                            {{item.ctime | timeStr}}
                        </div>
                    </div>
                    <div slot="right" class="tac">
                        <div
                            :class="item.type==1?'status1':item.type==2?'status2':'status3'"
                        >{{item.type|statusStr}}</div>
                    </div>
                </o-list>
            </template>
        </o-refresh>
    </div>
</template>
<script>
import { shopApi, staffApi } from "~jmlnmj/api";
export default {
    name: 'message',
    data() {
        return {
            list: [
                {
                    fault_id: 10,
                    macno: 'sb123465',
                    type: 1, //1=设备异常2=库存不足3=设备断电
                    ctime: 1577930051,//创建时间
                    location: '东莞天安数码城',//地址
                }
            ],
            form: {
                api_name: 'newsList',
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
                    return "设备异常"
                    break;
                case 2:
                    return "库存不足"
                    break;
                case 3:
                    return "设备断电"
                    break;
                default:
                    break;
            }
        }
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
                    console.log(res)
                    this.list = [...this.list, ...res.data]
                    if (res.data.length < 30) {
                        setTimeout(() => {
                            this.$refs.reFresh.finished = true
                            this.$refs.reFresh.loading = false
                        }, 1000);
                    }
                })
            } else {
                staffApi(this.form).then(res => {
                    console.log(res)
                    this.list = [...this.list, ...res.data]
                    if (res.data.length < 30) {
                        setTimeout(() => {
                            this.$refs.reFresh.finished = true
                            this.$refs.reFresh.loading = false
                        }, 1000);
                    }
                })
            }
        },
        onLoad() {
            this.init()
        }
    }
};
</script>
<style scoped lang='less'>
#message {
  padding: 0.2rem;
}
</style>