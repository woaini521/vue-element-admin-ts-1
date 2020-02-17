import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'

import Layout from '@/layout/index.vue'

Vue.use(Router)

// 不需要权限的基础路由，例如404，login等
export const baseRoutes: RouteConfig[] = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '首页',
          icon: 'dashboard',
          affix: true
        }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    meta: { hidden: true }
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    meta: { hidden: true }
  }
]

// 需要根据用户角色动态加载的路由
export const asyncRoutes: RouteConfig[] = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/directive',
    meta: {
      title: '权限测试页面',
      icon: 'lock',
      roles: ['admin', 'editor'] // 访问权限
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page.vue'),
        meta: {
          title: '页面权限',
          roles: ['admin']
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive.vue'),
        meta: {
          title: '指令权限'
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role.vue'),
        meta: {
          title: '角色权限',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/table',
    component: Layout,
    redirect: '/table/dynamic-table',
    meta: {
      title: 'table',
      icon: 'table',
      roles: ['admin', 'editor'] // 访问权限
    },
    children: [
      {
        path: '/dynamic-table',
        component: () => import('@/views/table/dynamic-table.vue'),
        meta: {
          title: '动态表格'
        }
      },
      {
        path: '/draggable-table',
        component: () => import('@/views/table/draggable-table.vue'),
        meta: {
          title: '拖拽表格'
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    meta: { hidden: true }
  }
]

function createRouter() {
  return new Router({
    mode: 'history',
    routes: baseRoutes
  })
}

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher // reset router
}

export default router