<template>
    <div id="oPickSeat" class="pd-15">
        <div class="flex state pd-t-15 pd-b-30">
            <div class="unpick mg-r-15">
                <div class="flex">
                    <div class="icon">
                        <img src="@/program/xhamy/img/seat2.png" alt="">
                    </div>
                    <div class="font16 mg-l-5">未选</div>
                </div>
            </div>
            <div class="picked mg-r-15">
                <div class="flex">
                    <div class="icon">
                        <img src="@/program/xhamy/img/seat1.png" alt="">
                    </div>
                    <div class="font16 mg-l-5">已被选</div>
                </div>
            </div>
            <div class="pick mg-r-15">
                <div class="flex">
                    <div class="icon">
                        <img src="@/program/xhamy/img/seat3.png" alt="">
                    </div>
                    <div class="font16 mg-l-5">选中</div>
                </div>
            </div>
            <div class="error mg-r-15">
                <div class="flex">
                    <div class="icon">
                        <img src="@/program/xhamy/img/seat4.png" alt="">
                    </div>
                    <div class="font16 mg-l-5">异常</div>
                </div>
            </div>
        </div>
        <div class="seat flex flexBetween">
            <div class="flexItem" :style="style" v-for="(item,index) in seatData" :key="index" :data-base="item.selected">
                <img :src="!item.selected?seat1:seat3" v-if="(item.status == 2||item.status == 3)">
                <img :src="!item.selected?seat4:seat3" v-else-if="item.status == 0">
                <img :src="!item.selected?seat2:seat3" @click="selectSeat(index)" v-else>
                <!-- <img src="@/program/xhamy/img/seat3.png"> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "oPickSeat",
    props: {
        col: {
            type: Number,
            default: 8
        },
        // seatData: Array
    },
    data() {
        return {
            style: "width:" + 100 / this.col + "%",
            seatData: null,
            seat1: require('@/program/xhamy/img/seat1.png'),
            seat2: require('@/program/xhamy/img/seat2.png'),
            seat3: require('@/program/xhamy/img/seat3.png'),
            seat4: require('@/program/xhamy/img/seat4.png'),
        };
    },

    computed: {},

    components: {},

    created() {
        const _this = this;

    },

    mounted() {
        const _this = this;
    },
    methods: {
        changeData(data) {
            data.forEach((item, index) => {
                let select = Object.assign({}, item, {
                    selected: item.status != 1 ? false : true
                });
                this.$set(data, index, select);
            });
            this.seatData = data
            console.log(JSON.stringify(this.seatData))
        },
        selectSeat(index) {
            const _this = this;
            _this.seatData.forEach(item=>{
              item.selected = false
            })
            _this.seatData[index].selected = true;
            // return console.log(JSON.stringify(_this.seatData))
            this.$emit("getCall", _this.seatData[index].device_id, _this.seatData);
        }
    }
};
</script>

<style lang='less' scoped>
.icon img {
    width: 20px;
}

.seat .flexItem {
    margin: 5px 0;
}

.seat img {
    width: 36px;
}
</style>
