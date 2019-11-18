import request from '@/utils/request'

export function login(data: any) {
  return request({
    url: '/users/login',
    method: 'post',
    data
  })
}

export function getUserInfo(data?: any) {
  return request({
    url: '/users/info',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/users/logout',
    method: 'post'
  })
}