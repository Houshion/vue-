<!-- booking -->
<template>
    <div id="booking">
        <div class="content">
            <div class="top">
                <div class="title fontb font18">商家名称：{{shopMessage.name}}</div>
                <div class="address c999">
                    <i class="icon snf-location"></i>
                    {{shopMessage.address}}
                </div>
            </div>
            <van-cell title="预约时间" is-link :value="timeCell" @click="showPicker"/>
            <van-popup v-model="show" position="bottom" round>
                <van-picker
                    show-toolbar
                    title="选择时间"
                    :columns="pickData"
                    @cancel="show=false"
                    @confirm="onConfirm"
                />
            </van-popup>
            <o-button class="po_ab" @btnClick="confirmBooking">确认预约</o-button>
        </div>
    </div>
</template>
<script>
import { getshopData } from "@/tools/cache";
import { user } from "~snf/api";

let timeArray = new Array()
let start, end;
let dateTime = new Date()
let hour = dateTime.getHours();

for (let i = hour; i < 23; i++) {
    if (i < 10) {
        start = "0" + i + ":00";
        end = (i + 1) < 10 ? "0" + (i + 1) + ":00" : (i + 1) + ":00"
    } else {
        start = i + ":00";
        end = (i + 1) + ":00"
    }
    timeArray.push(start + "~" + end);
}
timeArray.push("23:00~00:00");

export default {
    name: 'booking',
    data() {
        return {
            show: false,
            pickData: timeArray,
            shopMessage: getshopData(),
            timeCell: "请选择",
            form: {
                api_name: 'subscribe',
                shop_id: getshopData().id,
                stime: '',
                etime: '',
            }
        };
    },
    components: {},
    computed: {},
    created() {
        const _this = this
    },
    methods: {
        showPicker() {
            this.show = true
        },
        onConfirm(value, index) {
            const time = value.split("~");
            this.form.stime = time[0];
            this.form.etime = time[1];
            this.show = false;
            this.timeCell = value
        },
        confirmBooking() {
            if(!this.form.stime) return this.$toast("请选择时间")
            user(this.form).then(res => {
                this.$toast("预约成功");
                setTimeout(() => {
                    this.$router.push("/myBooking")
                }, 1500);
            })
        }
    }
};
</script>
<style lang='less'>
@baseColor: #f7d052;
#booking {
  padding: 0.2rem;
  .content {
    background: #ffffff;
    border-radius: 10px;
    .top {
      padding: 0.2rem;
      border-bottom: 1px solid #efefef;
    }
  }
  .van-picker__confirm {
    color: @baseColor !important;
  }
  .po_ab {
    bottom: 0.5rem;
    width: 90%;
    left: 5%;
  }
}
</style>