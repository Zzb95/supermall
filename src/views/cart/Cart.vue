<template>
    <div class="cart">
        <nav-bar class="nav-bar">
            <div slot="center">购物车({{length}})</div>
        </nav-bar>
    </div>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'

    import {mapGetters} from 'vuex'

    export default {
        name: 'Cart',
        data() {
            return {
                cartCount: 0
            }
        },
        components: {
            NavBar
        },
        computed: {
            /* cartLength() {
                // return this.$store.state.cartList.length;
                return this.$store.getters.cartLength;
            } */
            // 两种语法
            // ...mapGetters(['cartLength', 'cartList'])
            ...mapGetters({
                length: 'cartLength',
                list: 'cartList'
            })
        }
    }
</script>
<style scoped>
    .nav-bar {
        background: var(--color-tint);
        color: #fff;
    }
</style>