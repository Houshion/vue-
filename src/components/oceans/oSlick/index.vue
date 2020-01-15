<!-- oSlick -->
<template>
    <div id="oSlick">
        <SlickList lockAxis="y" v-model="list" @input="end">
            <SlickItem
                v-for="(item, index) in list"
                :index="index"
                :key="index"
                :useDragHandle="true"
            >
                <van-cell-group>
                    <van-cell>
                        <div slot="title">
                            <slot name="title">{{item.title?item.title:item.value}}</slot>
                        </div>
                        <slot>{{item.title?item.value:''}}</slot>
                        <van-icon slot="right-icon" name="wap-nav" class="wap-nav box mg-l-10" />
                    </van-cell>
                </van-cell-group>
            </SlickItem>
        </SlickList>
    </div>
</template>
<script>
import { SlickList, SlickItem } from 'vue-slicksort';
export default {
    name: 'oSlick',
    props: {
        items: Array,
    },
    data() {
        return {};
    },
    components: {
        SlickItem,
        SlickList
    },
    computed: {
        list: {
            set() {
                return this.items
            },
            get() {
                return this.items
            }

        }
    },
    created() {
        const _this = this
    },
    methods: {
        end(list) {
            this.$emit("getList", list)
        }
    }
};
</script>
<style scoped lang='less'>
</style>