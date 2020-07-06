import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'
import './assets/icon/iconfont.css'
import './assets/icon/icon.css'

import './styles/element-variables.scss'
import frame from './utils/frame'
import './permission'

Vue.use(Element)

Vue.prototype.informationPrompt = frame.informationPrompt
Vue.prototype.confirmInfor = frame.confirmInfor

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
