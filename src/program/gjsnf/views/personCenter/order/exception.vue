<!-- exception -->
<template>
    <div id="exception">
        <div class="reason pd-10">
            <div class="label">请选择故障原因</div>
            <van-radio-group v-model="radio" class="flexStart" @change="changeFault">
                <van-radio
                    :name="item.id"
                    class="mg-t-10"
                    v-for="(item,index) in exceptionList"
                    :key="index"
                >{{item.name}}</van-radio>
            </van-radio-group>
        </div>
        <div class="deviceMsg border boxShadow">
            <van-cell-group>
                <van-cell title="设备编号" :value="information.macno"/>
                <van-cell title="所属商家" :value="information.shop_name"/>
            </van-cell-group>
        </div>
        <div class="data border boxShadow mg-t-15">
            <van-field
                v-model="dataForm.content"
                type="textarea"
                placeholder="请输入您的故障问题，我们会尽快处理"
                rows="4"
                autosize
            />
            <div class="imgs flexStart pd-10">
                <div class="img" v-for="(item,index) in img" :key="index">
                    <img :src="item" alt="">
                </div>
                <label for="file" class="img" v-if="img.length<4">
                    <img src="../../../img/ic_b.png" alt="">
                    <input type="file" name="file" id="file" accept="image/*" capture="camera" @change="upload">
                </label>
            </div>
        </div>
        <o-button @btnClick="submit" class="wd-85 mg-t-15">提 交</o-button>
    </div>
</template>
<script>
import { user, uploadImg } from "~snf/api";
export default {
    name: 'exception',
    data() {
        return {
            radio: 1,
            exceptionList: [],
            information: {},//订单信息 
            img: [],
            dataForm: {
                api_name: 'feedback',
                content: "",
                img: [],
                type: 1,
                fault_id: "",
                order_no: this.$route.query.order_no,
            },
            formData: new FormData(),
        };
    },
    components: {},
    computed: {},
    created() {
        const _this = this
        this.init();
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
                    this.dataForm.img.push(res.data.id)
                } else {
                    this.$toast("温馨提示，只能上传4张图片")
                }
            })
        },
        submit() {
            console.log(this.dataForm)
            this.dataForm.img = this.dataForm.img.join(",")
            user(this.dataForm).then(res => {
                this.$toast("提交成功")
                setTimeout(() => {
                    this.$router.go(-1)
                }, 1500);
            })
        },
        init() {
            user({
                api_name: "getFaultType",
                order_no: this.$route.query.order_no,
            }).then(res => {
                this.exceptionList = res.data.fault_type
                this.information = res.data.information
                this.radio = this.exceptionList[0].id
                this.dataForm.fault_id = this.radio
            })
        },
        changeFault(e) {
            this.dataForm.fault_id = e
        }
    }
};
</script>
<style scoped lang='less'>
#exception {
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