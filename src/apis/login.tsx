import { request } from '@/utils'
import type { ResType } from '@/types/common.tsx'
import type {
  LoginParams,
  LoginRes,
  UserInfo,
  UserInfoRes,
  WechatLoginRes,
} from '@/types/login.tsx'

// 请求地址管理
enum Login {
  // 用户登录
  LOGIN = '/ucenterservice/member/loginUser',
  // 获取用户信息
  GET_USER_INFO = '/ucenterservice/member/getUserInfo',
  // 微信登录
  LOGIN_WECHAT = '/api/ucenter/wx/getQRCode/',
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
  request<ResType<UserInfoRes>>({
    url: Login.GET_USER_INFO,
    method: 'GET',
  })

// 微信登录
export const loginByWechat = (port: string) =>
  request<ResType<WechatLoginRes>>({
    url: Login.LOGIN_WECHAT + `${port}`,
    method: 'GET',
  })
