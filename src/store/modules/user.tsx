// 用户信息相关的状态管理库
import { createSlice } from '@reduxjs/toolkit'
import type { Dispatch } from '@reduxjs/toolkit'
import { login } from '@/api/login.tsx'
import { LoginParams } from '@/types/login.tsx'
import { GET_TOKEN, SET_TOKEN } from '@/utils'

const userStore = createSlice({
  name: 'user',
  initialState: {
    // 用户 token
    token: GET_TOKEN() || '',
  },
  reducers: {
    // 保存用户 token
    setToken(state, action) {
      state.token = action.payload
      // 用户 token 本地持久化
      SET_TOKEN(action.payload)
    },
  },
})

// 导出同步 actions
const { setToken } = userStore.actions

// 异步 actions
// 用户登录
const fetchLogin = (data: LoginParams) => {
  return async (dispatch: Dispatch) => {
    const result = await login(data)
    // 触发 actions
    dispatch(setToken(result.data.data.token))
  }
}

// 统一暴露 actions
export { setToken, fetchLogin, userStore }

// 导出 reducers
const userReducer = userStore.reducer

export default userReducer
