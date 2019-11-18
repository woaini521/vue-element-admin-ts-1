<template>
  <div>
    <!-- {{ routes }} -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        mode="vertical"
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="isCollapse"
        ></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { PermissionModule } from "@/store/modules/permission"
import { AppModule } from '@/store/modules/app'
import SidebarItem from "./SidebarItem.vue"
import variables from "@/styles/_variables.scss"

@Component({
  name: "SideBar",
  components: {
    SidebarItem
  }
})
export default class extends Vue {
  get routes() {
    return PermissionModule.routes
  }
  get variables() {
    return variables
  }
  get sidebar() {
    return AppModule.sidebar
  }
  get isCollapse() {
    return !this.sidebar.opened
  }
  get activeMenu() {
    return this.$route.path
  }
}
</script>

<style lang="scss">
.sidebar-container {
  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__view {
    height: 100%;
  }
}
</style>
<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
}
.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
</style>