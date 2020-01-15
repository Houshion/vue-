<!-- luckyDraw -->
<template>
  <div class="luckyDraw">
    <div class="halo">
      <div class="wheel-pointer-box">
        <div class="wheel-pointer" @click="rotate_handle()"></div>
      </div>
      <div id="circle0" :style="{transform:rotate_angle,transition:rotate_transition}">
        <div id="left">
          <div class="circle-left" id="circle1">
            <div class="sx">{{list[0].name}}</div>
          </div>
          <div class="circle-left" id="circle2">
            <div class="sx">{{list[1].name}}</div>
          </div>
          <div class="circle-left" id="circle3">
            <div class="sx">{{list[2].name}}</div>
          </div>
        </div>
        <div id="right">
          <div class="circle-right" id="circle6">
            <div class="sx">{{list[5].name}}</div>
          </div>
          <div class="circle-right" id="circle5">
            <div class="sx">{{list[4].name}}</div>
          </div>
          <div class="circle-right" id="circle4">
            <div class="sx">{{list[3].name}}</div>
          </div>
        </div>
      </div>
      <i :style="{transform:rotate_angle1,transition:rotate_transition}">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'luckyDraw',
  props: ["list"],
  data() {
    return {
      click_flag: true, //是否可以旋转抽奖
      start_rotating_degree: 0, //初始旋转角度
      rotate_angle: 0, //将要旋转的角度
      rotate_angle1: 0, //将要旋转的角度
      start_rotating_degree_pointer: 0, //指针初始旋转角度
      rotate_angle_pointer: 0, //指针将要旋转的度数
      rotate_transition: "transform 6s ease-in-out", //初始化选中的过度属性控制
      drawIndex: 0, //中奖list的下标
    };
  },
  computed: {},
  created() {
    const _this = this
    console.log(this.list)
  },
  methods: {
    rotate_handle() {
      // this.rotating();
      this.$emit("start")
    },
    rotating(index) {
      var _this = this;

      if(index) this.drawIndex = index;
      if (!this.click_flag) return;
      var during_time = 5; // 默认为1s
      var random = Math.floor(Math.random() * 5);
      var result_index = this.drawIndex; // 最终要旋转到哪一块，对应list的下标
      var result_angle = [330, 270, 210, 150, 90, 30]; //最终会旋转到下标的位置所需要的度数
      var rand_circle = 10; // 附加多转几圈，2-3
      this.click_flag = false; // 旋转结束前，不允许再次触发
      // 转动盘子
      var rotate_angle =
        this.start_rotating_degree +
        rand_circle * 360 +
        result_angle[result_index] -
        this.start_rotating_degree % 360;
      this.start_rotating_degree = rotate_angle;
      this.rotate_angle = "rotate(" + rotate_angle + "deg)";
      this.rotate_angle1 = "rotate(-" + rotate_angle + "deg)";
      // 旋转结束后，允许再次触发
      setTimeout(function () {
        _this.click_flag = true;
        _this.game_over();
      }, during_time * 1000 + 1500); // 延时，保证转盘转完
    },
    game_over() {
      this.hasPrize = this.list[this.drawIndex].isPrize
      console.log(this.list[this.drawIndex])
      this.$emit("result", this.drawIndex, this.list[this.drawIndex])
    },
  }
};
</script>
<style lang='less'>
@import url("./index");
</style>