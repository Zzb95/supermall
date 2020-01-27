<template>
    <!-- 所有的item都展示同一个图片，同一个文字 -->
    <div class="tab-bar-item" @click="itemClick">
        <!-- <img src="../../assets/img/tabbar/home.svg" alt=""> -->
        <!-- <img src="../../assets/img/tabbar/modify.png" alt="">
        <div>
            首页
        </div> -->
        <!-- 不建议这样写，需要包装一下 -->
        <!-- <slot v-if="!isActive" name="item-icon"></slot>
        <slot v-else name="item-icon-active"></slot> -->
        <div v-if="!isActive">
            <slot name="item-icon"></slot>
        </div>
        <div v-else>
            <slot name="item-icon-active"></slot>
        </div>
        <div :style="activeStyle">
            <slot name="item-text"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TabBarItem',
        props: {
            path: String,
            activeColor: {
                type: String,
                default: 'red'
            }
        },
        data() {
            return {
                // isActive: true
            }
        },
        computed: {
            isActive() {
                // 判断当前活跃的path包不包含传过来的path
                return this.$route.path.indexOf(this.path) != -1
            },
            activeStyle() {
                return this.isActive ? {color: this.activeColor} : {} 
            }
        },
        methods: {
            itemClick() {
                this.$router.replace(this.path)
            }
        }
    }
</script>
<style scoped>
    .tab-bar-item {
        flex: 1;
        text-align: center;
        height: 49px; /* 常用高度 */
        font-size: 14px;
    }

    .tab-bar-item img {
        width: 24px;
        height: 24px;
        margin-top: 5px;
        vertical-align: middle;
    }

    /* .active {
        color: red;
    } */
    .item-text {
        font-size: 12px;
        margin-top: 3px;
        color: #333;
    }
</style>