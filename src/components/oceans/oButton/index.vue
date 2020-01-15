<template>
  <div id="oButton">
    <mu-button
      @click="btnClick"
      v-if="color && color=='cmain'"
      :to="to"
      class="btnLine mainBorder wd-100 radius30 cmain"
    >
      <slot></slot>
    </mu-button>
    <mu-button
      @click="btnClick"
      v-else-if="color"
      :style="'border:1px solid '+color+';color:'+color"
      :to="to"
      class="btnLine wd-100 radius30"
    >
      <slot></slot>
    </mu-button>
    <mu-button
      @click="btnClick"
      v-else
      :to="to"
      class="btnLine wd-100 radius30 bmain cfff"
    >
      <slot></slot>
    </mu-button>
    <!-- <mu-button
      @click="btnClick"
      v-else-if="plain"
      :style="'border:1px solid '+color+';color:'+color"
      :to="to"
      class="btnLine wd-100 radius5"
    >
      <slot></slot>
    </mu-button>
    <mu-button
      @click="btnClick"
      v-else
      :color="color"
      :style="'border-color:'+color"
      :to="to"
      class="btnLine wd-100 radius5 bmain"
    >
      <slot></slot>
    </mu-button> -->
  </div>
</template>

<script>
export default {
  name: "oButton",
  props: {
    color: String,
    to: String / Object,
    plain: {
      type: Boolean,
      default: false
    }
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
  methods: {
    btnClick() {
      this.$emit("btnClick");
    }
  }
};
</script>
<style lang='less'>
.btnLine {
  line-height: normal;
}
</style>
