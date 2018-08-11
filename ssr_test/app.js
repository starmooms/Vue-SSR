import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'   //将router的状态放入store中



export function createApp(context) {
  const router = createRouter(context)
  const store = createStore(context)

  // 同步路由状态route 到 store  //vuex-router-sync
  sync(store, router)

  const app = new Vue({
    store,
    router,
    // 根实例简单的渲染应用程序组件。
    render: h => h(App)
  })

  return { app, router, store }
}