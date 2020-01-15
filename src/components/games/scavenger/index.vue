<!-- Scavenger -->    
<template>
    <div class="bg">
        <img src="./img/bg.png" class="bgImg">
        <slot name="rule"></slot>
        <div class="scavengerStamp">
            <div :id="scavengerId" class="scratchCard">
                <div class="result" v-show="showLucky">
                    <slot name="result"></slot>
                    <img :src="resultImg" alt="" class="pic">
                </div>
                <canvas id="scratchCanvas">asdf</canvas>
            </div>
        </div>
        <div class="reward">
            <div class="prize flexStart">
                <div class="title">奖品</div>
                <div class="flexVcenter pd-l-10 cfff">{{reward.list}}</div>
            </div>
            <div class="num flexStart">
                <div class="title">奖品数量</div>
                <div class="flexVcenter pd-l-10 cfff">x{{reward.num}}</div>
            </div>
            <div class="price flexStart">
                <div class="title">奖品价值</div>
                <div class="flexVcenter pd-l-10 cfff">￥{{reward.price|toFixed(2)}}</div>
            </div>
        </div>
        <div class="rewardList">
            <div class="flexAround">
                <div
                    class="list"
                    :class="item.active? 'active': ''"
                    v-for="(item,index) in awardsList"
                    :key="index"
                    @click="choosePrize(item)"
                >
                    <img src="./img/priceBg.png">
                    ￥{{item.price|toFixed(2)}}
                </div>
            </div>
            <o-button color="#ef5548" class="fontb wd-40 mg-t-10">支付抽奖</o-button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Scavenger',
    data() {
        return {
            supportTouch: false,       //是否支持touch事件
            events: [],                //touch事件 or mouse事件合集
            startMoveHandler: null,    //touchstart or mousedown 事件
            moveHandler: null,         //touchmove or mousemove 事件
            endMoveHandler: null,      //touchend or mouseend 事件
            showLucky: false,          //显示隐藏抽奖结果
            firstTouch: true,          //是否第一次touchstart or mousedown
            shouldTouch: false,        //是否可以开始刮奖
        }
    },
    props: {
        scavengerId: {  //组件最外层DOM的id属性
            type: String,
            default: 'scavenger',
        },
        moveRadius: {  //刮刮范围
            type: Number,
            default: 15
        },
        ratio: {   //要求刮掉的面积占比，达到这个占比后，将会自动把其余区域清除
            type: Number,
            default: 0.3
        },
        startCallback: {   //第一次刮回调函数
            type: Function,
            default: function () {
            }
        },
        clearCallback: {   //达到ratio占比后的回调函数
            type: Function,
            default: function () {
            }
        },
        coverColor: {  //刮刮卡遮罩颜色
            type: String,
            default: '#C5C5C5'
        },
        coverImg: {    //刮刮卡遮罩图片
            type: String,
        },
        resultImg: {       //中奖的图
            type: String,
            default: 'https://raw.githubusercontent.com/ZENGzoe/imagesCollection/master/2018/default.jpg'
        },
        rewardList: {  //奖品列表
            type: Array,
        },
        awardsList: {  //中奖概率
            type: Array
        }
    },
    mounted: function () {
        this.$nextTick(() => {
            this.init();
        })
    },
    computed: {
        reward() {
            let num = 0, price = 0, list = new Array();
            let reward = new Object();
            this.rewardList.forEach(item => {
                num += item.num;
                price += item.num * item.price;
                list.push(item.name + "x" + item.num)
            });
            reward = { num, price, list: list.join(",") }
            console.log(reward)
            return reward;
        },
    },
    methods: {
        init: function () {
            if (!this.isSupportCanvas) {
                alert('当前浏览器不支持canvas');
                return;
            }
            const canvasWrap = document.getElementById(this.scavengerId);
            this.canvas = canvasWrap.querySelector('#scratchCanvas');
            this.ctx = this.canvas.getContext('2d');
            this.canvas.width = canvasWrap.clientWidth;
            this.canvas.height = canvasWrap.clientHeight;

            this.createCanvasStyle();
            this.bindEvent()
        },
        isSupportCanvas: function () {
            var elem = document.createElement('canvas');
            return !!(elem.getContext && ele.getContext('2d'))
        },
        createCanvasStyle: function () {
            var _this = this;
            //当传入coverImg时，优先使用图片，否则使用颜色作为刮刮卡遮罩
            if (this.coverImg) {
                var coverImg = new Image();
                coverImg.src = this.coverImg;
                coverImg.onload = function () {
                    _this.ctx.drawImage(coverImg, 0, 0, _this.canvas.width, _this.canvas.height);
                }
            } else {
                _this.ctx.fillStyle = _this.coverColor;
                _this.ctx.fillRect(0, 0, _this.canvas.width, _this.canvas.height);
            }
        },
        bindEvent: function () {
            if ('ontouchstart' in window) this.supportTouch = true;
            this.events = this.supportTouch ? ['touchstart', 'touchmove', 'touchend'] : ['mousedown', 'mousemove', 'mouseup'];
            this.addEvent();
        },
        addEvent: function () {
            this.startMoveHandler = this.startEventHandler.bind(this);
            this.canvas.addEventListener(this.events[0], this.startMoveHandler, false);
        },
        startEventHandler: function (e) {
            e.preventDefault();
            if (this.firstTouch) {
                this.startCallback();
                this.firstTouch = false;
            }
            this.showLucky = true;
            this.moveHandler = this.moveEventHandler.bind(this);
            this.endMoveHandler = this.endEventHandler.bind(this);
            this.canvas.addEventListener(this.events[1], this.moveHandler, false);
            document.addEventListener(this.events[2], this.endMoveHandler, false);
        },
        moveEventHandler: function (e) {
            e.preventDefault();

            e = this.supportTouch ? e.touches[0] : e;
            const canvasPos = this.canvas.getBoundingClientRect(),
                scrollT = document.documentElement.scrollTop || document.body.scrollTop,
                scrollL = document.documentElement.scrollLeft || document.body.scrollLeft,
                mouseX = e.pageX - canvasPos.left - scrollL,
                mouseY = e.pageY - canvasPos.top - scrollT;
            this.ctx.beginPath();
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.globalCompositeOperation = "destination-out";
            this.ctx.arc(mouseX, mouseY, this.moveRadius, 0, 2 * Math.PI);
            this.ctx.fill();
        },
        endEventHandler: function (e) {
            e.preventDefault();

            this.canvas.removeEventListener(this.events[1], this.moveHandler, false);
            document.removeEventListener(this.events[2], this.endMoveHandler, false);
            this.endMoveHandler = null;
            this.caleArea();

        },
        caleArea: function () {
            let pixels = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height),
                transPixels = [];

            pixels.data.map((item, i) => {
                const pixel = pixels.data[i + 3];
                if (pixel === 0) {
                    transPixels.push(pixel);
                }
            })
            if (transPixels.length / pixels.data.length > this.ratio) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.canvas.removeEventListener(this.events[0], this.startMoveHandler);
                this.canvas.removeEventListener(this.events[1], this.moveHandler, false);
                document.removeEventListener(this.events[2], this.endMoveHandler, false);
                this.clearCallback();
            }
        },
        choosePrize(item) {
            this.awardsList.forEach(i => {
                i.active = false
            });
            item.active = true
        },
    }
}
</script>
<style lang="less" scoped>
.bg {
  //   background: url("./img/bg.png");
  background-size: 100%;
  background-repeat: no-repeat;
  height: 100vh;
  .bgImg {
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -1;
  }
  .btn {
    padding-top: 4rem;
  }

  .scavengerStamp {
    position: absolute;
    width: 6rem;
    margin: 0.25rem calc((100% - 6rem) / 2);
    height: 3.2rem;
    display: inline-block;
    padding: 10px;
    position: relative;
    background: radial-gradient(
      transparent 0px,
      transparent 0.1rem,
      white 0.1rem,
      white
    );
    background-size: 0.4rem 0.4rem;
    background-position: -0.2rem -0.2rem;
    &:after {
      content: "";
      position: absolute;
      left: 5px;
      top: 5px;
      right: 5px;
      bottom: 5px;
      box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.5);
      z-index: -1;
    }
    .scratchCard {
      position: relative;
      width: 100%;
      height: calc(3.2rem - 20px);
      margin: 0 auto;
      .result {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
      .pic {
        width: 100%;
        height: 100%;
      }
      canvas {
        position: relative;
        z-index: 2;
      }
    }
  }
  @padding: 0.3rem;
  //
  .reward {
    padding: @padding;
    border-radius: 10px;
    background: rgba(239, 85, 72, 0.5);
    width: calc(100% - 2 * @padding);
    margin: 0 auto;
    .title {
      width: 1.4rem;
      color: #ffffff;
      background: #feb51c;
      text-align: center;
      border-radius: 5px;
      margin: 0.05rem;
    }
  }
  .rewardList {
    padding: @padding;
    border-radius: 10px;
    background: rgba(255, 142, 140, 0.5);
    width: calc(100% - 2 * @padding);
    margin: 0.25rem auto 0;
    .list {
      color: #ffffff;
      margin-top: 0.1rem;
      width: 1.35rem;
      height: 1.75rem;
      text-align: center;
      background: rgba(255, 255, 255, 0.6);
      padding: 0.05rem;
      border-radius: 5px;
      font-weight: bold;
      line-height: 2;
      &.active {
        background: #ef5548;
        &::before {
          content: "\2714";
          width: 21px;
          height: 21px;
          background: #ef5548;
          position: absolute;
          font-size: 0.05rem;
          border-bottom-right-radius: 5px;
        }
      }
      img {
        padding: 0.1rem;
        border-radius: 5px;
        background: #ffffff;
      }
    }
  }
}
</style>