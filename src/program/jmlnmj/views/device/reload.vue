<!-- reload -->
<template>
    <div id="reload">
        <van-cell-group>
            <van-cell title="设备编号" :value="detail.macno"/>
            <van-cell title="地址" :value="detail.location"/>
            <van-cell title="设备当前库存" :value="this.$route.query.stock+'斤'"/>
            <van-cell title="设备容量" :value="this.$route.query.toplimit+'斤'"/>
        </van-cell-group>
        <van-cell-group class="mg-t-10">
            <van-field
                type="number"
                input-align="right"
                center
                v-model="reloadForm.num"
                label="补货"
                placeholder="请输入补货数量"
            >
                <div slot="button" class="c000">斤</div>
            </van-field>
        </van-cell-group>
        <div class="pd-10 c999">*最大补货数量为{{limit}}斤</div>
        <o-button @btnClick="confirm" class="confirm">确认补货</o-button>
    </div>
</template>
<script>
import { shopApi } from "~jmlnmj/api";
export default {
    name: 'reload',
    data() {
        return {
            form: {
                api_name: 'deviceDetails',
                token: this.tool.jmlnmj.getToken,
                device_id: this.$route.query.device_id,
            },
            detail: {},
            reloadForm: {
                api_name: "replenishment",
                device_id: this.$route.query.device_id,
                device_goods_id: this.$route.query.goods_id,
                num: ''
            }
        };
    },
    components: {},
    computed: {
        limit() {
            return this.$route.query.toplimit - this.$route.query.stock
        }
    },
    created() {
        const _this = this
        this.init()
    },
    methods: {
        init() {
            shopApi(this.form).then(res => {
                this.detail = res.data
                console.log(this.list)
            })
        },
        confirm() {
            if (this.limit < this.reloadForm.num) {
                this.$toast("超过最大补货数量，请重新输入")
            } else if (this.reloadForm.num == 0) {
                this.$toast("补货数量不能为0")
            } else {
                shopApi(this.reloadForm).then(res => {
                    this.$toast("补货成功");
                    setTimeout(() => {
                        this.$router.go(-1)
                    }, 1500);
                })
            }
        }
    }
};
</script>
<style scoped lang='less'>
.confirm {
  width: 80%;
  margin: 0.5rem auto;
}
</style>