// 用户 token 的工具类

// 保存 token
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('token', token)
}

// 获取 token
export const GET_TOKEN = () => {
  return localStorage.getItem('token')
}

// 移除 token
export const REMOVE_TOKEN = () => {
  localStorage.removeItem('token')
}
