'use strict'
<% if (props.isMobile) { %>
import './utils/responsive' // 动态设置根字体
require('fastclick').attach(document.body)// 引入fastclick，解决300ms延迟问题
<% } %>
import './config'
import App from 'view/app.vue'

import router from './router'

router.start(App, '#app')

