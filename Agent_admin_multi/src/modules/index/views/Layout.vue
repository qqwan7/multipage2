/**
* Created by qqwan on 2018/4/18.
*/
<template>
    <div class="view-content">
      <sidebar-content></sidebar-content>
      <header-content></header-content>
      <main-content></main-content>
    </div>
</template>

<script>
import sidebarContent from '@/components/sidebar/Sidebar'
import headerContent from '@/components/header/Header'
import mainContent from '@/components/main/Main'
export default {
  name: 'layout',
  components: {
    sidebarContent,
    headerContent,
    mainContent
  }
}
</script>
