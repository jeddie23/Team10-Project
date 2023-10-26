<template>
  <div class="side-menu-wrapper">
    <el-scrollbar wrap-class="scrollbar">
      <el-menu
        :default-active="activeMenu"
        :collapse="collapsed"
        :unique-opened="true"
        background-color="#263238"
        text-color="#fff"
        active-text-color="#409eff"
      >
        <SideMenuItem
          v-for="(route,index) in routes"
          :key="index"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SideMenuItem from './SideMenuItem'

export default {
  name: 'SideMenu',
  components: { SideMenuItem },
  computed: {
    ...mapGetters('app', ['collapsed']),
    routes() {
      let arr = []
      let routes = this.$router.options.routes
      if(JSON.parse(sessionStorage.getItem('routes'))){
        arr = JSON.parse(sessionStorage.getItem('routes'))
        for(let i=0;i<arr.length;i++){
          routes.push(arr[i])
        } 
      }
      return routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  }
}
</script>

<style lang="less">
@import "../../../assets/less/side-menu";
</style>
