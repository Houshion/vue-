<!-- guideDetail -->
<template>
    <div id="guideDetail">
        <div class="pd-10 bfff">
            <div class="cmain">{{message.title}}</div>
            <div class="mg-t-20" v-html="message.content"></div>
        </div>
    </div>
</template>
<script>
import { user } from "~snf/api";
export default {
    name: 'guideDetail',
    data() {
        return {
            message: ''
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
            user({
                api_name: "getUserGuide",
                id: this.$route.query.id
            }).then(res => {
                this.message = res.data[0]
            })
        }
    }
};
</script>
<style scoped lang='less'>
#guideDetail {
  padding: 0.2rem;
  & > div {
    min-height: calc(100vh - 0.4rem);
  }
}
</style>