<!-- walletDetail -->
<template>
    <div id="walletDetail">
        <!-- <o-list v-for="(item,index) in list" :key="index">
            <div slot="title">
                <div class="label font16">{{item.remark}}</div>
                <div class="time c999">{{item.ctime}}</div>
            </div>
            <div slot="right" class="cred">{{item.type==1?"-":"+"}}￥{{item.money}}</div>
        </o-list>-->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="v100">
            <van-list
                :offset="50"
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
            >
                <van-cell-group>
                    <van-cell
                        class="tal boxShadow mg-b-10 radius10"
                        v-for="(item,index) in list"
                        :key="index"
                    >
                        <div class="flexVcenter flexBetween">
                            <div slot="title" class="tal">
                                <div class="label font16">{{item.remark}}</div>
                                <div class="time c999">{{item.ctime}}</div>
                            </div>
                            <div slot="right-icon" class="h100">
                                <div class="cred">{{item.type==1?"-":"+"}}￥{{item.money}}</div>
                            </div>
                        </div>
                    </van-cell>
                </van-cell-group>
            </van-list>
        </van-pull-refresh>
    </div>
</template>
<script>
import { user } from "~snf/api";
export default {
    name: 'walletDetail',
    data() {
        return {
            isLoading: false,
            loading: false,
            finished: false,
            list: [],
            form: {
                api_name: "wallet",
                type: 3,
                page: 1,
                pagesize: 20
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
            user(this.form).then(res => {
                res.data.forEach(item => {
                    this.list.push(item)
                });
                this.loading = false;
                if (res.data.length <= 0) {
                    this.finished = true;
                }
            })
        },
        onRefresh() {
            setTimeout(() => {
                this.toast('刷新成功');
                this.isLoading = false
            }, 500);
        },
        onLoad() {
            this.form.page++
            this.init()
        },
    }
};
</script>
<style scoped lang='less'>
#walletDetail {
  padding: 0.2rem;
}
</style>