<template>
    <div id="detail">
        <!-- 1、导航栏 -->
        <detail-nav-bar class="detail-nav" />
        <scroll class="content">
            <detail-swipper :topImages="topImages" />
            <detail-base-info :goods="goods" />
            <detail-shop-info :shop="shop" />
        </scroll>
    </div>
</template>

<script>
    import DetailNavBar from './childComps/DetailNavBar'
    import DetailSwipper from './childComps/DetailSwipper'
    import DetailBaseInfo from './childComps/DetailBaseInfo'
    import DetailShopInfo from './childComps/DetailShopInfo'

    import Scroll from 'components/common/scroll/Scroll'

    import { getDetail, Goods, Shop } from 'network/detail'

    export default {
        name: 'Detail',
        components: {
            DetailNavBar,
            DetailSwipper,
            Scroll,
            DetailBaseInfo,
            DetailShopInfo
        },
        data() {
            return {
                iid: null, // 获取数据的id
                topImages: [], // 上面的轮播图
                goods: {},
                shop: {}
            }
        },
        created() {
            // 1、保存传入的iid
            this.iid = this.$route.params.iid;

            // 2、根据iid请求详情数据
            this.getDetailFn();
        },
        methods: {
            getDetailFn() {
                getDetail(this.iid).then(res => {
                    // 解析数据
                    if (res && res.result) {
                        const data = res.result;
                        console.log(res)
                        if (data.itemInfo) {
                            // 获取顶部的图片轮播数据
                            this.topImages = data.itemInfo.topImages;
                        }
                        // 2.获取商品信息
                        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
                        // 3.获取商铺的信息
                        this.shop = new Shop(data.shopInfo);
                    }
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    }
</script>
<style scoped>
    #detail {
        position: relative;
        z-index: 9;
        background: #fff;

        /* 设置父元素的固定高度 */
        height: 100vh;
    }

    .detail-nav {
        position: relative;
        z-index: 9;
        background: #fff;
    }

    .content {
        height: calc(100% - 44px);
    }
</style>