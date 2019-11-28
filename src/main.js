// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import store from './store/store'
import Verify from './common/verify' /* 校验文件 */
import Common from './common/common' /* 公共函数 */
// import axios from 'axios'

import axios from './http.js'
Vue.use(Antd)

Vue.config.productionTip = false
Vue.prototype.Verify = Verify


Vue.prototype.Common = Common
Vue.prototype.$axios = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  store,
  render: (handle) => handle(App)
})
