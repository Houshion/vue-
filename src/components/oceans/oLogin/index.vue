<template>
  <div id="oLogin">
    <div class="headerImg pd-tb-35" v-if="head">
      <div class="img box mg-auto bfff">
        <img :src="head" alt="">
      </div>
    </div>
    <div class="loginBox pd-15">
      <van-cell-group class="tal">
        <van-field
          class="flexVcenter"
          clearable
          v-model="boxMsg.username.value"
          :placeholder="boxMsg.username.placeholder"
          :label="boxMsg.username.label"
          :error-message="error.user"
        >
          <img
            :src="boxMsg.username.img"
            class="leftIcon"
            slot="left-icon"
            v-if="boxMsg.username.img"
          >
          <i
            class="iconfont"
            :class="boxMsg.username.icon"
            slot="left-icon"
            v-if="boxMsg.username.icon"
          ></i>
        </van-field>
        <van-field
          class="flexVcenter"
          left
          clearable
          v-if="boxMsg.sms"
          v-model="boxMsg.sms.value"
          :placeholder="boxMsg.sms.placeholder"
          :label="boxMsg.sms.label"
        >
          <!-- <van-icon
            :name="boxMsg.sms.img"
            class="leftIcon"
            :class="boxMsg.sms.icon"
            slot="left-icon"
            v-if="boxMsg.sms.img"
          />-->

          <img :src="boxMsg.sms.img" class="leftIcon" slot="left-icon" v-if="boxMsg.sms.img">
          <i class="iconfont" :class="boxMsg.sms.icon" slot="left-icon" v-if="boxMsg.sms.icon"></i>
          <van-button slot="button" size="small" type="primary" @click="sendCode">{{sendCodeText}}</van-button>
          <!-- <o-button slot="button" @btnClick="sendCode">{{sendCodeText}}</o-button> -->
        </van-field>
        <van-field
          v-if="boxMsg.password"
          class="flexVcenter"
          clearable
          :type="passShow?'text':'password'"
          v-model="boxMsg.password.value"
          :placeholder="boxMsg.password.placeholder"
          :label="boxMsg.password.label"
          :error-message="error.pass"
          @click-right-icon="passShow = !passShow;"
        >
          <img
            :src="boxMsg.password.img"
            class="leftIcon"
            slot="left-icon"
            v-if="boxMsg.password.img"
          >
          <i
            class="iconfont"
            :class="boxMsg.password.icon"
            slot="left-icon"
            v-if="boxMsg.password.icon"
          ></i>
          <van-icon name="eye-o" slot="right-icon" v-if="passShow"/>
          <van-icon name="closed-eye" slot="right-icon" v-else/>
        </van-field>
      </van-cell-group>
    </div>
    <!-- <o-button class="wd-90 mg-auto mg-tb-30" color="cmain" :plain="false" @btnClick="login">登录</o-button> -->
  </div>
</template>

<script>
export default {
  name: "oLogin",
  props: {
    head: {
      type: String,
    },
    error: {
      type: Object,
      default: () => ({ user: null, pass: null })
    },
    boxMsg: {
      type: Object,
      default: () => ({
        username: {
          placeholder: {
            type: String,
            default: "请输入登录账号"
          },
          error: "用户名错误",
          icon: null,
          label: null,
          value: null
        },
        sms: {
          placeholder: "请输入短信验证码",
          icon: null,
          label: null,
          value: null
        },
        password: {
          placeholder: "请输入登录密码",
          error: "密码错误",
          icon: null,
          label: null,
          value: null
        },
      })
    },
  },
  data() {
    return {
      passShow: false,
      sendCodeText: "发送验证码",
    };
  },

  components: {},

  created() {
    const _this = this;
  },

  mounted() {
    const _this = this;
  },
  methods: {
    sendCode() {
      this.$emit("sendCode");
    },
    login() {
      this.$emit("login", this.boxMsg);
    },
    showPassword() {
      this.passShow = !this.passShow;
    }
  }
};
</script>
<style lang='less'>
@import url("../../../assets/css/o_color");
.headerImg {
  .img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid #ccc;
    padding: 15px;
    img {
      width: 100%;
    }
  }
}
.loginBox {
  border-radius: 10px;
  .van-cell {
    background: #ebedf0;
    &:not(:last-child)::after {
      border-color: #999;
      right: 15px;
    }
  }
  .leftIcon {
    height: 24px;
    display: block;
  }
}
.van-button--primary {
  background-color: @baseColor;
  border: 1px solid @baseColor;
}
</style>
