import axios from '@http/index'
import { OptExt } from '@http/request'
import { requestThen, requestCatch, responseThen, responseCatch } from '@http/interceptors'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

// baseUrl
// http: process.env.NODE_ENV === 'development' ? '/' : process.env.VUE_APP_AXIOS_BASE_URL,
const baseUrlObj: {
  [event: string]: string | undefined,
} = {
  http: '/',
  upload: '',
  download: ''
}

const httpRequest = <T> (options: OptExt): Promise<AxiosResponse<T>> => {
  const createOptions: AxiosRequestConfig = {}
  // 根据event做初始化创建
  // createOptions.timeout = 3000
  createOptions.baseURL = baseUrlObj.http
  // Ym9zczpib3Nz: 平台表示 base64
  // Basic: 未认证，形如：'Basic Ym9zczpib3Nz',
  // Bearer: 已认证 形如：'Bearer 3378a2ef-8107-4baa-8139-c4ed49c92c4d'
  createOptions.headers = Object.assign(
    {
      'Content-Type': 'application/json; charset=utf-8'
    },
    options.headers || {})

  // 保证 传递给 axios实例的config 符合预期
  delete options.event
  delete options.body

  const instance = axios.create(createOptions)

  instance.interceptors.request.use(requestThen, requestCatch)
  instance.interceptors.response.use(responseThen, responseCatch)

  return instance.request(options)
}

const uploadRequest = <T> (options: OptExt): Promise<AxiosResponse<T>> => {
  const createOptions: AxiosRequestConfig = {}
  const instance = axios.create(createOptions)

  instance.interceptors.request.use(requestThen, requestCatch)
  instance.interceptors.response.use(responseThen, responseCatch)
  return instance.request(options)
}
const downloadRequest = <T> (options: OptExt): Promise<AxiosResponse<T>> => {
  const createOptions: AxiosRequestConfig = {}
  const instance = axios.create(createOptions)

  instance.interceptors.request.use(requestThen, requestCatch)
  instance.interceptors.response.use(responseThen, responseCatch)
  return instance.request(options)
}

export { httpRequest, uploadRequest, downloadRequest }
