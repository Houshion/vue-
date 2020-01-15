<!-- feedback -->
<template>
  <div id="feedback">
    <div class="content">
      <van-field
        class="radius5"
        v-model="form.content"
        type="textarea"
        placeholder="描述您的建议或问题..."
        rows="4"
        autosize
      />
    </div>
    <div class="imgs flexStart mg-t-10">
      <div class="img" v-for="(item,index) in img" :key="index">
        <img :src="item" alt="">
      </div>
      <label for="file" class="img" v-if="img.length<9">
        <img src="../img/add.png" alt="">
        <input type="file" name="file" id="file" @change="upload">
      </label>
    </div>
    <div class="msg">
      <van-field class="border-b mg-tb-10" v-model="form.truename" placeholder="请输入您的姓名"/>
      <van-field onkeyup="this.value=this.value.replace(/[^0-9]/g,'')" maxLength="11" class="border-b mg-tb-10" v-model="form.phone" placeholder="请输入您的联系方式"/>
    </div>
    <o-button @btnClick="submit" class="mg-t-40">提 交</o-button>
  </div>
</template>
<script>
import { user, uploadImg } from "~nmj/api";
export default {
  name: 'feedback',
  data() {
    return {
      img: [],
      form: {
        api_name: 'feedback',
        content: '',
        img: [],
        truename: '',
        phone: '',
      },
      formData: new FormData(),
    };
  },
  components: {},
  computed: {},
  created() {
    const _this = this
  },
  methods: {
    upload(e) {
      const file = e.target.files[0]
      this.formData.append("api_name", "uploadImg")
      this.formData.append("img", file)
      // return console.log(file)
      uploadImg(this.formData).then(res => {
        if (this.form.img.length < 9) {
          this.img.push(res.data.list.img)
          this.form.img.push(res.data.list.img)
        } else {
          this.$toast("温馨提示，只能上传9张图片")
        }
      })
    },
    submit() {
      console.log(this.form)
      if(!this.base.isPhone(this.form.phone)) return this.$toast("手机号非法")
      this.form.img = this.form.img.join(",")
      user(this.form).then(res => {
        this.$toast("提交成功")
        setTimeout(() => {
          this.wechat.close()
        }, 1500);
      })
    },
  }
};
</script>
<style scoped lang='less'>
#feedback {
  min-height: 100vh;
  padding: 0.4rem;
  background: #ffffff;
  .content {
    border: 1px solid #e5e5e5;
    border-radius: 0.1rem;
    .radius5 {
      background: #f9f9f9;
    }
  }
  .imgs {
    .img {
      width: 24%;
      margin-right: calc(4% / 3);
      height: auto;
      margin-bottom: 0.15rem;
      &:nth-child(4n) {
        margin-right: 0;
      }
    }
  }
}
#file {
  display: none;
}
</style>