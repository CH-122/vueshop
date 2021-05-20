import { request } from './request'

export function getUserInfo(query, pagenum, pagesize) {
  return request('get', {
    url: 'users',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}