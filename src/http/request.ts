import { httpRequest, uploadRequest, downloadRequest } from '@http/instance'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios'

// 选项继承接口
export interface OptExt extends AxiosRequestConfig {
  event?: string
  platform?: string
  body?: AxiosRequestConfig['data'] | AxiosRequestConfig['params']
}

const requestObj: {
  [event: string]: <T>(options: OptExt) => Promise<AxiosResponse<T>>
} = {
  http: httpRequest,
  upload: uploadRequest,
  download: downloadRequest
}

// 借用函数柯里化特点，前置参数
// 定义 options.platform: [ 'browser', 'node' ] 默认：'browser'
// 定义 options.event: [ 'http', 'upload', 'download' ] 默认：'http'(数据请求) ; upload(上传) ; download(下载)
// 定义 options.body: 统一接收外部参数，内部根据请求方式做转化

function normalizeOptions (options: OptExt) {
  const baseOptions: OptExt = {
    event: options.event || 'http'
  }

  // method:
  const method = options.method || 'get'
  const body = options.body
  // params, data
  if (body) {
    if (['get', 'GET'].includes(method)) {
      baseOptions.params = body
    } else {
      baseOptions.data = body
    }
  }
  return Object.assign(baseOptions, options)
}

const request = (options: OptExt): AxiosPromise => {
  options = normalizeOptions(options)
  return requestObj[options.event!](options)
}

export default request
