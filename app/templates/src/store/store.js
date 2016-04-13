'use strict'

import modules from './mutations'
import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/logger'

Vue.use(Vuex)

let middlewares = []

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger({
    transformer (state) {
      // 输出前对 state 进行转换
      // 比如说只返回一个 sub-tree
      return state.subTree
    }
  }))
}

const store = new Vuex.Store({
  strict: true,
  modules,
  middlewares
})

export default store
