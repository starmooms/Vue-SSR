import Vue from 'vue';
import App from './app.vue';
import router from './router'

new Vue({
    el: "#app",
    components: { App },
    render(h) {
        return h('App')
    },
    router
})

document.dispatchEvent(new Event('render-event'))

// https://www.colabug.com/3873638.html
// https://www.jianshu.com/p/a89d8d6c007b
// https://segmentfault.com/a/1190000012605930