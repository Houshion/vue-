<!-- login -->
<template>
    <div id="login">
        <div class="logo tac">
            <img :src="logo" alt="">
            <!-- <img src="../../img/image2.png" class="mg-auto"> -->
        </div>
        <o-login ref="loginBox" :boxMsg="boxMsg" @sendCode="sendCode"></o-login>
        <van-checkbox v-model="checked" class="tac">已阅读
            <router-link to="/agreement">《用户协议》</router-link>
        </van-checkbox>
        <o-button class="wd-90 mg-auto mg-tb-30" :plain="false" @btnClick="login">登录</o-button>
    </div>
</template>
<script>
import store from '@/store'
import { mapGetters } from "vuex";
import { user } from "~snf/api";
export default {
    name: 'login',
    data() {
        return {
            sendCodeStatus: true,
            logo: '',
            boxMsg: {
                username: {
                    placeholder: "请输入登录账号",
                    // error: "用户名错误",
                    // img: require('../../img/phone.png'),
                    icon: "icon snf-phone",
                    label: null,
                    value: null
                },
                sms: {
                    placeholder: "请输入短信验证码",
                    // img: require('../../img/key.png'),
                    icon: "icon snf-key",
                    label: null,
                    value: null
                }
            },
            checked: true
        };
    },
    components: {},
    computed: {
        ...mapGetters([
            'userInfo',
        ])
    },
    created() {
        const _this = this;
        this.getLogo()
    },
    methods: {
        async getLogo() {
            const res = await user({
                api_name: "getAgreement",
                type: 3
            })
            this.logo = res.data
            console.log(this.logo)
        },
        sendCode() {
            if (!this.sendCodeStatus) return false;
            if (!this.boxMsg.username.value) return this.$toast("手机号不能为空")
            user({
                api_name: "sendMobileCode",
                mobile: this.boxMsg.username.value,
            }).then(res => {
                let time = 60
                let interval = setInterval(() => {
                    if (time > 0) {
                        this.sendCodeStatus = false;
                        time--;
                        this.$refs.loginBox.sendCodeText = time + "s";
                    } else {
                        this.sendCodeStatus = true;
                        clearInterval(interval);
                        time = 60;
                        this.$refs.loginBox.sendCodeText = "重新获取";
                    }
                }, 1000);
                this.$toast("短信验证码发送成功")
            })
        },
        login() {
            if (!this.checked) return this.$toast("请认真阅读并同意用户协议内容！")
            user({
                api_name: "bindMobile",
                mobile: this.boxMsg.username.value,
                code: this.boxMsg.sms.value
            }).then(res => {
                this.$toast("绑定成功")
                this.userInfo.mobile = this.boxMsg.username.value
                store.dispatch("setUserInfo", this.userInfo)
                setTimeout(() => {
                    this.$router.push('/')
                }, 1500);
            })
        }
    }
};
</script>
<style scoped lang='less'>
#login {
  height: 100vh;
  background: #ffffff;
  padding: 0.5rem;
  .logo {
    img {
      width: 2rem;
      border-radius: 50%;
    }
  }
  a {
    color: #0077cc;
  }
}
</style>