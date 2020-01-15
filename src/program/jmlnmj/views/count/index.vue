<!-- countList -->
<template>
    <div id="countList">
        <o-refresh ref="reFresh" @onLoad="onLoad">
            <template v-for="(item,index) in list">
                <o-list
                    :key="index"
                    :url="'/countDetail?id='+item.device_id+'&money='+item.total_money"
                >
                    <div slot="title">
                        <div class="deviceNo fontb">编号：{{item.macno}}</div>
                        <div class="address c999">
                            <van-icon name="location-o"/>
                            {{item.location}}
                        </div>
                    </div>
                    <div slot="right" class="tac">
                        <div class="status1">{{item.total_money}}</div>
                    </div>
                </o-list>
            </template>
        </o-refresh>
    </div>
</template>
<script>
import { shopApi } from "~jmlnmj/api";
export default {
    name: 'countList',
    data() {
        return {
            list: [],
            form: {
                api_name: 'incomeStatistics',
                token: this.tool.jmlnmj.getToken,
                page: 0,
                page_size: 30
            }
        };
    },
    components: {},
    computed: {},
    filters: {},
    created() {
        const _this = this
        this.init()
    },
    methods: {
        init() {
            this.form.page++
            shopApi(this.form).then(res => {
                this.list = [...this.list, ...res.data]
                if (res.data.length < 30) {
                    setTimeout(() => {
                        this.$refs.reFresh.finished = true
                        this.$refs.reFresh.loading = false
                    }, 1000);
                }
                console.log(this.list)
            })
        },
        onLoad() {
            this.init()
        }
    }
};
</script>
<style scoped lang='less'>
#countList {
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