import Vue, { DirectiveOptions } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as directives from '@/directives'
// 引入权限判断的前置守卫
import '@/permission'

import "normalize.css/normalize.css" // css reset
import './plugins/element.js'


import './styles/index.scss'
// 引入svg-icon
import './icons/index.ts'

// 注册全局自定义指令
Object.keys(directives).forEach(key => {
  Vue.directive(key, (directives as { [key: string]: DirectiveOptions })[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
