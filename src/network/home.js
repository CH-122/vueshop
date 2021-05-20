import { request } from './request'

export function getHomeMenu() {
  return request('get', {
    url: 'menus'
  })
}