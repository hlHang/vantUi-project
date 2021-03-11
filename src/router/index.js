import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}


const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        // 元数据
        meta:{
            ifShowTabbar: true
        },
        component: Home,
        children: [
            {
                path: 'search',
                name: 'SearchInterface',
                component: () => import(/* webpackChunkName: "SearchInterface" */ '@/views/SearchInterface')
            },
        ]
    },
    {
        path: '/topic',
        name: 'Topic',
        meta:{
            ifShowTabbar: true
        },
        component: () => import(/* webpackChunkName: "Topic" */ '@/views/Topic')
    },
    {
        path: '/category',
        name: 'Category',
        meta:{
            ifShowTabbar: true
        },
        component: () => import(/* webpackChunkName: "Category" */ '@/views/Category')
    },
    {
        path: '/cart',
        name: 'Cart',
        meta:{
            ifShowTabbar: true
        },
        component: () => import(/* webpackChunkName: "Cart" */ '@/views/Cart')
    },
    {
        path: '/user',
        name: 'User',
        meta:{
            ifShowTabbar: true
        },
        component: () => import(/* webpackChunkName: "User" */ '@/views/User')
    },
    {
        path: '/productdetail',
        name: 'ProductDetail',
        component: () => import(/* webpackChunkName: "ProductDetail" */ '@/views/ProductDetail')
    },


]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// 路由拦截
// to是即将进入的路由
// from代表即将离开的路由
// next(),每一个导航至少搭配一个next
router.beforeEach((to, from, next) => {
    // 获取token
    let token = localStorage.getItem('token')
    // 想进入购物车界面必须有token
    if (to.path === '/cart') {
        if (token) {
            next()  // 这个next只针对cart
        } else {
            Vue.prototype.$toast.fail('请先登录')
            // 定时器
            setTimeout(() => {
                next("/user")
            }, 1000)
        }
        return
    }
    // 此next适配所有路由
    next()
})

export default router

