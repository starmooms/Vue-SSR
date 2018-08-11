import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

axios.defaults.baseURL = "http://127.0.0.4:9000"

Vue.use(Vuex)

export function createStore() {
    return new Vuex.Store({
        state: {
            nowString: '???'
        },
        mutations: {
            setString(state, str) {
                state.nowString = str
            }
        },
        actions: {
            getString({ commit, state }, from) {
                //此处必须return返回 asyncData在服务端才会等待promise返回
                //请求路径必须全名？？？？  不能用 /api/getString  (这里改变axios全局设置)
                //https://blog.csdn.net/qq_27068845/article/details/79382850


                // console.log(state.route.path)  //在客户端这个请求是路由改变前请求的，state.route.path是改变前的path
                //改用传参进入的route
                return axios.get(`/api/getString?pathString=${from.path}`).then((res) => {
                    commit('setString', res.data.str)
                }).catch((err) => {
                    commit('setString', '没有api返回')
                })
            }
        },
    })
}