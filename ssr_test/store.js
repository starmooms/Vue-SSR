import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)



export function createStore() {
    return new Vuex.Store({
        state: {
            nowString: '???'
        },
        mutations: {
            setString(state, str) {
                console.log(state.nowString)
                state.nowString = str
            }
        },
        actions: {
            getString({ commit }) {
                //此处必须return返回 asyncData在服务端才会等待promise返回
                //请求路径必须全名？？？？  不能用 /api/getString
                return axios.get('http://127.0.0.4:9000/api/getString').then((res) => {
                    commit('setString', res.data.str)
                }).catch((err) => {
                    console.log(err)
                    commit('setString', '没有api返回')
                })
            }
        },
    })
}