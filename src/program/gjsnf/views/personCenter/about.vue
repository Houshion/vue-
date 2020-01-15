<!-- about -->
<template>
    <div id="about">
        <div class="logo">
            <img :src="aboutMsg.logo" alt="">
        </div>
        <div class="title tac fontb font16 mg-b-30">{{aboutMsg.title}}</div>
        <div v-html="aboutMsg.content" class="pd-10"></div>
        <div class="phone">
            客服电话：
            <a :href="'tel:+'+aboutMsg.customer_phone">{{aboutMsg.customer_phone}}</a>
        </div>
    </div>
</template>
<script>
import { user } from "~snf/api";
export default {
    name: 'about',
    data() {
        return {
            aboutMsg: ''
        };
    },
    components: {},
    computed: {},
    created() {
        const _this = this
        user({
            api_name: 'getAbout',
        }).then(res => {
            this.aboutMsg = res.data
        })
    },
    methods: {
    }
};
</script>
<style scoped lang='less'>
#about {
  background: #ffffff;
  min-height: 100vh;
  .logo {
    width: 2rem;
    margin: auto;
    padding: 0.8rem 0 .2rem;
    img {
      border-radius: 50%;
    }
  }
  .phone {
    position: absolute;
    bottom: 0.3rem;
    width: 100%;
    text-align: center;
    color: #afafaf;
    a {
      color: #afafaf;
    }
  }
}
</style>