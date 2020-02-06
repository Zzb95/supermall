<template>
    <div id="detail">
        <!-- 1、导航栏 -->
        <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailNav" />
        <scroll 
            class="content" 
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
            <detail-swipper :top-images="topImages" />
            <detail-base-info :goods="goods" />
            <detail-shop-info :shop="shop" />
            <!-- <detail-goods-info :detail-info="detailInfo" @itemImageLoad="imageLoad" /> -->
            <detail-goods-info :detail-info="detailInfo" />
            <detail-param-info ref="params" :param-info="paramInfo" />
            <detail-comment-info ref="comment" :comment-info="commentInfo" />
            <goods-list ref="recommend" :goods="recommends"/>
        </scroll>
        <detail-bottom-bar />
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
    import DetailBottomBar from './childComps/DetailBottomBar'

    import Scroll from 'components/common/scroll/Scroll'
    import GoodsList from 'components/content/goods/GoodsList'

    import { getDetail, Goods, Shop, GoodsParam, getRecommend } from 'network/detail'
    import { debounce } from 'common/utils'
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
            GoodsList,
            DetailBottomBar
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
                themeTopYs: [],
                getThemeTopY: null,
                currentIndex: 0
            }
        },
        created() {
            // 1、保存传入的iid
            this.iid = this.$route.params.iid;

            // 2、根据iid请求详情数据
            this.getDetailFn();

            // 3、请求推荐数据
            this.getRecommendFn();

            // 4、给getThemeTopY赋值(对this.themeTopYs赋值的操作进行防抖)
            this.getThemeTopY = debounce(() => {
                this.themeTopYs = [];

                this.themeTopYs.push(0);
                this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
                this.themeTopYs.push(Number.MAX_VALUE);
                //console.log(this.themeTopYs);
            }, 100)
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

                        /* // 1、第一次获取，值不对
                        // 值不对的原因：this.$refs.params.$el压根没有渲染
                        this.themeTopYs = [];

                        this.themeTopYs.push(0);
                        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
                        console.log(this.themeTopYs); */

                        // 等到所有的内容渲染完，回调一次函数
                        /* this.$nextTick(() => {
                            // 2、第二次获取，值依然不对
                            // 值不对的原因：图片没有计算在内
                            // 根据最新的数据，对应的DOM是已经被渲染出来
                            // 但是图片依然是没有加载完（目前获取到的offsetTop不包含图片的）
                            // offsetTop值不对的时候，都是因为图片的问题
                            this.themeTopYs = [];

                            this.themeTopYs.push(0);
                            this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                            this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
                            console.log(this.themeTopYs);
                        }) */
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

            titleClick(index) {
                this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
            },
            detailImageLoad() {
                this.getThemeTopY();
            },
            contentScroll(position) {
                // 1、获取Y值
                const positionY = -position.y;

                // 2、positionY和主题中值进行对比
                /* if (y < this.themeTopYs[1]) {
                    
                } else if (y >= this.themeTopYs[1] && y < this.themeTopYs[2]) {
                    
                } else if (y >= this.themeTopYs[2] && y < this.themeTopYs[3]) {

                } else if (y > this.themeTopYs[3]) {

                } */
                let length = this.themeTopYs.length;
                for (let i = 0; i < length; i++) {
                    if (this.currentIndex !== i && (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
                        this.currentIndex = i;
                        this.$refs.detailNav.currentIndex = this.currentIndex;
                    }
                    /* if (this.currentIndex != i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])
                         || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
                             this.currentIndex = i;
                             this.$refs.detailNav.currentIndex = this.currentIndex;
                         } */
                }
            },
        },
        mounted() {
            
        },
        updated() {
            /* this.themeTopYs = [];

            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.params.$el.offsetTop);
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop); */
            this.getThemeTopY();
        },
        destroyed() {
            // 2、取消全局事件的监听
            //this.$bus.$off('itemImageLoad', this.itemImgListener);
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
        height: calc(100% - 44px - 49px);
    }
</style>