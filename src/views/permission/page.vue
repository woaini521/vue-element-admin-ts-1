<template>
  <div class="app-container">
    <switch-roles @change="handleRolesChange"></switch-roles>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import SwitchRoles from "./components/SwitchRoles.vue"
@Component({
  name: "PagePermission",
  components: {
    SwitchRoles
  }
})
export default class extends Vue {
  private handleRolesChange() {
    this.$router.push({ path: '/permission/index?' + +new Date() })
  }
}
</script>

<style lang="scss">
</style>