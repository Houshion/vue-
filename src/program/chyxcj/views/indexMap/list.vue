<!-- mapList -->
<template>
    <div id="mapList">
        <template v-for="(item,index) in list">
            <div class="list flexStart" :key="index">
                <div class="messageBox flexStart">
                    <div class="img">
                        <img :src="item.img" alt="">
                    </div>
                    <div class="message flexA-between">
                        <div class="address flexStart flexNoWrap wd-100">
                            <i class="iconfont chy-location font14">{{item.address}}</i>
                        </div>
                        <div class="line wd-100"></div>
                        <div class="distance flexEnd wd-100">
                            <span
                                class="beee c999 radius5 pd-lr-10 box mg-r-5"
                            >{{item.distance+"m"}}</span>
                            <div
                                class="radius5 cmain mainBorder pd-lr-10 box"
                            >{{item.type==1?"服务中":'待机中'}}</div>
                        </div>
                    </div>
                </div>
                <div class="loaction box">
                    <i class="iconfont chy-nav bmain cfff"></i>
                </div>
            </div>
        </template>
        <div class="btns">
            <div class="box">
                <router-link to="/">
                    <i class="iconfont chy-map cmain"></i>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'mapList',
    data() {
        return {
            list: [
                { address: "广东省东莞市天安数码城D2栋附近", type: 1, distance: 520, img: require('../../img/image.png') },
                { address: "广东省东莞市天安数码城D2栋附近", type: 2, distance: 520, img: require('../../img/image.png') },
            ]
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
#mapList {
  padding: 0.25rem;
  .list {
    width: 95%;
    margin-bottom: 0.25rem;
    padding: 0.25rem;
    background: #ffffff;
    border-radius: 5px;
    padding-right: 0.5rem;
    .messageBox {
      .img img {
        width: 1.5rem;
        margin-right: 0.25rem;
      }
      .message {
        width: calc(100% - 1.75rem);
      }
    }
    .loaction {
      position: absolute;
      width: 0.6rem;
      height: 0.6rem;
      right: 0.3rem;
      i {
        font-size: 0.4rem;
        border-radius: 50%;
        padding: 0.1rem;
        line-height: 1.5rem;
        box-shadow: 0px 0px 5px 0px #40c95f;
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
}
</style>