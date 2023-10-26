import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import './router/auth'

import './assets/icon-fonts/iconfont.css'
import './assets/icon-fonts/iconfont'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import weiPhoto from 'wei-photo'
import "wei-photo/style/index.css"
import qs from 'qs'
Vue.use(weiPhoto);
Vue.use(ElementUI, { size: 'small' })
import service from "./request"
Vue.config.productionTip = false
Vue.prototype.$qs = qs

Vue.directive('auth', {
  bind: function (el, binding) {
    let flag = sessionStorage.getItem('userinfo')
    let {userRole} = JSON.parse(sessionStorage.getItem('userinfo'))
    if (binding.value == userRole) {
      el.style.display = "inline-block";
    } else {
      el.style.display = "none";
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
