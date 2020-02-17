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
    if (UserModule.token) {
      config.headers['Authorization'] = `Bearer ${UserModule.token}`
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
    const errMsg = res.msg || '请求失败'
    if (res.code !== 0) {
      Notification({
        title: '请求失败',
        message: errMsg,
        type: 'error'
      })
    }
    return res
  },
  error => {
    console.log('err' + error) // for debug
    const { msg } = error.response.data
    Notification({
      title: '请求失败',
      message: msg || '请求失败',
      type: 'error'
    })
    return Promise.reject(error)
  }
)

export default service