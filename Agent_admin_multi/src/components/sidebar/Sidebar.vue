/**
* Created by qqwan on 2018/4/18.
*/
<template>
  <div class="sidebar-content">
    <div class="logo">
      <span class="bg-pic bg-logo"></span>
      <span class="logo-title">Agent Admin</span>
    </div>
    <el-menu :default-active="$route.path" :unique-opened="true" :router="true" background-color="#262f3d"
             text-color="#fff"
             active-text-color="#ffd04b">
      <template v-for="(item, index) in routerMap">
        <el-submenu v-if="item.children" :index="index+''" :key="index">
          <template slot="title">
            <div class="bg-pic" :class="item.icon"></div>
            <a class="text">{{item.name}}</a>
          </template>
          <el-menu-item v-for="(child, childIndex) in item.children" :index="child.path" :key="childIndex" ref="menuItem">
            {{child.name}}
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :key="index" :index="item.path">
          <span class="bg-pic" :class="item.icon"></span>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'sideBar',
  data () {
    return {
      routerMap: this.$router.options.routes[1].children
    }
  },
  methods: {
  },
  mounted () {
    // console.log(this.$router.options.routes[1].children)
  },
  watch: {
  }
}
</script>
