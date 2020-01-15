<!-- binding -->
<template>
    <div id="binding">
        <van-cell-group>
            <van-field v-model="shopName" label="商家名称" disabled/>
            <van-field v-model="form.shop_code" label="验证码" placeholder="请输入商家验证码"/>
            <o-button class="bindingBtn" @btnClick="binding">绑定</o-button>
        </van-cell-group>
    </div>
</template>
<script>
import { user } from "~nmj/api";
export default {
    name: 'binding',
    data() {
        return {
            form: {
                api_name: "bindingShop",
                shop_id: '',
                code: "",
                shop_code: '',
            },
            shopName: '',
        };
    },
    components: {},
    computed: {},
    created() {
        const _this = this
        this.form.shop_id = this.$route.query.shopId
        this.init()
    },
    methods: {
        init() {
            user({
                api_name: "shopList",
                shop_id: this.form.shop_id
            }).then(res => {
                console.log(res)
                this.shopName = res.data.user_name
            })
        },
        binding() {
            this.form.code = localStorage.getItem("code");
            if (!this.form.shop_code) {
                return this.$toast("请输入商家验证码");
            }
            if (!this.form.code) {
                var redirect_uri = encodeURIComponent(location.href)
                window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8b5cfa2bc037259f&redirect_uri='+redirect_uri+'&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect'
                return;
            }
            user(this.form).then(res => {
                if (res.code == 1) {
                    this.$toast("绑定成功");
                    setTimeout(() => {
                        this.wechat.close()
                    }, 1500);
                } else {
                    this.$toast(res.msg)
                }
            })
        }
    }
};
</script>
<style scoped lang='less'>
#binding {
  background: #ffffff;
  min-height: 100vh;
  .bindingBtn {
    width: 70%;
    margin: 1rem auto;
  }
}
</style>