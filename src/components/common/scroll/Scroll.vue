<template>
    <!-- ref一般绑定到组件上面 -->
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
        name: 'Scroll',
        props: {
            // 是否实时监听
            probeType: {
                type: Number,
                default: 0
            },
            // 点击事件是否生效
            click: {
                type: Boolean,
                default: false
            },
            // 上拉加载更多
            pullUpLoad: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                scroll: null
            }
        },
        mounted() {
            // 通过这种方式不好，如果存在相同的class名的话，就会出现问题
            /* this.scroll = new BScroll(document.querySelector('.wrapper'), {

            }); */
            // 1.创建BScroll对象
            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: this.click, // 默认为false
                pullUpLoad: this.pullUpLoad
            });

            // 2.监听滚动的位置
            this.scroll.on('scroll', (postion) => {
                this.$emit('scroll', postion);
            });

            // 3.监听上拉事件
            this.scroll.on('pullingUp', () => {
                // this.$emit('pullingUp');
            });
            this.scrollTo(0, 0);
        },
        methods: {
            scrollTo(x, y, time=300) {
                // 判断scroll是否创建成功
                this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);
            },
            finishPullUp() {
                // 判断scroll是否创建成功
                this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp();
            },
            refresh() {
                // 判断scroll是否创建成功
                this.scroll && this.scroll.refresh && this.scroll.refresh();
            }
        }
    }
</script>
<style scoped>

</style>