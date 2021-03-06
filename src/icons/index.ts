import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'

// 全局注册
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)

const requireAll = (requireContext: any) => requireContext.keys().map(requireContext)
requireAll(req)