/**
* Created by qqwan on 2018/4/18.
*/
<template>
    <footer class="footer">
      Copyright &copy; {{getYear}} Grandstream Networks, Inc. All rights reserved.
      <div class="language-box ml40">
        <s-language></s-language>
      </div>
    </footer>
</template>

<script>
import sLanguage from '../language/Language'
export default {
  components: {
    sLanguage
  },
  computed: {
    getYear () {
      return new Date().getFullYear()
    }
  }
}
</script>
