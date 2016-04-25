import modules from './modules'
import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/logger'

const debug = process.env.NODE_ENV !== 'production'
Vue.use(Vuex)

let middlewares = []

if (debug) {
  middlewares.push(createLogger({
    transformer (state) {
      // 输出前对 state 进行转换
      // 比如说只返回一个 sub-tree
      return state.subTree
    },
  }))
}

const store = new Vuex.Store({
  strict: debug,
  modules,
  middlewares,
})

export default store
