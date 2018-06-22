// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { router } from '../../router/index'
import { i18n } from '../../i18n/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../../assets/style/style.css'

Vue.config.productionTip = false

// 处理 vue-i18n 6.X 以上版本与 Element-UI 兼容性问题
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
