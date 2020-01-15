<template>
  <div id="luckyDraw">
    <div id="rotary-table">
      <div class="drawView">
        <div class="viewScreen">
          <img src="./img/drawView.png" alt="">
        </div>
        <div
          class="award"
          v-for="(award,index) in awardsList"
          :class="['award'+index,{'active': index==current}]"
          :key="index"
        >{{award.name}}</div>
        <div class="center">
          <slot name="probability"></slot>
          <img src="./img/center.png" alt="">
        </div>
      </div>
      <!-- <div id="start-btn" @click="start">开始</div> -->
    </div>
    <div class="middleLine flexAround">
      <div></div>
      <div></div>
    </div>
    <div id="control">
      <div class="control">
        <div class="awards flexAround">
          <div
            class="list"
            :class="item.active? 'active': ''"
            v-for="(item,index) in prizeList"
            :key="index"
          >
            <img :src="item.img" alt="" @click="choosePrize(item)">
            ￥{{item.price|toFixed(2)}}
          </div>
        </div>
        <div class="tac cfff">奖品：商品{{countNum}}件 价值：￥{{countPrice|toFixed(2)}}</div>
        <div class="bottomBtns flexAround">
          <div class="btn clause" @click="$emit('clause')">条款</div>
          <div id="start-btn" @click="start">
            <img src="./img/start.png" alt="">
          </div>
          <div class="btn rule" @click="$emit('rule')">规则</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    awardsList: Array,
    prizeList: {
      type: Array,
      default: () => [
        { img: require('./img/award.png'), price: '2.5', active: false },
        { img: require('./img/award.png'), price: '2.5', active: false },
        { img: require('./img/award.png'), price: '2.5', active: false },
      ]
    }
    // award: Object
  },
  data() {
    return {
      current: 0,
      speed: 200, //走动速度
      diff: 30, //改变走动速度的浮动值
      time: Date.now(), //当前时间
      awardIndex: '', //中奖下标值
      award: {} //中奖结果
    };
  },
  watch: {
    awardIndex() {
      this.award = this.awardsList[this.awardIndex]
      // this.move()
      console.log(typeof this.awardIndex)
    }
  },
  computed: {
    countNum() {
      let num = 0;
      this.prizeList.forEach(item => {
        if (item.active) {
          num++
        }
      });
      return num
    },
    countPrice() {
      let price = 0;
      this.prizeList.forEach(item => {
        if (item.active) {
          price = Number(item.price) + price
        }
      });
      console.log(price)
      return price
    },
  },
  methods: {
    start() {
      // 开始抽奖
      this.$emit("start")

      // this.speed = 200;
      // this.diff = 15;
    },
    // drawAward() {
    //   // 请求接口, 这里我就模拟请求后的数据(请求时间为2s)
    //   console.log(this.awardIndex, JSON.stringify(this.awardsList[this.awardIndex]))
    //   this.award = this.awardsList[this.awardIndex];

    //   this.move();
    // },
    move() {
      // this.speed = 100;
      // this.diff = 15;
      window.timeout = setTimeout(() => {
        this.current++;
        if (this.current > 11) {
          this.current = 0;
        }
        if (this.award.id && (Date.now() - this.time) / 1000 > 2) {
          this.speed += this.diff;
          if ((Date.now() - this.time) / 1000 > 4 && this.award.id == this.awardsList[this.current].id) {
            clearTimeout(window.timeout);
            setTimeout(() => {
              alert('恭喜你，抽中了' + this.award.name);
            }, 0);
            return;
          }
        } else {
          this.speed -= this.diff;
        }
        console.log(this.speed)

        this.move();

      }, this.speed);
    },
    choosePrize(item) {
      item.active = !item.active
    },
  }
};
</script>

<style rel="stylesheet/less" lang="less">
@import url("./index");
</style>