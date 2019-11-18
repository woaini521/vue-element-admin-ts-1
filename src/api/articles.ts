import request from '@/utils/request'

export function getArticles(params: any) {
  return request({
    url: '/articles',
    method: 'get',
    params
  })
}