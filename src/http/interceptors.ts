import qs from 'qs'
import { VNode } from 'vue'
import store from '@/store'
import router from '@/router'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { AxiosError, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios'

interface AxiosResponseData {
  msg: string
  code: number
  message: string | null
  data: {
    [key: string]: any
  }
}

type responseThenReturn = {
  [key: string]: any
} | undefined | null

function requestThen (config: AxiosRequestConfig): AxiosRequestConfig {
  if (['get', 'GET'].includes(config.method as string)) {
    config.paramsSerializer = function (params) {
      return qs.stringify(params)
    }
  }

  // 已登录，配置Authorization
  const token = store.getters.access_token
  if (token && config && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }

  // 特殊处理一下 426 错误，接口token报错
  config.validateStatus = function (status) {
    return (status >= 200 && status < 300) || status === 426
  }
  return config
}

function requestCatch (error: AxiosError): AxiosPromise {
  return Promise.reject(error)
}

function responseThen (response: AxiosResponse<AxiosResponseData>): responseThenReturn {
  if (response.status === 200) {
    // code: 0: 成功 -1: 一般错误，直接提示 xxx: 业务错误，交给前台
    const { code, message, data } = response.data
    if (code === 0) {
      // PUT类型请求，data值为null，这里处理为true
      return data || true
    } else if (code === -1 || code === 1) {
      ElMessage.error({
        message: message as string | VNode
      })
      return null
    } else {
      return response.data
    }
  } else if (response.status === 426) {
    // 更新协议请求
    ElMessage.error({
      message: response.data.msg
    })
  }
}

function responseCatch (error: AxiosError): AxiosPromise | undefined {
  const errJson: { [key: string]: any } = error.toJSON()
  // 401 Unauthorized
  if (errJson.status === 401) {
    ElMessage.error({
      message: '未认证或认证失败，请重新登录'
    })
    // 登出逻辑
    store.dispatch('userLoginOut')

    // 重新登录
    router.push('/login')
  } else if (errJson.status === 500) {
    ElMessage.error({
      message: '服务异常，请联系管理员'
    })
  } else {
    return Promise.reject(error)
  }
}

export { requestThen, requestCatch, responseThen, responseCatch }
