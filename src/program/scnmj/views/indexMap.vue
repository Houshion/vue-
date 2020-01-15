<!-- index -->
<template>
    <div id="index">
        <o-map :mapMarker="mapMarker" :markerIcon="markerIcon" :center="center" ref="oMap">
            <div class="messageBox flexBetween flexCenter radius5" v-show="showBox">
                <div class="left wd-80">
                    <div class="fontb">{{boxMessage.title}}</div>
                    <div class="flexBetween">
                        <div class="address c999">
                            <i class="icon snf-location"></i>
                            {{boxMessage.province_name+boxMessage.city_name+boxMessage.area_name+boxMessage.address}}
                        </div>
                    </div>
                </div>
                <div class="navBtn flexCenter wd-20">
                    <div class="wd-100 tar" @click="goNav(boxMessage)">
                        <img src="../img/nav.png" alt="">
                    </div>
                </div>
            </div>
        </o-map>
    </div>
</template>
<script>
import { shopData } from "@/tools/cache";
import { user } from "~nmj/api";
export default {
    name: 'index',
    data() {
        return {
            markerIcon: require("~nmj/img/marker.png"),
            mapMarker: [
                // {
                //     // 标注点ID
                //     id: 1,
                //     // 标注点名称
                //     name: "测试",
                //     // 标注点经纬度
                //     lat: "23.019154",
                //     lng: "113.748012",
                //     // 标注点点击事件
                //     f: () => {
                //         console.log(1);
                //     }
                // },
            ],
            center: {
                lat: 23.02067,
                lng: 113.75179
            },
            showBox: false,
            boxMessage: {},
        };
    },
    components: {},
    computed: {},
    created() {
        const _this = this
        _this.wechat.getWx(() => {
            _this.wechat.getTmapLocation(res => {
                _this.center = res
                this.getNearby()
            })
        })
    },
    methods: {
        booking(item) {
            shopData(item)
            this.$router.push({ name: "booking" })
        },
        getNearby() {
            user({
                api_name: "network",
            }).then(res => {
                console.log(res)
                let arr = new Array()
                res.data.forEach(item => {
                    arr.push({
                        id: item.id,
                        // 标注点名称
                        name: item.name,
                        // 标注点经纬度
                        lat: item.lat,
                        lng: item.lng,
                        // 标注点点击事件
                        f: () => {
                            this.getMessage(item)
                        }
                    })
                });
                this.mapMarker = arr
            })
        },
        getMessage(item) {
            console.log(item)
            this.showBox = true;
            this.boxMessage = item
        },
        scanCode() {
            const _this = this
            _this.wechat.getWx(() => {
                _this.wechat.scan("0", res => {
                    // const macno = res.resultStr.split("=")[1];
                    // _this.$router.push({
                    //     name: 'confirmStatus',
                    //     query: {
                    //         macno
                    //     }
                    // })
                })
            })
        },
        goNav(item) {
            const _this = this
            _this.wechat.getWx(() => {
                _this.wechat.openTmapLocation(item)
            })
        }
    }
};
</script>
<style scoped lang='less'>
@margin: 0.3rem;
@baseColor: #f7d052;
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
  .navBtn {
    img {
      width: 0.5rem;
    }
  }
}
.btns {
  position: absolute;
  z-index: 9;
  bottom: 3rem;
  right: 0.2rem;
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
.scan {
  position: absolute;
  width: 100%;
  bottom: 0;
  z-index: 1;

  .scanBtn {
    background: @baseColor;
    width: 2rem;
    border-radius: 50%;
    height: 2rem;
    text-align: center;
    position: absolute;
    margin: 0 calc((100% - 2rem) / 2);
    color: #ffffff;
    bottom: 0.6rem;

    i {
      font-size: 0.8rem;
    }
  }
}
</style>