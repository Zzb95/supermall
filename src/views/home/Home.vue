<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <home-swiper :banners="banners" />
        <home-recommend-view :recommends="recommends" />
        <feature-view />
        <tab-control class="tab-control" :titles="titles" />
        <goods-list :goods="goods['pop'].list" />
        <ul>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
        </ul>
    </div>
</template>

<script>
    import HomeSwiper from  './childComps/HomeSwiper'
    import HomeRecommendView from './childComps/HomeRecommendView'
    import FeatureView from './childComps/FeatureView'

    import NavBar from 'components/common/navbar/NavBar'
    import TabControl from 'components/content/tabControl/TabControl'
    import GoodsList from 'components/content/goods/GoodsList'

    import { getHomeMutidata, getHomeGoods } from 'network/home'

    export default {
        name: 'Home',
        components: {
            HomeSwiper,
            HomeRecommendView,
            FeatureView,

            NavBar,
            TabControl,
            GoodsList
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
                }
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
        methods: {
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