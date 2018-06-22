/**
* Created by qqwan on 2018/4/18.
*/
<template>
    <div class="main-content">
      <div class="wrapper">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
      <v-footer></v-footer>
    </div>
</template>

<script>
import vFooter from '../footer/Footer'
export default {
  data () {
    return {}
  },
  components: {
    vFooter
  }
}
</script>
