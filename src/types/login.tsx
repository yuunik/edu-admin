// 用户登录模块相关的数据类型
export type LoginRes = {
  // 用户 token
  token: string
}

// 用户登录请求参数的数据类型
export type LoginParams = {
  /* 手机号 */
  mobile?: string
  /* 用户名 */
  nickname?: string
  /* 暂存信息 */
  account?: string
  password: string
}

// 用户信息返回的数据类型
export type UserInfoRes = {
  /* 用户角色 */
  userInfo: UserInfo
}

// 用户信息数据类型
export type UserInfo = {
  /* 用户 id */
  id: string
  /* 微信 openid*/
  openid: string
  /* 手机号 */
  mobile: string
  /* 密码 */
  password: string
  /* 用户昵称 */
  nickname: string
  /* 用户性别  2: 男 1: 女 */
  sex: number
  /* 用户年龄 */
  age: number
  /* 用户头像 */
  avatar: string
  /* 用户签名 */
  sign: string
  /* 用户状态 0: 正常 1: 禁用 */
  isDisabled: boolean
  /* 用户是否删除 0: 未删除 1: 已删除 */
  isDeleted: boolean
  /* 创建时间 */
  gmtCreate: string
  /* 修改时间 */
  gmtModified: string
}

// 微信登录返回的数据类型
export type WechatLoginRes = {
  // 微信登录的 code
  QRCodeUrl: string
}
