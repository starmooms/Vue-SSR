import { createApp } from './app'
import 'es6-promise/auto'
import Vue from 'vue'

const { app, router, store } = createApp();

//客户端，在挂载到应用程序之前，store 就应该获取到状态   服务端的context.state将作为客户端window.__INITIAL_STATE__
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}


// 客户端预取订单或采用全局混合
Vue.mixin({
    // beforeMount() {
    //     const { asyncData } = this.$options
    //     if (asyncData) {
    //         console.log('客户端数据预取-------')
    //         this.dataPromise = asyncData({
    //             store: this.$store,
    //             route: this.$route
    //         })
    //     }
    // },
    // // 注意 keep-alive ！！！
    // activated() {
    //     const { asyncData } = this.$options
    //     if (asyncData) {
    //         console.log('客户端数据预取-------')
    //         this.dataPromise = asyncData({
    //             store: this.$store,
    //             route: this.$route
    //         })
    //     }
    // },
    beforeRouteUpdate(to, from, next) {
        const { asyncData } = this.$options
        if (asyncData) {
            console.log('beforeRouteUpdate 更新路由params 或 query时重新请求')
            asyncData({
                store: this.$store,
                route: to
            }).then(next).catch(next)
        } else {
            next()
        }
    }
})




router.onReady(() => {

    // 添加路由钩子函数，用于处理 asyncData.
    // 在初始路由 resolve 后执行，
    // 以便我们不会二次预取(double-fetch)已有的数据。
    // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)
        // 我们只关心非预渲染的组件
        // 所以我们对比它们，找出两个匹配列表的差异组件
        let diffed = false
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = (prevMatched[i] !== c))
        })

        if (!activated.length) {
            return next()
        }

        // 这里如果有加载指示器(loading indicator)，就触发

        Promise.all(activated.map(c => {
            if (c.asyncData) {
                return c.asyncData({ store, route: to })
            }
        })).then(() => {
            console.log('客户端数据预取-------')
            // 停止加载指示器(loading indicator)

            next()
        }).catch(next)
    })



    app.$mount('#app')
})