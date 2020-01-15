<template>
  <div id="alert" v-if="isShow">
    <div class="alertBox">
      <div class="pd-tb-15">
        <div class="alert_title">{{ title }}</div>
        <div class="alert_text">{{ content }}</div>
      </div>
      <div class="confirm" @click="confirm">确定</div>
    </div>
    <div class="mask" @click="isShow = false"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: true,
      content: "",
      title: "",
      refunc: null
    };
  },
  methods: {
    confirm: function () {
      this.isShow = false;
      if (this.refunc != null) {
        this.refunc();
      }
    }
  }
};
</script>

<style lang='less'>
@import "../../../../assets/css/o_color.less";
* {
  margin: 0;
  padding: 0;
}
#alert {
  position: fixed;
  width: 100%;
  height: 100%;
  text-align: center;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  .alertBox {
    width: 60%;
    top: 40%;
    background: #ffffff;
    margin: auto;
    position: relative;
    border-radius: 15px;

    .pd-tb-15 {
      div {
        margin: 10px 0;
        font-size: 14px;
        padding: 0 10px;
      }
    }

    .alert_title {
      font-size: 18px;
      word-wrap: break-word;
      font-weight: bold;
      margin: 20px 0;
      padding-top: 10px;
    }
  }
  .confirm {
    padding: 10px !important;
    background: @baseColor;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
    color: #ffffff;
  }
}
</style>  