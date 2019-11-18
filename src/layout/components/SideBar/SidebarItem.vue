<template>
  <div
    v-if="!item.meta || !item.meta.hidden"
    :class="[
      isCollapse ? 'simple-mode' : 'full-mode'
    ]"
  >
    <template v-if="theOnlyOneChild && !theOnlyOneChild.children">
      <sidebar-item-link v-if="theOnlyOneChild.meta" :to="resolvePath(theOnlyOneChild.path)">
        <el-menu-item :index="resolvePath(theOnlyOneChild.path)">
          <div class="svg-container" v-if="theOnlyOneChild.meta.icon">
            <svg-icon :icon-class="theOnlyOneChild.meta.icon || (item.meta.icon)"></svg-icon>
          </div>
          <span
            class="menu-title"
            v-if=" theOnlyOneChild.meta.title"
            slot="title"
          >{{ theOnlyOneChild.meta.title }}</span>
        </el-menu-item>
      </sidebar-item-link>
    </template>

    <el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <div class="svg-container" v-if="item.meta && item.meta.icon">
          <svg-icon :icon-class="item.meta.icon"></svg-icon>
        </div>

        <span v-if="item.meta && item.meta.title" slot="title">{{ item.meta.title }}</span>
      </template>

      <template v-if="item.children">
        <sidebar-item
          class="nest-menu"
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :is-collapse="isCollapse"
          :base-path="resolvePath(child.path)"
        ></sidebar-item>
      </template>
    </el-submenu>
  </div>
</template>

<script lang="ts">
import path from "path"
import { Component, Vue, Prop } from "vue-property-decorator"
import { RouteConfig } from "vue-router"
import SidebarItemLink from "./SidebarItemLink.vue"

@Component({
  // 递归组件必须给个name
  // https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E9%80%92%E5%BD%92%E7%BB%84%E4%BB%B6
  name: "SidebarItem",
  components: {
    SidebarItemLink
  }
})
export default class extends Vue {
  @Prop({ required: true }) private item!: RouteConfig;
  @Prop({ default: "" }) private basePath!: string;
  @Prop({ default: false }) private isCollapse!: boolean;

  // 获取当前路由的children个数
  get showingChildNumber() {
    if (this.item.children) {
      const showingChildren = this.item.children.filter(item => {
        if (item.meta && item.meta.hidden) {
          return false
        } else {
          return true
        }
      })
      return showingChildren.length
    }
    return 0
  }
  // 只有一个children对象，就在将其展示为根元素
  get theOnlyOneChild() {
    if (this.showingChildNumber > 1) {
      return null
    }
    if (this.item.children) {
      for (const child of this.item.children) {
        if (!child.meta || !child.meta.hidden) {
          return child
        }
      }
    }
    return { ...this.item, path: "" }
  }

  private resolvePath(routePath: string) {
    return path.resolve(this.basePath, routePath)
  }
}
</script>

<style lang="scss" scoped>
.svg-container {
  margin-right: 10px;
  display: inline-block;
}
</style>
<style lang="scss">
.full-mode {
  .nest-menu .el-menu-item {
    min-width: $sideBarWidth !important;
    background-color: $subMenuBg !important;

    &:hover {
      background-color: $subMenuHover !important;
    }
  }
  // .nest-menu .el-submenu .el-menu {
  //   min-width: $sideBarWidth !important;
  //   background-color: $subMenuBg !important;
  // }
}
.simple-mode {
  .el-submenu {
    .el-submenu__title {
      .el-submenu__icon-arrow {
        display: none;
      }

      & > span {
        visibility: hidden;
      }
    }
  }
}
</style>