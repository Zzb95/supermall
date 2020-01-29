import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 可以使用new出来的Vue发射事件和监听事件
Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
