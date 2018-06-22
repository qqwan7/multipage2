/**
 * Created by qqwan on 2018/5/4.
 */
import Vue from 'vue'
import Router from 'vue-router'
import ChangePwd from '@/modules/second/views/changePwd'
// 处理IE9不支持history
import 'html5-history-api'
import { i18n } from '../i18n/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import cookie from 'js-cookie'

Vue.use(Router)

if (cookie.get('lang')) {
  i18n.locale = cookie.get('lang')
} else {
  let lang = navigator.language || navigator.browserLanguage
  let langArray = ['en', 'zh-CN']
  lang = langArray.indexOf(lang) < 0 ? 'en' : lang
  i18n.locale = lang
  cookie.set('lang', lang)
}

const routerMap = [
  {
    path: '/second/changePwd',
    name: 'changePwd',
    component: ChangePwd
  }
]
// 创建路由实例
// 使用 HTML5 History 模式
export const router = new Router({
  mode: 'history',
  routes: routerMap
})
// 路由加载之前
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (cookie.get('name')) {
    if (to.path === '/login') {
      cookie.remove('name')
      next({path: '/login'})
    } else {
      next()
    }
  } else {
    next()
  }
})
// 路由加载之后
router.afterEach(route => {
  NProgress.done()
})
