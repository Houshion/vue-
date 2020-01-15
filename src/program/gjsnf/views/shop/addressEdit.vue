<!-- addressEdit -->
<template>
    <div id="addressEdit">
        <van-address-edit
            :area-list="areaList"
            ref="editAddress"
            @save="onSave"
            show-postal
            defaultEdit
            show-set-default
            :address-info="addressInfo"
        ></van-address-edit>
    </div>
</template>
<script>
import areaList from "@/vant-ui/area";
import { mall } from "~snf/api";
export default {
    name: 'addressEdit',
    data() {
        return {
            addressInfo: {
                id: '',
                name: '',
                tel: '',
                province: '',
                city: '',
                county: '',
                addressDetail: '',
                areaCode: '',
                postalCode: '',
                isDefault: true
            },
            areaList,
            saveStatus: true,
        };
    },
    components: {},
    computed: {},
    created() {
        const _this = this
        const item = this.$route.query.item
        if (this.$route.query.item) {
            this.addressInfo = {
                id: item.id,
                name: item.name,
                tel: item.mobile,
                province: item.province,
                city: item.city,
                county: item.area,
                addressDetail: item.address,
                areaCode: item.area_code,
                postalCode: item.post_code,
                isDefault: item.is_default ? true : false
            }
        }
    },
    methods: {
        newAddress() {
            this.show = true
        },
        onSave(val) {
            if (!this.saveStatus) return false
            this.saveStatus = false
            let form = {
                api_name: "addressEdit",
                name: val.name,
                mobile: val.tel,
                post_code: val.postalCode,
                province: val.province,
                city: val.city,
                area: val.county,
                area_code: val.areaCode,
                address: val.addressDetail,
                is_default: val.isDefault ? 1 : 0
            }
            if (val.id) form.address_id = val.id

            mall(form).then(res => {
                this.saveStatus = true
                const toastText = val.id ? "修改成功" : "添加成功"
                this.$toast(toastText)
                setTimeout(() => {
                    this.$router.go(-1)
                }, 1500);
            })
        },
    }
};
</script>
<style lang='less'>
#addressEdit {
  .van-cell__value {
    display: -moz-box;
    -moz-box-pack: end;
    -moz-box-align: center;
    display: -webkit-box;
    -webkit-box-pack: end;
    -webkit-box-align: center;
    display: box;
    box-pack: end;
    box-align: center;
  }
  .van-field__body {
    width: 100%;
  }
}
</style>