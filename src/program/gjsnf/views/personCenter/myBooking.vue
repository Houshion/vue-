<!-- myBooking -->
<template>
    <div id="myBooking">
        <van-tabs v-model="active" swipeable @change="changeTab">
            <van-tab :title="item.title" v-for="(item,index) in tab" :key="index">
                <div class="pd-10">
                    <template v-for="(list,i) in item.list">
                        <div :key="i" class="list radius5 mg-b-10">
                            <div class="msg flexBetween pd-b-10 border-b">
                                <div class="message">
                                    <div class="name fontb font18">商家名称：{{list.name}}</div>
                                    <div class="address cbbb mg-t-10">
                                        <i class="icon snf-location font14">{{list.address}}</i>
                                    </div>
                                </div>
                                <div class="status cmain">{{list.status | changeStatus}}</div>
                            </div>
                            <div class="time flexBetween pd-t-10">
                                <div class="label">预约时间</div>
                                <div>{{list.start_time | changeTime(list.end_time)}}</div>
                            </div>
                        </div>
                    </template>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
import { user } from "~snf/api";
export default {
    name: 'myBooking',
    data() {
        return {
            active: 0,
            tab: [
                {
                    title: "预约中", list: []
                },
                {
                    title: "预约完成", list: []
                }
            ],
            form: {
                api_name: 'mySubscribe',
                type: '1', //1 预约中，2 预约完成
                page: 1,
                pagesize: 20,
            }
        };
    },
    components: {},
    computed: {},
    created() {
        const _this = this;
        this.init(0)
    },
    filters: {
        changeStatus(val) {
            return val == 1 ? "预约中" : "预约完成"
        },
        changeTime(start, end) {
            console.log(start, end)
            // start
            if (Number(start).toString().length == 10) {
                start = Number(start + "000")
            }
            start = new Date(start);
            var year = start.getFullYear();
            var month =
                start.getMonth() + 1 < 10 ?
                    "0" + (start.getMonth() + 1) :
                    start.getMonth() + 1;
            var date = start.getDate() < 10 ? "0" + start.getDate() : start.getDate();
            var shour = start.getHours() < 10 ? "0" + start.getHours() : start.getHours();
            var sminute =
                start.getMinutes() < 10 ? "0" + start.getMinutes() : start.getMinutes();
            // end
            if (Number(end).toString().length == 10) {
                end = Number(end + "000")
            }
            end = new Date(end);
            var ehour = end.getHours() < 10 ? "0" + end.getHours() : end.getHours();
            var eminute =
                end.getMinutes() < 10 ? "0" + end.getMinutes() : end.getMinutes();

            return year + "." + month + "." + date + " " + shour + ":" + sminute + "-" + ehour + ":" + eminute;
        }
    },
    methods: {
        init(i) {
            user(this.form).then(res => {
                res.data.forEach(item => {
                    item.status = i + 1;
                });
                this.tab[i].list = res.data
            });
        },
        changeTab(index, title) {
            this.form.type = index + 1;
            this.init(index)
        }
    }
};
</script>
<style lang='less'>
#myBooking {
  .van-tab--active {
    color: #f7d052;
  }
  .list {
    padding: 0.2rem;
    background: #ffffff;
  }
}
</style>