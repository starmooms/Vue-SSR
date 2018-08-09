import Vue from 'vue'
import VueMeatInfo from 'vue-meta-info'
import VueRouter from 'vue-router'
import index from './view/index.vue'
import about from './view/about.vue'
import test from './view/test.vue'
import product from './view/product.vue'
import message from './view/message.vue'

Vue.use(VueMeatInfo, {
    attribute: 'data-vue-meta',
})
// Vue.use(Meta, {
//     keyName: 'metaInfo', // the component option name that vue-meta looks for meta info on.
//     attribute: 'data-vue-meta', // the attribute name vue-meta adds to the tags it observes
//     ssrAttribute: 'data-vue-meta-server-rendered', // the attribute name that lets vue-meta know that meta info has already been server-rendered
//     tagIDKeyName: 'vmid' // the property name that vue-meta uses to determine whether to overwrite or append a tag
// })


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