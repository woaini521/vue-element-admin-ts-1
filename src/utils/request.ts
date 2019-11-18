import axios from 'axios'
import { Notification } from 'element-ui'
import { UserModule } from '@/store/modules/user'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000
  // withCredentials: true // 表示跨域请求时是否需要使用凭证
})

service.interceptors.request.use(
  config => {
    if(UserModule.token) {
      config.headers['x-token'] = UserModule.token
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if(res.success) {
      if(res.message) {
        Notification({
          title: '请求成功',
          message: res.message,
          type: 'success'
        })
      }
    } else {
      if(res.message) {
        Notification({
          title: '请求失败',
          message: res.message || 'Error',
          type: 'error'
        })
      }
    }
    return res
  },
  error => {
    console.log('err' + error) // for debug
    Notification({
      title: '网络错误',
      message: error.message,
      type: 'error'
    })
    return Promise.reject(error)
  }
)

export default service