<!-- introduce -->
<template>
    <div id="introduce">
        <div v-html="content"></div>
    </div>
</template>
<script>
import { user } from "~nmj/api";
export default {
    name: 'introduce',
    data() {
        return {
            content: ""
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
            user({ api_name: 'projectIntroduce' }).then(res => {
                this.content = res.data.project_intro
            })
        }
    }
};
</script>
<style scoped lang='less'>
#introduce {
  padding: 0.2rem;
  background: #ffffff;
  min-height: 100vh;
}
</style>