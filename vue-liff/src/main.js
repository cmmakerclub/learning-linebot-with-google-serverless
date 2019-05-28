// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueClipboard from 'vue-clipboard2'

library.add(faCopy)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.prototype.$liff = window.liff
Vue.config.productionTip = false
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
