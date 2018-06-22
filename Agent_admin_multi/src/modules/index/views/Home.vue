/**
* Created by qqwan on 2018/4/18.
*/
<template>
    <div>
      {{getTestVar}}
    </div>
</template>

<script>
export default {
  computed: {
    getTestVar () {
      return this.$route.testVar
    }
  }
}
</script>
