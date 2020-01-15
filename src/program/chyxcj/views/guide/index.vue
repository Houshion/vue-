<!-- guide -->
<template>
    <div id="guide">
        <van-collapse v-model="activeNames">
            <van-collapse-item
                class="mg-b-5"
                :title="item.title"
                :name="index"
                v-for="(item,index) in questionList"
                :key="index"
            >
                <div slot="icon">
                    <i class="iconfont chy-fill"></i>
                </div>
                <div>{{item.content}}</div>
            </van-collapse-item>
        </van-collapse>
        <div class="tel">
            服务指南：
            <a class="cmain" :href="'tel:+'+tel">{{tel}}</a>
        </div>
    </div>
</template>
<script>
export default {
    name: 'guide',
    data() {
        return {
            activeNames: [],
            questionList: [
                { title: "这是问题", content: "这是答案" },
                { title: "这是问题", content: "这是答案" },
                { title: "这是问题", content: "这是答案" },
            ],
            tel: '400-400-8820'
        };
    },
    components: {},
    computed: {},
    created() {
        const _this = this
    },
    methods: {
    }
};
</script>
<style scoped lang='less'>
#guide {
  padding: 0.25rem;
  .tel {
    width: 100%;
    position: absolute;
    text-align: center;
    bottom: 0.25rem;
  }
}
</style>