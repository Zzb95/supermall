<template>
    <div class="cart">
        <!-- 导航 -->
        <nav-bar class="nav-bar">
            <div slot="center">购物车({{length}})</div>
        </nav-bar>
        <!-- 商品列表 -->
        <cart-list />

        <!-- 底部的汇总 -->

    </div>
</template>

<script>
    import CartList from './childComps/CartList'

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
            CartList,

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
            })
        }
    }
</script>
<style scoped>
    .cart {
        height: 100vh;
    }

    .nav-bar {
        background: var(--color-tint);
        color: #fff;
    }
</style>