<template>
  <div>
    <switch-roles @change="handleRolesChange"></switch-roles>
    <h1 v-permission="['admin']">这是只有admin能看到的</h1>
    <h1 v-permission="['editor']">这是只有editor能看到的</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import SwitchRoles from "./components/SwitchRoles.vue"

@Component({
  name: "DirectivePermission",
  components: {
    SwitchRoles
  }
})
export default class extends Vue {
  private handleRolesChange() {
    this.$router.push({ path: "/permission/index?" + +new Date() })
  }
}
</script>

<style lang="scss">
</style>