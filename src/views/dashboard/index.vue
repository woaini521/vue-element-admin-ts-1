<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { UserModule } from "@/store/modules/user"
import AdminDashboard from "./admin/index.vue"
import EditorDashboard from './editor/index.vue'

@Component({
  name: "Dashboard",
  components: {
    AdminDashboard,
    EditorDashboard
  }
})
export default class extends Vue {
  private currentRole = "admin-dashboard";

  get roles() {
    return UserModule.roles
  }

  created() {
    if (this.roles.includes("editor")) {
      this.currentRole = "editor-dashboard"
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
</style>