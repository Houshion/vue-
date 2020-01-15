<!-- deviceDetail -->
<template>
    <div id="deviceDetail">
        <van-cell-group>
            <van-cell title="设备名称" :value="detail.name"/>
            <van-cell title="设备编号" :value="detail.macno"/>
            <van-cell title="设备状态">
                <div
                    :class="detail.mac_status==1?'status1':detail.mac_status==2?'status2':'status3'"
                >{{detail.mac_status | statusStr}}</div>
            </van-cell>
            <van-cell title="设备地址" :value="detail.location"></van-cell>
            <van-cell title="添加时间" :value="detail.ctime | timeStr"></van-cell>
        </van-cell-group>
        <div class="mg-t-10 content" v-if="detail.mac_status==2">
            <div class="title fontb">故障内容</div>
            <div class="con">{{detail.fault_content}}</div>
        </div>
    </div>
</template>
<script>
import { shopApi, staffApi } from "~jmlnmj/api";
export default {
    name: 'deviceDetail',
    data() {
        return {
            detail: {
                device_id: 8,//设备id
                macno: "8dcc7e65333e4e3d",//设备号
                status: 1,
                ctime: 1575854989,//创建时间
                htime: 0,//设备id
                mac_status: 2,//1:在线 2：故障 0：离线
                fault_content: 'qwejqowiepqw'//故障内容
            },
            form: {
                api_name: 'deviceDetails',
                token: this.tool.jmlnmj.getToken,
                device_id: this.$route.query.id,
            }
        };
    },
    components: {},
    computed: {},
    filters: {
        statusStr(val) {
            switch (val) {
                case 1:
                    return "在线"
                    break;
                case 2:
                    return "故障"
                    break;
                default:
                    return "离线"
                    break;
            }
        }
    },
    created() {
        const _this = this
        this.init()
    },
    methods: {
        init() {
            if (this.tool.jmlnmj.loginType == 1) {
                shopApi(this.form).then(res => {
                    this.detail = res.data
                    console.log(this.list)
                })
            } else {
                staffApi(this.form).then(res => {
                    this.detail = res.data
                    console.log(res)
                })
            }
        }
    }
};
</script>
<style scoped lang='less'>
.status1 {
  color: #4cc15c;
}
.status2 {
  color: #f76461;
}
.status3 {
  color: #9f9f9f;
}

.content {
  padding: 0.2rem;
  background: #ffffff;
}
</style>