<template>
  <div class="navbar">
    <div
      class="hamburger-container"
      :class="{ 'is-active': sidebar.opened }"
      @click="toggleSideBar"
    >
      <i class="hamburger-icon" :class="sidebar.opened ?  'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
    </div>

    <div class="right-menu">
      <el-dropdown size="small" class="avatar-container right-menu-item hover-effect" trigger="click">
        <span class="title-wrapper">
          <i class="el-icon-user-solid"></i>
          <span>
            您好！{{ username }}
          </span>
          <i style="margin-left: 5px" class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { AppModule } from "@/store/modules/app"
import { UserModule } from "@/store/modules/user"

@Component({
  name: "Navbar"
})
export default class extends Vue {
  get sidebar() {
    return AppModule.sidebar
  }
  get username() {
    return UserModule.name
  }
  get avatar() {
    return UserModule.avatar
  }
  private toggleSideBar() {
    AppModule.ToggleSideBar(false)
  }

  private async logout() {
    await UserModule.LogOut()
    this.$router.push(`/login?redirect=${this.$route.fullPath}`)
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/_mixins.scss";
@import "@/styles/_variables.scss";
.navbar {
  height: 50px;
  position: relative;
  background-color: $headerBg;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    display: inline-block;
    height: 100%;
    padding: 0 15px;
    line-height: 50px;
    cursor: pointer;
    font-size: 20px;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    &:after {
      content: "";
      display: table;
      clear: both;
    }

    .user-container {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
    }
  }
  .avatar-container {
    margin-right: 30px;

    .title-wrapper {
      color: #5a5e66;
    }
  }
}
</style>