import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'
import '@/vantui/index'
import 'reset-css'

Vue.config.productionTip = false

// 过滤器
Vue.filter('filterMoney', function (val) {
    if (typeof (val) === 'undefined') {
        return val
    } else {
        return '￥' + val.toFixed(2) + '元'
    }

})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
