<template>
<div class="login-container">
    <el-form :model="userInfo" :rules="loginRules" ref="loginForm" class="login-form">
      <div class="title-container">
        <span class="svg-login">
          <svg-icon icon-class="login"></svg-icon>
        </span>
        <span class="title">{{ title }}</span>
        <!-- <lang-select class="set-language"></lang-select> -->
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"></svg-icon>
        </span>
        <el-input
          v-model.trim="userInfo.username"
          placeholder="请输入用户名"
          @keyup.enter.native="handleLogin"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input
          v-model.trim="userInfo.password"
          placeholder="请输入密码"
          :type="passwordType"
          @keyup.enter.native="handleLogin"
        ></el-input>
        <span class="svg-container" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button type="primary" class="login-btn" :loading="loading" @click="handleLogin">登录</el-button>

      <div class="tips">
        <span>账号：admin</span>
        <span>密码：6位数随便填</span>
      </div>
      <div class="tips">
        <span>账号：editor</span>
        <span>密码：6位数随便填</span>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Form, Input } from 'element-ui'
import { UserModule } from '@/store/modules/user'

@Component({
  name: 'Login'
})
export default class extends Vue {
  private validateUsername = (rule: any, value: string, callback: Function) => {
    if (!value) {
      callback(new Error('用户名不能为空'))
    } else if (['admin', 'editor'].indexOf(value) === -1) {
      callback(new Error('用户名不存在，请重新输入'))
    } else {
      callback()
    }
  }
  private validatePassword = (rule: any, value: string, callback: Function) => {
    if (value.length < 6) {
      callback(new Error('请输入6位数以上密码'))
    } else {
      callback()
    }
  }

  private userInfo = {
    username: 'admin',
    password: '123456'
  }
  private loading: boolean = false
  private loginRules = {
    username: [{ validator: this.validateUsername, trigger: 'blur' }],
    password: [{ validator: this.validatePassword, trigger: 'blur' }]
  }
  private title:string = '登录'
  private passwordType = 'password'

  private handleLogin() {
    (this.$refs.loginForm as Form).validate(async(valid: boolean) => {
      if (valid) {
        this.loading = true
        await UserModule.Login(this.userInfo)
        this.$router.push({
          path: '/'
        })
      }
    })
  }

  private showPwd() {
    this.passwordType = this.passwordType === 'password' ? '' : 'password'
  }
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$light_gray: #eee;
$dark_gray: #889aa4;
.login-container {
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 450px;
    margin: 0 auto;
    // padding: 160px 35px 0 35px;

    .tips {
      font-size: 14px;
      color: #fff;
      padding: 7px;
      width: 100%;

      span {
        display: inline-block;
        width: 50%
      }
    }
  }
  .title-container {
    text-align: center;
    font-size: 26px;
    padding: 10px 0;
    .svg-login {
      color: $light_gray;
      padding: 0 10px;
      display: inline-block;
    }

    .title {
      color: $light_gray;
      text-align: center;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    width: 30px;
    display: inline-block;
    vertical-align: middle;
  }

  .login-btn {
    width: 100%;
    margin-bottom: 30px;
  }
}
</style>
<style lang="scss">
$bg: #283443;
$light_gray: #fff;

.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0;
      border-radius: 0;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>