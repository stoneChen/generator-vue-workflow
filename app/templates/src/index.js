<% if (props.isMobile) { %>import './utils/responsive' // 动态设置根字体
import FastClick from 'fastclick'
FastClick.attach(document.body)// 引入fastclick，解决300ms延迟问题
<% } %>
import './config'
import App from 'views/app.vue'

import router from './router'

router.start(App, '#app')

