import request from './request'

export function getborn () {
  return request({
    url: 'http://13.231.198.169:8088/born',
    method: 'get'
  })
}
export function getengskill () {
  return request({
    url: 'http://13.231.198.169:8088/engskill',
    method: 'get'
  })
}

export function getculture () {
  return request({
    url: 'http://13.231.198.169:8088/culture',
    method: 'get'
  })
}
