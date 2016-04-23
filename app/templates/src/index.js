<% if (props.isMobile) {
%>import './utils/responsive'
import FastClick from 'fastclick'
FastClick.attach(document.body)
<% }
%>import './config'
import App from 'views/app.vue'
import router from './router'

router.start(App, '#app')

