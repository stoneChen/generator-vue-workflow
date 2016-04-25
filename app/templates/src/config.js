import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.config.debug = process.env.NODE_ENV !== 'production'

// 路由模块
Vue.use(VueRouter)

Vue.use(VueResource)

// vue resource config
Vue.http.interceptors.push({
  response (response) {
    if (response.status === 502) {
      console.error('您现在网络不佳,请确认您的网络')
    }
    if (response.status === 500) {
      console.error('服务器出错,请重试')
    }
    return response // 必须返回, 否则业务http的promise将拿不到结果
  },

})

