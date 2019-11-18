<template>
  <div>
    <div style="margin-bottom: 15px">
      <span>你的权限：</span>
      <span v-for="role in roles" :key="role">{{ role }}</span>
    </div>
    <div>
      <span>切换权限：</span>
      <el-radio-group v-model="switchRoles" size="small">
        <el-radio-button label="admin" />
        <el-radio-button label="editor" />
      </el-radio-group>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { UserModule } from "@/store/modules/user.ts"

@Component({
  name: "SwitchRoles"
})
export default class extends Vue {
  get roles() {
    return UserModule.roles
  }

  get switchRoles() {
    return this.roles[0]
  }

  set switchRoles(value) {
    UserModule.ChangeRoles(value).then(() => {
      this.$emit("change")
    })
  }
}
</script>

<style lang="scss">
</style>