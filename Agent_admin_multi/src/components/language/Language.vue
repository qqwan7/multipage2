/**
* Created by qqwan on 2018/4/18.
*/
<template>
    <el-select v-model="locale" @change="switchlanguage">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
</template>

<script>
import cookie from 'js-cookie'
export default {
  data () {
    return {
      locale: this.$i18n.locale,
      options: [{
        value: 'en',
        label: 'English'
      }, {
        value: 'zh-CN',
        label: '简体中文'
      }]
    }
  },
  methods: {
    switchlanguage (lang) {
      cookie.set('lang', lang)
      location.reload()
    }
  }
}
</script>
