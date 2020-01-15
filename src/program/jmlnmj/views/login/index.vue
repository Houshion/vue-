<!-- login -->
<template>
    <div id="login">
        <m-login :boxMsg="boxMsg" :logo="logo" @login="login"></m-login>
    </div>
</template>
<script>
import { pubApi } from "~jmlnmj/api";
export default {
    name: 'login',
    data() {
        return {
            logo: require("@/assets/logo.png"),
            // 运维： 15915647595     123456
            // 商家： zhugesh   123456
            boxMsg: {
                username: {
                    placeholder: "登录账号",
                    // img: require('../../img/phone.png'),
                    value: ''
                },
                password: {
                    placeholder: "登录密码",
                    // img: require('../../img/key.png'),
                    value: ''
                },
            }
        };
    },
    components: {},
    computed: {},
    created() {
        const _this = this
        this.tool.jmlnmj.keyString = this.$route.query.key_string
        if (this.tool.jmlnmj.opToken) {
            this.$router.push({
                name: "opration"
            })
        } else if (this.tool.jmlnmj.agToken) {
            this.$router.push({
                name: "agency"
            })
        } else {
            if (!this.base.getUrlParms("code")) {
                console.log("no code")
                this.goAuth()
            } else {
                this.init()
            }
        }
    },
    methods: {
        init() {
            pubApi({
                api_name: 'getLogo',
                key_string: this.$route.query.key_string
            }).then(res => {
                if (res.code == 1) {
                    this.logo = res.data.logo
                }
            })
        },
        goAuth(url) {
            const redirect_uri = url ? url : encodeURIComponent(location.href)
            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5d7a9aec8308a57d&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect'
        },
        login(res) {
            let code = this.base.getUrlParms("code")
            let form = {
                api_name: 'Land',
                account: res.username.value,
                password: res.password.value,
                code
            }
            pubApi(form).then(res => {
                this.toast("登录成功")
                let url
                this.tool.jmlnmj.loginType = res.data.type
                if (res.data.type == 2) {
                    this.tool.jmlnmj.opToken = res.data.token
                    url = "operation"
                } else {
                    this.tool.jmlnmj.agToken = res.data.token
                    url = "agency"
                }
                if (res.code == 1) {
                    setTimeout(() => {
                        this.$router.push({
                            name: url
                        })
                    }, 1500);
                } else if (res.code == 2) {
                    this.alert("温馨提示", "您尚未关注公众，后续将无法获取系统推送该消息，请及时前往关注", () => {
                        this.$router.push({
                            name: url
                        })
                    })
                } else {
                    this.toast("微信授权失败，系统将重新授权")
                    const url = 'http://fljmlnmj.app.xiaozhuschool.com/h5/#/?key_string=' + this.tool.jmlnmj.keyString
                    setTimeout(() => {
                        this.goAuth(encodeURIComponent(url))
                    }, 1500);
                }
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
}
</style>