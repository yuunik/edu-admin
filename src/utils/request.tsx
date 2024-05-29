/**
 * axios 二次封装工具类
 */
import axios from 'axios'
import { message } from 'antd'

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 3000,
})

// 请求拦截器
request.interceptors.request.use((config) => {
  return config
})

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 返回响应时, 拆除 axios 自己封装的一层
    return response
  },
  (error) => {
    // 处理网络错误
    let msg = ''
    // 获取响应状态码
    const status = error.response.status
    // 根据状态码的不同, 提示错误信息
    switch (status) {
      case 401:
        msg = 'token 过期'
        break
      case 403:
        msg = '无权访问'
        break
      case 404:
        msg = '请求地址错误'
        break
      case 500:
        msg = '服务器错误'
        break
      default:
        msg = '网络异常, 请稍后再试...'
    }

    // 提示错误信息
    message.error(msg)

    return Promise.reject(error)
  },
)

export default request
