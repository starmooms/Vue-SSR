import Vue from 'vue'
import VueRouter from 'vue-router'
import index from './view/index.vue'
import about from './view/about.vue'
import test from './view/test.vue'
import product from './view/product.vue'
import message from './view/message.vue'




Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history', //去掉#
    routes: [
        {
            path: '/',
            component: index,
        },
        {
            path: '/about',
            component: about,
        },
        {
            path: '/test',
            component: test,
        },
        {
            path: '/product',
            component: product,
        },
        {
            path: '/message',
            component: message,
        },
    ]
})


export default router