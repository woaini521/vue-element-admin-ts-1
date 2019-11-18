<template>
  <section class="app-main">
    <router-view :key="key"></router-view>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component({
  name: "AppMain"
})
export default class extends Vue {
  get key() {
    return this.$route.path
  }
}
</script>

<style lang="scss">
.app-main {
  width: 100%;
  min-height: calc(100vh - 50px);
  position: relative;
  overflow: hidden;
}
</style>