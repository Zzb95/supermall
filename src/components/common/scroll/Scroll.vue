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
        data() {
            return {
                scroll: null
            }
        },
        mounted() {
            // 通过这种方式不好，如果存在相同的class名的话，就会出现问题
            /* this.scroll = new BScroll(document.querySelector('.wrapper'), {

            }); */
            this.scroll = new BScroll(this.$refs.wrapper, {

            });
        }
    }
</script>
<style scoped>

</style>