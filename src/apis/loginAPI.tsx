import { request } from '@/utils'
import type { ResType } from '@/types/common.tsx'
import type { LoginParams, LoginRes, UserInfo } from '@/types/login.tsx'

// 请求地址管理
enum LoginAPI {
  // 用户登录
  LOGIN = '/eduservice/user/login',
  // 获取用户信息
  GET_USER_INFO = '/eduservice/user/info',
}

// 用户登录
export const loginAPI = (data: LoginParams) =>
  request<ResType<LoginRes>>({
    url: LoginAPI.LOGIN,
    method: 'POST',
    data,
  })

// 获取用户信息
export const getUserInfoAPI = () =>
  request<ResType<UserInfo>>({
    url: LoginAPI.GET_USER_INFO,
    method: 'GET',
  })
