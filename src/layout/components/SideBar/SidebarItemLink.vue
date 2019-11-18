<template>
  <router-link :to="to">
    <slot></slot>
  </router-link>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'SidebarItemLink'
})
export default class extends Vue {
  @Prop({ required: true }) private to!: string
}
</script>

<style lang="scss">

</style>