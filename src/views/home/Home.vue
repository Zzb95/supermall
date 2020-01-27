<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <scroll class="content">
            <home-swiper :banners="banners" />
            <home-recommend-view :recommends="recommends" />
            <feature-view />
            <tab-control class="tab-control" :titles="titles" @tabClick="tabClick" />
            <goods-list :goods="showGoods" />
        </scroll>
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

    import { getHomeMutidata, getHomeGoods } from 'network/home'

    export default {
        name: 'Home',
        components: {
            HomeSwiper,
            HomeRecommendView,
            FeatureView,

            NavBar,
            TabControl,
            GoodsList,
            Scroll
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
                currentType: 'pop' // 默认展示类型
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
        },
        mounted() {
            
        },
        methods: {
            /**
                事件监听相关的方法
             */
            tabClick(index) {
                console.log(index);
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
                }).catch(err => {
                    console.log(err);
                })
            }
        }
    }
</script>
<style scoped>
    #home {
        padding-top: 44px;
        height: 100vh; /* vh -> 视口的高度 */
        position: relative;
    }

    .home-nav {
        background-color: var(--color-tint);
        color: #fff;

        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9;
    }

    /* 停留滚动 */
    .tab-control {
        position: sticky;
        top: 44px;

        z-index: 9;
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