<template>
  <div class="app-wrapper" :class="classObj">
    <side-bar class="sidebar-container"></side-bar>
    <div class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
      </div>
      <app-main :class="{ 'fixed-margin': fixedHeader }"></app-main>

      <right-panel>
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { SideBar, AppMain, Navbar } from "./components/index"
import { AppModule } from "@/store/modules/app"
import RightPanel from "@/components/RightPanel/index.vue"
import Settings from './components/Settings/index.vue'
import { SettingsModule } from '@/store/modules/settings'

@Component({
  name: "Layout",
  components: {
    SideBar,
    AppMain,
    Navbar,
    RightPanel,
    Settings
  }
})
export default class extends Vue {
  get sidebar() {
    return AppModule.sidebar
  }

  get fixedHeader() {
    return SettingsModule.fixedHeader
  }

  get classObj() {
    return {
      hideSidebar: !this.sidebar.opened,
      openSidebar: this.sidebar.opened
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/_mixins.scss";
@import "@/styles/_variables.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  width: 100%;
  height: 100%;
}
.sidebar-container {
  width: $sideBarWidth !important;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  transition: width 0.28s;
}
.main-container {
  min-height: 100%;
  margin-left: $sideBarWidth;
  position: relative;
  transition: margin-left 0.28s;
}
.hideSidebar {
  .main-container {
    margin-left: 54px;
  }
  .sidebar-container {
    width: 54px !important;
  }
}
// 固定头部
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}
.fixed-margin {
  margin-top: 50px;
}
</style>