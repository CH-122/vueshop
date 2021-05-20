import { request } from './request'


export function getLoginInfo(username, password) {
  return request('post', {
    url: 'login',
    params: {
      username,
      password
    }
  })
}