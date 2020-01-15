<!-- changeMobile -->
<template>
    <div id="changeMobile">
        <van-cell-group class="mg-b-10">
            <van-field v-model="form.mobile" center clearable label="手机号：" placeholder="请输入新手机号"></van-field>
        </van-cell-group>
        <van-cell-group class="mg-b-10">
            <van-field v-model="form.code" center clearable label="验证码：" placeholder="请输入短信验证码">
                <o-button slot="button" @btnClick="sendCode">{{codeText}}</o-button>
            </van-field>
        </van-cell-group>
        <o-button class="mg-t-30" @btnClick="confirm">确 认</o-button>
    </div>
</template>
<script>
import store from '@/store'
import { mapGetters } from "vuex";
import { user } from "~snf/api";
export default {
    name: 'changeMobile',
    data() {
        return {
            form: {
                api_name: "bindMobile",
                mobile: "",
                code: "",
            },
            codeText: "发送验证码",
            sendCodeStatus: true,
            loginStatus: true,
        };
    },
    components: {},
    computed: {
        ...mapGetters([
            'userInfo',
        ])
    },
    created() {
        const _this = this
        this.form.mobile = this.userInfo.mobile
    },
    methods: {
        sendCode() {
            if (!this.sendCodeStatus) return false;
            if (!this.form.mobile) return this.$toast("手机号不能为空")
            user({
                api_name: "sendMobileCode",
                mobile: this.form.mobile,
            }).then(res => {
                let time = 60
                let interval = setInterval(() => {
                    if (time > 0) {
                        this.sendCodeStatus = false;
                        time--;
                        this.codeText = time + "s";
                    } else {
                        this.sendCodeStatus = true;
                        clearInterval(interval);
                        time = 60;
                        this.codeText = "重新获取";
                    }
                }, 1000);
                this.$toast("短信验证码发送成功")
            })
        },
        confirm() {
            if (!this.loginStatus) return false;
            this.loginStatus = false
            user({
                api_name: "bindMobile",
                mobile: this.form.mobile,
                code: this.form.code
            }).then(res => {
                this.$toast("绑定成功")
                this.userInfo.mobile = this.form.mobile
                store.dispatch("setUserInfo", this.userInfo)
                setTimeout(() => {
                    this.$router.go(-1)
                }, 1500);
            })
        }
    }
};
</script>
<style scoped lang='less'>
#changeMobile {
  padding: 0.2rem;
}
</style>