/*
 * @Description: 自定义权限指令（v-permission="['admin', 'editor']"）
 * @Author: 晓枫
 * @Date: 2019-11-14 09:57:52
 * @LastEditTime: 2019-11-22 11:30:56
 */
import { DirectiveOptions } from 'vue'
import { UserModule } from '@/store/modules/user'

export const permission: DirectiveOptions = {
  inserted(el, binding) {
    const value = binding.value
    const roles = UserModule.roles

    if(value && value instanceof Array && value.length > 0) {
      const hasPermission = roles.some(role => {
        return value.includes(role)
      })

      if(!hasPermission) {
        // 移除元素方法el.parentNode.removeChild(el)
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  }
}