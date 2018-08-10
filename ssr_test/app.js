import Vue from 'vue'
import { createRouter } from './router'
// import { createStore } from './store'
import { sync } from 'vuex-router-sync'   //将router的状态放入store中

export function createApp() {
    const router = createRouter()
    const store = createStore()

    // 同步路由状态(route state)到 store  //vuex-router-sync
    // sync(store, router)

    const app = new Vue({
        router,
        store,
        render(h) {
            return h('p', 'testetestestestes')
        }
    })

    return { app, router, store }
}