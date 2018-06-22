/**
 * Created by qqwan on 2018/4/17.
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enJson from './en.json'
import zhJson from './zh.json'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: '',
  messages: {
    'en': Object.assign(enJson, enLocale),
    'zh-CN': Object.assign(zhJson, zhLocale)
  }
})
