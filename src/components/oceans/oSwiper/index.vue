<template>
  <div id="oSwiper">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <template v-if="image.url">
          <a :href="image.url">
            <img v-lazy="image.img" style="width:100%;height:200px">
          </a>
        </template>
        <template v-else>
          <img v-lazy="image.img" style="width:100%;height:200px">
        </template>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "oSwiper",
  props: {
    images: Array,
  },
  data() {
    return {};
  },

  components: {},

  created() {
    const _this = this;
  },

  mounted() {
    const _this = this;
  },
  methods: {}
};
</script>
<style lang='less' scoped>
#oSwiper {
  height: 200px;
  max-height: 200px;
}
</style>
