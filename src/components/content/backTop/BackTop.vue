<template>
    <div class="back-top" @click="backClick">
        <img src="~assets/img/common/top.png" alt="">
    </div>
</template>

<script>
    export default {
        name: 'BackTop',
        methods: {
            backClick() {
                // 回到顶部，需要拿到better-scroll的对象

            }
        }
    }
</script>
<style scoped>
    .back-top {
        position: fixed;
        bottom: 55px;
        right: 8px;
    }

    .back-top img {
        height: 43px;
        width: 43px;
    }
</style>