// 用户登录模块相关的数据类型
export type LoginRes = {
  // 用户 token
  token: string
}

// 用户登录请求参数的数据类型
export type LoginParams = {
  username: string
  password: string
}
