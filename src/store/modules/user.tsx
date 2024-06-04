// 用户信息相关的状态管理库
import { createSlice } from '@reduxjs/toolkit'
import type { Dispatch } from '@reduxjs/toolkit'
import { getUserInfo, login } from '@/apis/login.tsx'
import { LoginParams } from '@/types/login.tsx'
import { GET_TOKEN, SET_TOKEN } from '@/utils'

const userStore = createSlice({
  name: 'user',
  initialState: {
    // 用户 token
    token: GET_TOKEN() || '',
    // 用户信息
    userInfo: {},
  },
  reducers: {
    // 保存用户 token
    setToken(state, action) {
      state.token = action.payload
      // 用户 token 本地持久化
      SET_TOKEN(action.payload)
    },
    // 保存用户信息
    setUserInfo(state, action) {
      state.userInfo = action.payload
      console.log('-------- setUserInfo ----------', action)
    },
  },
})

// 导出同步 actions
const { setToken, setUserInfo } = userStore.actions

// 用户登录
/**
 * 异步 actions
 */
const fetchLogin = (data: LoginParams) => {
  return async (dispatch: Dispatch) => {
    const result = await login(data)
    if (result.data.code === 20000) {
      // 触发 actions
      dispatch(setToken(result.data.data.token))
    }
  }
}

// 获取用户信息
const fetchInfo = () => {
  return async (dispatch: Dispatch) => {
    const {
      data: { code, data },
    } = await getUserInfo()
    if (code === 20000) {
      // 触发 actions
      dispatch(setUserInfo(data))
    }
  }
}

// 统一暴露 actions
export { fetchLogin, fetchInfo, setUserInfo, setToken }

// 导出 reducers
const userReducer = userStore.reducer

export default userReducer
