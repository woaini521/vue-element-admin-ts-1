<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

@Component
export default class extends Vue {
  @Prop({ required: true }) private iconClass!: string;
  @Prop({ default: "" }) private className!: string;

  get iconName(): string {
    return `#icon-${this.iconClass}`
  }
  get svgClass(): string {
    if (this.className) {
      return "svg-icon " + this.className
    } else {
      return "svg-icon"
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  overflow: hidden;
  fill: currentColor;
}
</style>