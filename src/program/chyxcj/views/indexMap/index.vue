<!-- index -->
<template>
    <div id="index">
        <o-map
            :markerIcon="markerIcon"
            :marker="mapMarker"
            :locationImg="locationImg"
            :center="center"
            ref="oMap"
        >
            <div class="messageBox flexBetween flexCenter">
                <div class="left wd-85">
                    <div class="title flexBetween">
                        <div class="fontb font18">车海洋洗车网点</div>
                        <div class="radius5 cmain mainBorder pd-lr-10 box">服务中</div>
                    </div>
                    <div class="line mg-tb-15"></div>
                    <div class="flexBetween">
                        <div class="address wd-80">
                            <i class="iconfont chy-location"></i>
                            广东省东莞市南城区天安数码城D2栋4楼迪尔西科技有限公司
                        </div>
                        <div class="distance wd-20 box">
                            <span class="beee c999 radius5">500m</span>
                        </div>
                    </div>
                </div>
                <div class="icon box wd-15">
                    <i class="iconfont chy-nav"></i>
                </div>
            </div>
            <div class="btns">
                <div class="box">
                    <i class="iconfont chy-located c000"></i>
                </div>
                <div class="box">
                    <router-link to="/mapList">
                        <i class="iconfont chy-menu cmain"></i>
                    </router-link>
                </div>
            </div>
        </o-map>
    </div>
</template>
<script>
export default {
    name: 'index',
    data() {
        return {
            markerIcon: require("@/program/xhamy/img/marker.png"),
            mapMarker: [
                {
                    // 标注点ID
                    id: 1,
                    // 标注点名称
                    name: "北京后海酒店",
                    // 标注点经纬度
                    latitude: "39.92300000",
                    longitude: "116.5200000000",
                    // 标注点点击事件
                    f: () => {
                        console.log(1);
                    }
                },
            ],
            locationImg: require("@/program/xhamy/img/location.png"),
            center: {
                lat: 39.916527,
                lng: 116.397128
            }
        };
    },
    components: {},
    computed: {},
    created() {
        const _this = this
    },
    methods: {
    }
};
</script>
<style scoped lang='less'>
@margin: 0.3rem;
@baseColor: #40c95f;
#index {
  height: 100vh;
}
.messageBox {
  top: 0;
  position: absolute;
  z-index: 9;
  width: calc(100% - 2 * @margin);
  margin: @margin;
  padding: @margin;
  background: #ffffff;
  .icon {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    box-shadow: 0px 0px 5px 0px #40c95f;
    .iconfont {
      color: #40c95f;
      font-weight: bold;
      font-size: 0.35rem;
    }
  }
  .distance {
    span {
      padding: 2px 5px;
    }
  }
}
.btns {
  position: absolute;
  width: 100%;
  z-index: 9;
  bottom: 1rem;
  left: 0.2rem;
  div {
    width: 0.8rem;
    height: 0.8rem;
    background: #ffffff;
    border-radius: 50%;
    margin: 0.1rem 0;
    i {
      font-size: 0.5rem;
    }
  }
}
</style>