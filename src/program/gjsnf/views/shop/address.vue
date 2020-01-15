<!-- shopAddress -->
<template>
    <div id="shopAddress">
        <div class="list">
            <template v-for="item in list">
                <div class="addressItem border-t border-b mg-b-10" :key="item.id">
                    <van-cell @click="getAdd(item)">
                        <div slot="title">
                            <span class="mg-r-10">{{item.name}}</span>
                            <span class="mg-lr-10">{{item.mobile}}</span>
                        </div>
                        <div slot="label">{{item.address}}</div>
                    </van-cell>
                    <div class="pd-10 bfff flexBetween">
                        <img :src="item.selectImg" class="selectImg" @click="changeDefault(item)">
                        <div class="btns">
                            <i class="icon snf-edit mg-lr-10" @click="edit(item)">编辑</i>
                            <i class="icon snf-trash mg-lr-10" @click="dele(item.id)">删除</i>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <o-button @btnClick="newAddress" class="po_fi">新增地址</o-button>
    </div>
</template>
<script>
import { addressdata } from "@/tools/cache"
import { mall } from "~snf/api";
export default {
    name: 'shopAddress',
    data() {
        return {
            // defaultAddress: 1,
            list: [``],
        };
    },
    components: {},
    computed: {},
    watch: {},
    created() {
        const _this = this;
        this.init()
    },
    methods: {
        init() {
            mall({ api_name: 'addressList', }).then(res => {
                res.data.forEach(item => {
                    item.selectImg = item.is_default ? require('../../img/select.png') : require('../../img/unselect.png')
                });
                this.list = res.data
                console.log(this.list)
            })
        },
        getAdd(item) {
            if (this.$route.query.getAdd) {
                addressdata(item)
                this.$router.go(-1)
            } else {
                this.changeDefault(item.id)
            }
        },
        changeDefault(item) {
            this.confirm({
                title: "提示",
                content: "是否设置该地址为默认？",
                confirm: () => {
                    mall({
                        api_name: 'addressOperation',
                        address_id: item.id,
                        type: 1
                    }).then(res => {
                        addressdata(item)
                        this.$toast("设置成功");
                        this.init()
                    })
                }
            })
        },
        edit(item) {
            this.$router.push({
                name: "addressEdit",
                query: {
                    item
                }
            })
        },
        dele(id) {
            this.confirm({
                title: "提示",
                content: "是否删除该地址？",
                confirm: () => {
                    mall({
                        api_name: 'addressOperation',
                        address_id: id,
                        type: 2
                    }).then(res => {
                        this.$toast("删除成功");
                        this.init()
                    })
                }
            })
        },
        newAddress() {
            this.$router.push("/addressEdit")
        }
    }
};
</script>
<style scoped lang='less'>
#shopAddress {
  .list {
    padding-bottom: 1rem;
  }
  .po_fi {
    width: 100%;
    padding: .2rem 10%;
    bottom: 0;
    background: #f5f5f5;
  }
  .popup {
    width: 100%;
    height: 100vh;
    top: 0;
  }
  .selectImg {
    width: 24px;
    height: 24px;
  }
}
</style>