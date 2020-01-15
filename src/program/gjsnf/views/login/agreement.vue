<!-- agreement -->
<template>
    <div id="agreement">
        <div v-html="content"></div>
    </div>
</template>
<script>
import { user } from "~snf/api";
export default {
    name: 'agreement',
    data() {
        return {
            content: ''
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
                api_name: "getAgreement",
                type: "1"
            }).then(res => {
                this.content = res.data
            })
        }
    }
};
</script>
<style scoped lang='less'>
#agreement {
  padding: 0.2rem;
  background: #ffffff;
  min-height: 100vh;
}
</style>