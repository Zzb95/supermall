<template>
    <div id="detail">
        <!-- 1、导航栏 -->
        <detail-nav-bar class="detail-nav" />
        <scroll class="content" ref="scroll">
            <detail-swipper :top-images="topImages" />
            <detail-base-info :goods="goods" />
            <detail-shop-info :shop="shop" />
            <detail-goods-info :detail-info="detailInfo" @itemImageLoad="imageLoad" />
            <detail-param-info :param-info="paramInfo" />
            <detail-comment-info :comment-info="commentInfo" />
            <goods-list :goods="recommends"/>
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
    import DetailCommentInfo from './childComps/DetailCommentInfo'

    import Scroll from 'components/common/scroll/Scroll'
    import GoodsList from 'components/content/goods/GoodsList'

    import { getDetail, Goods, Shop, GoodsParam, getRecommend } from 'network/detail'
    import {itemListenerMixin} from 'common/mixin'

    export default {
        name: 'Detail',
        components: {
            DetailNavBar,
            DetailSwipper,
            Scroll,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            GoodsList
        },
        mixins: [itemListenerMixin],
        data() {
            return {
                iid: null, // 获取数据的id
                topImages: [], // 上面的轮播图
                goods: {},
                shop: {},
                detailInfo: {},
                paramInfo: {},
                commentInfo: {},
                recommends: [],
            }
        },
        created() {
            // 1、保存传入的iid
            this.iid = this.$route.params.iid;

            // 2、根据iid请求详情数据
            this.getDetailFn();

            // 3、请求推荐数据
            this.getRecommendFn();
        },
        methods: {
            getDetailFn() {
                getDetail(this.iid).then(res => {
                    // 解析数据
                    if (res && res.result) {
                        const data = res.result;
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
                        // 6.取出评论的信息
                        if (data.rate.cRate !== 0) {
                            // 取出来一条
                            this.commentInfo = data.rate.list[0];
                        }
                    }
                }).catch(err => {
                    console.log(err);
                });
            },
            getRecommendFn() {
                getRecommend().then(res => {
                    this.recommends = res.data.list;
                });
            },
            // 方法1：直接传过来接收；方法2：使用混入
            /* imageLoad() {
                this.$refs.scroll.refresh();
            } */
        },
        mounted() {
        },
        destroyed() {
            // 2、取消全局事件的监听
            this.$bus.$off('itemImageLoad', this.itemImgListener);
        },
        deactivated() {
            // 没有执行这个函数
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