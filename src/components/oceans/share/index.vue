<!-- share -->
<template>
    <div id="share" @click="close" v-show="show">
        <img src="../../../assets/img/share.png" alt="">
    </div>
</template>
<script>
export default {
    model: {
        prop: 'show',
        event: 'backShow',
    },
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        show(){
            if(this.show){
                console.log("打开了分享")
            }
        }
    },
    name: 'share',
    data() {
        return {};
    },
    created() {
        const _this = this
    },
    methods: {
        close() {
            this.$emit('backShow', false)
        }
    }
};
</script>
<style scoped lang='less'>
#share {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  height: 100vh;
}
</style>