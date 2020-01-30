<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <tab-control 
                class="tab-control-top" 
                :titles="titles" 
                @tabClick="tabClick" 
                ref="tabControl1" 
                v-show="isTabFixed"/>
        <scroll class="content"
             ref="scroll"
             :probe-type="3"
             :click="true" 
             :pull-up-load="true" 
             @pullingUp="loadMore" 
             @scroll="contentScroll"
             >
            <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
            <home-recommend-view :recommends="recommends" />
            <feature-view />
            <tab-control 
                class="tab-control" 
                :titles="titles" 
                @tabClick="tabClick" 
                ref="tabControl2" />
            <goods-list :goods="showGoods" />
        </scroll>
        <!-- 直接监听组件的点击
            .native修饰符：当我们需要监听一个组件原生事件时，必须给对应的事件加上.native修饰符，才能进行监听。
         -->
        <back-top @click.native="backClick" v-show="isShowBackTop" />
    </div>
</template>

<script>
    import HomeSwiper from  './childComps/HomeSwiper'
    import HomeRecommendView from './childComps/HomeRecommendView'
    import FeatureView from './childComps/FeatureView'

    import NavBar from 'components/common/navbar/NavBar'
    import TabControl from 'components/content/tabControl/TabControl'
    import GoodsList from 'components/content/goods/GoodsList'
    import Scroll from 'components/common/scroll/Scroll'
    import BackTop from 'components/content/backTop/BackTop'

    import { getHomeMutidata, getHomeGoods } from 'network/home'
    import { debounce } from 'common/utils'

    export default {
        name: 'Home',
        components: {
            HomeSwiper,
            HomeRecommendView,
            FeatureView,

            NavBar,
            TabControl,
            GoodsList,
            Scroll,
            BackTop
        },
        data() {
            return {
                result: null,
                banners: [],
                recommends: [],
                dKeywords: [],
                keywords: [],
                titles: ['流行', '新款', '精选'],
                // 保存商品的数据结构
                goods: {
                    'pop': {
                        page: 0,
                        list: []
                    },
                    'new': {
                        page: 0,
                        list: []
                    },
                    'sell': {
                        page: 0,
                        list: []
                    }
                },
                currentType: 'pop', // 默认展示类型
                isShowBackTop: false, // 是否展示
                tabOffsetTop: 0,
                isTabFixed: false,
                saveY: 0
            }
        },
        computed: {
            showGoods() {
                return this.goods[this.currentType].list;
            }
        },
        created() {
            // 创建完成后发送网络请求
            // 1、请求多个数据
            this.getHomeMutidataFn();

            // 2、请求商品的数据
            this.getHomeGoodsFn('pop');
            this.getHomeGoodsFn('new');
            this.getHomeGoodsFn('sell');

            /* // 3、监听item中图片加载完成
            this.$bus.$on('itemImageLoad', () => {
                console.log('aaaa');
                // 这样的话，执行频率会很高
                this.$refs.scroll.refresh();
                // 注意在created中可能拿不到$refs的
            }); */
        },
        mounted() {
            // 1、图片加载完成的事件监听
            const refresh = debounce(this.$refs.scroll.refresh, 500)

            // 3、监听item中图片加载完成
            this.$bus.$on('itemImageLoad', () => {
                /* // 这样的话，执行频率会很高
                this.$refs.scroll.refresh();
                // 注意在created中可能拿不到$refs的
                // 对于refresh非常频繁的问题，进行防抖操作 防抖debounce/节流throttle
                // 需要封装一个函数 */
                refresh();
            });
        },
        methods: {
            /**
                事件监听相关的方法
             */
            tabClick(index) {
                switch (index) {
                    case 0:
                        this.currentType = 'pop';
                        break;
                    case 1:
                        this.currentType = 'new';
                        break;
                    case 2:
                        this.currentType = 'sell';
                        break;
                }

                this.$refs.tabControl1.currentIndex = index;
                this.$refs.tabControl2.currentIndex = index;
            },
            backClick() {
                // 获取组件对象，回到顶部
                // this.$refs.scroll.scroll.scrollTo(0, 0, 500);
                this.$refs.scroll.scrollTo(0, 0);
            },
            contentScroll(position) {
                // 1、判断BackTop是否显示
                if (position.y < -1000) {
                    this.isShowBackTop = true;
                } else {
                    this.isShowBackTop = false;
                }

                // 决定tabControl是否吸顶（position: fixed）
                this.isTabFixed = (-position.y) > this.tabOffsetTop ? true : false;

            },
            loadMore() {
                this.getHomeGoodsFn(this.currentType);
            },
            swiperImageLoad() {
                // 2、获取tabControl的offsetTop
                // 所有的组件都有一个属性$el，用于获取组件中的元素
                this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
            },
            /**
                网络请求相关的方法
             */
            // 1、请求多个数据
            getHomeMutidataFn() {
                getHomeMutidata().then(res => {
                    this.result = res;
                    this.banners = res.data.banner.list;
                    this.recommends = res.data.recommend.list;
                    this.dKeywords = res.data.dKeyword;
                    this.keywords = res.data.keywords;
                }).catch(err => {
                    console.log(err);
                });
            },
            // 2、请求商品的数据
            getHomeGoodsFn(type) {
                const page = this.goods[type].page + 1;
                getHomeGoods(type, page).then(res => {
                    this.goods[type].list.push(...res.data.list);
                    this.goods[type].page += 1;

                    // 完成上拉下载更多
                    this.$refs.scroll.finishPullUp();
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        destroyed() {

        },
        activated() {
            console.log('aaaaa')
            this.$refs.scroll.scrollTo(0, this.saveY);
            this.$refs.scroll.refresh();
        },
        deactivated() {
            //this.saveY = this.$refs.scroll.scroll.y;
            this.saveY = this.$refs.scroll.getScrollY();
        }
    }
</script>
<style scoped>
    #home {
        /* padding-top: 44px; */
        height: 100vh; /* vh -> 视口的高度 */
        position: relative;
    }

    .home-nav {
        background-color: var(--color-tint);
        color: #fff;

        /* 在使用浏览器远胜过滚动时，为了让导航不跟随一起滚动 */
        /* position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9; */
    }

    /* 停留滚动 */
    .tab-control {
        /* position: sticky;
        top: 44px;

        z-index: 9; */
    }

    .content {
        /* height: 300px; */
        overflow: hidden;
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }

    /* .content {
        height: calc(100% - 49px);
        overflow: hidden;
    } */

    /* 停留效果不管用 */
    /* .fixed {
        position: fixed;
        left: 0;
        right: 0;
        top: 44px;
    } */

    .tab-control-top {
        position: relative;
        z-index: 9;
    }
</style>

/* let totalNums = [];

const nums1 = [20, 11, 22];
const nums2 = [21, 12, 23]; */

// 直接赋值
/* totalNums = nums; */

// 遍历
/* for (let n of nums1) {
    totalNums.push(n);
}

totalNums.push(...nums1); */