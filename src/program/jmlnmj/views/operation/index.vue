<!-- operation -->
<template>
  <div id="operation">
    <div class="wd-100">
      <router-link to="/device">
        <div class="bfff btns">
          <img src="../../img/i_list.png" alt="">
          <div class="mg-t-10">设备管理</div>
        </div>
      </router-link>
      <router-link to="/message">
        <div class="bfff btns">
          <img src="../../img/i_message.png" alt="">
          <div class="mg-t-10">消息管理</div>
        </div>
      </router-link>
    </div>
    <o-button class="logout" @btnClick="logout">退出登录</o-button>
  </div>
</template>
<script>
export default {
  name: 'operation',
  data() {
    return {};
  },
  components: {},
  computed: {},
  created() {
    const _this = this
  },
  methods: {
    logout() {
      this.confirm({
        title: "温馨提示", // 标题
        content: "是否退出登录？", // 内容
        leftBtn: "取消", // 左边按钮
        rightBtn: "退出", // 右边按钮
        confirm: () => {
          this.tool.jmlnmj.opToken = ""
          this.$router.push("/?key_string=" + this.tool.jmlnmj.keyString)
        }
      })
    }
  }
};
</script>
<style scoped lang='less'>
#operation {
  background: linear-gradient(#73aff9, #4a58bd);
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;

  a {
    color: #000000 !important;
  }
  .btns {
    width: 4rem;
    text-align: center;
    padding: 0.5rem 0;
    border-radius: 5px;
    margin: auto;
    margin-top: 1rem;

    img {
      width: 0.8rem;
    }
  }

  .logout {
    width: 70%;
    margin: auto;
  }
}
</style>