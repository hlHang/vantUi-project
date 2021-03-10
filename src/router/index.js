import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        children: [
            {
                path: 'search',
                name: 'searchInterface',
                component: () => import(/* webpackChunkName: "about" */ '@/views/SearchInterface')
            }
        ]
    },
    {
        path: 'topic',
        name: 'Topic',
        component: () => import(/* webpackChunkName: "about" */ '@/views/Topic')
    },
    {
        path: 'category',
        name: 'Category',
        component: () => import(/* webpackChunkName: "about" */ '@/views/Category')
    },
    {
        path: 'cart',
        name: 'Cart',
        component: () => import(/* webpackChunkName: "about" */ '@/views/Cart')
    },
    {
        path: 'user',
        name: 'User',
        component: () => import(/* webpackChunkName: "about" */ '@/views/User')
    },


]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
