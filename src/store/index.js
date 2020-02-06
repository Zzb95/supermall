import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'

// 1、安装插件
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        cartList: [], // 用于保存商品
    },
    mutations: mutations,
    actions: actions
})

// 3、挂载到Vue实例上
export default store