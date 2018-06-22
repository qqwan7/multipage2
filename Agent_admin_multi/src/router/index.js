import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/modules/index/views/login/Login'
// 处理IE9不支持history
import 'html5-history-api'
import { i18n } from '../i18n/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import cookie from 'js-cookie'
import Layout from '@/modules/index/views/Layout'
import Home from '@/modules/index/views/home'

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
    path: '/index/login',
    name: 'login',
    component: Login
  },
  {
    path: '/index',
    component: Layout,
    redirect: '/index/home',
    children: [
      {
        path: '/index/home',
        component: Home,
        name: 'home',
        children: [
          {
            path: '/index/home1',
            component: Home,
            name: 'home1',
            testVar: '222',
            meta: {testVar: '222'}
          },
          {
            path: '/index/home2',
            component: Home,
            name: 'home2',
            testVar: '222',
            meta: {testVar: '222'}
          }
        ]
      },
      {
        path: '/index/test1',
        component: Home,
        name: 'test1',
        testVar: '222',
        meta: {testVar: '222'}
      }
    ]
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
    if (to.path === '/index/login') {
      cookie.remove('name')
      next({path: '/index/login'})
    } else {
      next()
    }
  } else {
    // if (to.path !== '/login') {
    //   next({path: '/login'})
    // } else {
    next()
    // }
  }
})
// 路由加载之后
router.afterEach(route => {
  NProgress.done()
})
