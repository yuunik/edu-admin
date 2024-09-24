/**
 * axios 二次封装工具类
 */
import axios from 'axios'
import { message } from 'antd'
import { GET_TOKEN } from '@/utils/token.tsx'
import { ResType } from '@/types/common.tsx'

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 3000,
})

// 请求拦截器
request.interceptors.request.use((config) => {
  // 获取本地存储的 token
  const token = GET_TOKEN()
  if (token) {
    // 往请求头中加入 token
    config.headers['Authorization'] = `${token}`
  }
  return config
})

// 响应拦截器
request.interceptors.response.use(
  async (response) => {
    const { code, message: msg } = response.data as ResType<
      typeof response.data.data
    >
    // 请求成功情况一: code 为 20000 时
    // 请求成功情况二: responseType 为 'blob' 时, 即下载文件
    if (code !== 20000 && response.config.responseType !== 'blob') {
      // 处理请求错误情况
      await message.error(msg)
      // 跳转至错误页面
      // TODO: token 失效, 路由跳转
      // redirect('/login')
      return Promise.reject(new Error(msg))
    }
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
