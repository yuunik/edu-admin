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

// 用户信息的数据类型
export type UserInfo = {
  /* 用户角色 */
  role: string[]
  /* 用户名*/
  name: string
  /* 用户头像 */
  avatar: string
}
