<!-- ocon -->
<template>
    <div id="ocon">
        <i class="mg-r-5 iconfont" :class="'icon'+icon"></i>
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        icon: String
    },
};
</script>