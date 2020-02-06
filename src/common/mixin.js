import { debounce } from 'common/utils'
import BackTop from 'components/content/backTop/BackTop'
import {BACKTOP_DISTANCE} from 'common/const'

export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null,
            refresh: null
        }
    },
    mounted() {
        this.refresh = debounce(this.$refs.scroll.refresh, 500);
        this.itemImgListener = () => {
            this.refresh();
        };

        this.$bus.$on('itemImageLoad', this.itemImgListener);
    }
}

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false, // 是否展示
        }
    },
    methods: {
        backClick() {
            // 获取组件对象，回到顶部
            // this.$refs.scroll.scroll.scrollTo(0, 0, 500);
            this.$refs.scroll.scrollTo(0, 0);
        },
        listenShowBackTop(position) {
            // 3、判断BackTop是否显示
            if (position.y < -BACKTOP_DISTANCE) {
                this.isShowBackTop = true;
            } else {
                this.isShowBackTop = false;
            }
        }
    }
}