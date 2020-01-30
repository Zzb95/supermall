<template>
    <div id="detail">
        <!-- 1、导航栏 -->
        <detail-nav-bar class="detail-nav" />
        <scroll class="content" ref="scroll">
            <detail-swipper :top-images="topImages" />
            <detail-base-info :goods="goods" />
            <detail-shop-info :shop="shop" />
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
            <detail-param-info :param-info="paramInfo" />
        </scroll>
    </div>
</template>

<script>
    import DetailNavBar from './childComps/DetailNavBar'
    import DetailSwipper from './childComps/DetailSwipper'
    import DetailBaseInfo from './childComps/DetailBaseInfo'
    import DetailShopInfo from './childComps/DetailShopInfo'
    import DetailGoodsInfo from './childComps/DetailGoodsInfo'
    import DetailParamInfo from './childComps/DetailParamInfo'

    import Scroll from 'components/common/scroll/Scroll'

    import { getDetail, Goods, Shop, GoodsParam } from 'network/detail'

    export default {
        name: 'Detail',
        components: {
            DetailNavBar,
            DetailSwipper,
            Scroll,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo
        },
        data() {
            return {
                iid: null, // 获取数据的id
                topImages: [], // 上面的轮播图
                goods: {},
                shop: {},
                detailInfo: {},
                paramInfo: {},
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
                        // 3.获取商铺的信息的对象
                        this.shop = new Shop(data.shopInfo);
                        // 4.保存商品的详情数据
                        this.detailInfo = data.detailInfo;
                        // 5.获取参数的信息
                        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
                    }
                }).catch(err => {
                    console.log(err);
                });
            },
            imageLoad() {
                this.$refs.scroll.refresh();
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