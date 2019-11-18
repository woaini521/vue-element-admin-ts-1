<template>
  <div>
    <h1>当前登录角色</h1>
    <el-tag v-for="item in roles" :key="item">{{ item }}</el-tag>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'

@Component({
  name: 'DashboardEditor'
})
export default class extends Vue {
  get roles () {
    return UserModule.roles
  }
}
</script>

<style lang="scss" scoped>

</style>