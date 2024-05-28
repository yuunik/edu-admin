import { request } from '@/utils'
import type { ResType } from '@/types/common.tsx'
import type { LoginRes } from '@/types/login.tsx'

// 请求地址管理
enum LoginAPI {
  // 用户登录
  LOGIN = '/eduserive/edu-user/login',
  // 获取用户信息
  GET_USER_INFO = '/eduserive/edu-user/info',
}

// 用户登录
export const login = () =>
  request<ResType<LoginRes>>({
    url: LoginAPI.LOGIN,
    method: 'POST',
  })

// 获取用户信息
export const getUserInfo = () =>
  request({
    url: LoginAPI.GET_USER_INFO,
    method: 'GET',
  })
