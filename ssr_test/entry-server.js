import { createApp } from './app'


// // 默认返回匿名函数 context是参数
// export default context => {
//     const { app } = createApp()
//     return app
// }

export default context => {
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp()


        router.push(context.url)   //服务端传来的路由？？

        // const { url } = context
        // const { fullPath } = router.resolve(url).route
        // console.log(url)
        // console.log(fullPath)
        // if (fullPath !== url) {
        //     return reject({ url: fullPath })
        // }

        const meta = app.$meta()
        context.meta = meta


        router.onReady(() => {
            // 获取router页面的vue组件
            const matchedComponents = router.getMatchedComponents()
            if (!matchedComponents.length) {
                return reject({ code: 404 })
            }

            Promise.all(matchedComponents.map(Component => {
                //如果组件存在asyncData函数
                if (Component.asyncData) {
                    return Component.asyncData({
                        store,
                        route: router.currentRoute
                    })
                }
            })).then(() => {
                console.log('服务端数据预取-------')
                context.state = store.state
                resolve(app)

            }).catch(reject)


        }, reject)
    })
}