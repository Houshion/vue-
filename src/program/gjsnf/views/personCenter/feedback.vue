<!-- feedback -->
<template>
    <div id="feedback">
        <div class="data border boxShadow">
            <van-field
                v-model="form.content"
                type="textarea"
                placeholder="请输入您反馈的问题，并留下您的联系方式，我们会尽快联系您！"
                rows="4"
                autosize
            />
            <div class="imgs flexStart pd-10">
                <div class="img" v-for="(item,index) in img" :key="index">
                    <img :src="item" alt="">
                </div>
                <label for="file" class="img" v-if="img.length<4">
                    <img src="../../img/ic_b.png" alt="">
                    <input type="file" accept="image/*" capture="camera" name="file" id="file" @change="upload">
                </label>
            </div>
        </div>
        <o-button @btnClick="submit" class="wd-85 mg-t-15">提 交</o-button>
    </div>
</template>
<script>
import axios from "axios";
import { user, uploadImg } from "~snf/api";
export default {
    name: 'feedback',
    data() {
        return {
            img: [],
            form: {
                api_name: 'feedback',
                content: '',
                img: [],
                type: '2',
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
            this.formData.append("api_name", "uploadPic")
            this.formData.append("img", file)
            // return console.log(file)
            uploadImg(this.formData).then(res => {
                if (this.img.length < 4) {
                    this.img.push(res.data.path)
                    this.form.img.push(res.data.id)
                } else {
                    this.$toast("温馨提示，只能上传4张图片")
                }
            })
        },
        submit() {
            console.log(this.form)
            this.form.img = this.form.img.join(",")
            user(this.form).then(res=>{
                this.$toast("提交成功")
                setTimeout(() => {
                    this.$router.go(-1)
                }, 1500);
            })
        }
    }
};
</script>
<style scoped lang='less'>
#feedback {
  padding: 0.2rem;
  min-height: 100vh;
  background: #ffffff;
  .van-radio {
    margin: 0.2rem;
  }
  .imgs {
    .img {
      width: 30%;
      margin-right: 5%;
      height: auto;
      margin-bottom: 5%;
      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
}
#file {
  display: none;
}
</style>