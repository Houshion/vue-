<!-- information -->
<template>
    <div id="information">
        <div class="item mg-b-10">
            <van-cell class="radius5" @click="nameShow=true">
                <div slot="title">昵称</div>
                <div>{{userInformation.name}}</div>
            </van-cell>
            <van-dialog
                v-model="nameShow"
                title="昵称"
                show-cancel-button
                @confirm="changeInfomation(1)"
            >
                <van-field v-model="userInformation.name" placeholder="请输入昵称"/>
            </van-dialog>
        </div>
        <div class="item mg-b-10">
            <van-cell class="radius5">
                <div slot="title">性别</div>
                <van-radio-group
                    v-model="userInformation.gender"
                    class="flexAround"
                    @change="changeGender"
                >
                    <van-radio :name="1">男</van-radio>
                    <van-radio :name="2">女</van-radio>
                </van-radio-group>
            </van-cell>
        </div>
        <div class="item mg-b-10">
            <van-cell class="radius5" is-link to="/changeMobile">
                <div slot="title">电话</div>
                <div>{{userInformation.mobile}}</div>
            </van-cell>
        </div>
    </div>
</template>
<script>
import store from '@/store'
import { mapGetters } from "vuex";
import { user } from "~snf/api";
export default {
    name: 'information',
    data() {
        return {
            userInformation: {
                name: "Ocean",
                gender: 1, //1男，2女
                mobile: 18820129123
            },
            nameShow: false
        };
    },
    components: {},
    computed: {
        ...mapGetters([
            'userInfo',
        ])
    },
    created() {
        const _this = this
        this.userInformation = {
            name: this.userInfo.nickname,
            gender: this.userInfo.sex, //1男，2女
            mobile: this.userInfo.mobile
        };
        this.init();
    },
    methods: {
        init() {
            user({ api_name: "center" }).then(center => {
                store.dispatch("setUserInfo", center.data)
            })
        },
        changeInfomation(type, gender) {
            let form = {
                api_name: 'personalEdit',
            }
            if (type == 1) {
                form.nickname = this.userInformation.name
                delete form.gender
            } else {
                form.sex = gender
                delete form.nickname
            }
            user(form).then(res => {
                this.$toast("修改成功")
                this.init()
            })
        },
        changeGender(e) {
            this.changeInfomation(2, e)
        }
    }
};
</script>
<style scoped lang='less'>
#information {
  padding: 0.2rem;
  .item {
    // bor
  }
}
</style>