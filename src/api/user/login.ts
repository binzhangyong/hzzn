import request from '@http/request'
import { codeBaseUrl, authBaseUrl } from '@api/baseUrl'

// 获取图片和check相关字段
export function userLoginGetCode (): any {
  return request({
    url: `${codeBaseUrl}`
  })
}

// 登录check
export function userLoginCheck (data: {
  captchaType: string,
  pointJson: string
  token: string
}): any {
  return request({
    url: `${codeBaseUrl}/check`,
    method: 'post',
    params: data
  })
}

// 登录
export function userLoginToken (
  params: {
    randomStr: string,
    code: string,
    'grant_type': string
  },
  body: string
): any {
  return request({
    url: `${authBaseUrl}/oauth/token`,
    headers: {
      isToken: false,
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic Ym9zczpib3Nz'
    },
    method: 'post',
    params,
    body
  })
}
