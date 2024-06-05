import { request } from '@/utils'
import type { ResType } from '@/types/common.tsx'
import type { LoginParams, LoginRes, UserInfo } from '@/types/login.tsx'

// 请求地址管理
enum Login {
  // 用户登录
  LOGIN = '/eduservice/user/login',
  // 获取用户信息
  GET_USER_INFO = '/eduservice/user/info',
}

// 用户登录
export const loginAPI = (data: LoginParams) =>
  request<ResType<LoginRes>>({
    url: Login.LOGIN,
    method: 'POST',
    data,
  })

// 获取用户信息
export const getUserInfoAPI = () =>
  request<ResType<UserInfo>>({
    url: Login.GET_USER_INFO,
    method: 'GET',
  })
