<!-- about -->
<template>
    <div id="about">
        <div v-html="content"></div>
    </div>
</template>
<script>
import { user } from "~nmj/api";
export default {
    name: 'about',
    data() {
        return {
            content: "",
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
                this.content = res.data.company_intro
            })
        }
    }
};
</script>
<style scoped lang='less'>
#about {
  background: #ffffff;
  min-height: 100vh;
  padding: 0.2rem;
}
</style>