// 公共的数据类型

// 统一返回数据的类型
export type ResType<T> = {
  // 是否响应成功
  success: boolean
  // 状态码
  code: number
  // 响应消息
  message: string
  // 返回的数据
  data: T
}
