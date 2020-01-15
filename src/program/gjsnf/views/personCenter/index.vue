<!-- personCenter -->
<template>
    <div id="personCenter">
        <o-center :headImg="userMsg.headImg" :listData="listData">
            <div slot="info" class="font20" @click="go">{{userMsg.name}}</div>
        </o-center>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    name: 'personCenter',
    data() {
        return {
            userMsg: {
                name: "Ocean",
                headImg: require('~snf/img/image.png'),
            },
            listData: [
                [
                    {
                        name: "我的预约",
                        url: "/myBooking",
                        icon: 'icon snf-booking'
                    },
                    {
                        name: "我的订单",
                        url: "/orderIndex",
                        icon: 'icon snf-order'
                    },
                    {
                        name: "我的钱包",
                        url: "/wallet",
                        icon: 'icon snf-wallet'
                    },
                    {
                        name: "地址管理",
                        url: "/addressList",
                        icon: 'icon snf-map'
                    },
                    {
                        name: "意见反馈",
                        url: "/feedback",
                        icon: 'icon snf-feedback'
                    },
                    {
                        name: "用户指南",
                        url: "/guide",
                        icon: 'icon snf-guide'
                    },
                    {
                        name: "关于我们",
                        url: "/about",
                        icon: 'icon snf-about'
                    },
                ],
            ]
        };
    },
    components: {},
    computed: {
        ...mapGetters([
            'userInfo',
        ])
    },
    created() {
        const _this = this
        console.log(this.userInfo)

        this.userMsg = {
            name: this.userInfo.nickname,
            headImg: this.userInfo.headimgurl,
        };
    },
    methods: {
        go(){
            this.$router.push("/information")
        }
    }
};
</script>
<style scoped lang='less'>
</style>