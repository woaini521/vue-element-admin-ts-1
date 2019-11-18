import router from '@/router'
import NProgress from 'nprogress' // progress bar
import { UserModule } from '@/store/modules/user'
import { PermissionModule } from '@/store/modules/permission'
import { Route } from 'vue-router'
import { Message } from 'element-ui'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '']

router.beforeEach(async(to: Route, from: Route, next: any) => {
  // start progress bar
  NProgress.start()

  if(UserModule.token) {
    if(to.path === 'login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // 判断是否有用户信息，没有则发请求去后台获取当前登录用户信息
      const hasRoles = UserModule.roles && UserModule.roles.length > 0
      if(hasRoles) {
        next()
      } else {
        try {
          // get user info
          await UserModule.GetUserInfo()
          const roles = UserModule.roles
          // 根据roles信息过滤路由
          PermissionModule.GenerateRoutes(roles)
          // 动态添加路由
          router.addRoutes(PermissionModule.dynamicRoutes)
          // Set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          UserModule.ResetToken()
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if(whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach((to: Route) => {
  // finish progress bar
  NProgress.done()
})