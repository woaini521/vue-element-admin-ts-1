import Vue from 'vue'
import VueRouter, { Route } from 'vue-router'

declare module '*.vue' {

  export default Vue
}

declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter,
    $route: Route
  }
}
// TODO: remove this part after vue-count-to has its typescript file
declare module 'vue-count-to'