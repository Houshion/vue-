<!-- guide -->
<template>
    <div id="guide">
        <div class="cmain pd-tb-20">常见问题</div>
        <o-list islink v-for="(item,index) in list" :key="index" :url="'guideDetail?id='+item.id">
            <div slot="title">{{item.title}}</div>
        </o-list>
    </div>
</template>
<script>
import { user } from "~snf/api";
export default {
    name: 'guide',
    data() {
        return {
            list: []
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
            user({ api_name: "getUserGuide" }).then(res => {
                this.list = res.data
                console.log(res)
            })
        }
    }
};
</script>
<style scoped lang='less'>
#guide {
  padding: 0.2rem;
}
</style>