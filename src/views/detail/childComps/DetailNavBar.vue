<template>
    <div>
        <nav-bar class="home-nav">
            <div slot="left" class="back" @click="backClick">
                <img src="~assets/img/common/back.svg" alt="">
            </div>
            <div slot="center" class="title">
                <div v-for="(item, index) in titles" 
                    :key="index" 
                    class="title-item"
                    :class="{active: currentIndex == index}"
                    @click="tabClick(index)">
                    {{item}}
                </div>
            </div>
        </nav-bar>
    </div>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'
    import TabControl from 'components/content/tabControl/TabControl'

    export default {
        name: 'DetailNavBar',
        components: {
            NavBar,
            TabControl
        },
        data() {
            return {
                titles: ['商品', '参数', '评论', '推荐'],
                currentIndex: 0
            }
        },
        methods: {
            tabClick(index) {
                this.currentIndex = index;
                this.$emit('titleClick', index);
            },
            backClick() {
                // this.$router.go(-1);
                this.$router.back();
            }
        }
    }
</script>
<style scoped>
    .back img {
        margin-top: 10px;
    }

    .title {
        display: flex;
        font-size: 12px;
    }

    .title-item {
        flex: 1;
    }

    .active {
        color: var(--color-high-text);
    }

</style>