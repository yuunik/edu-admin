// 用户信息相关的状态管理库
import { createSlice } from '@reduxjs/toolkit'
import type { Dispatch } from '@reduxjs/toolkit'
import { getUserInfoAPI, loginAPI } from '@/apis/login.tsx'
import type { LoginParams, UserInfo } from '@/types/login.tsx'
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from '@/utils'

const userStore = createSlice({
  name: 'user',
  initialState: {
    // 用户 token
    token: GET_TOKEN() || '',
    // 用户信息
    userInfo: {} as UserInfo | undefined,
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
    },
    // 安全退出时, 清除所有用户相关数据
    clearInfo(state) {
      state.token = ''
      state.userInfo = undefined
      // 清空本地缓存
      REMOVE_TOKEN()
    },
  },
})

// 导出同步 actions
const { setToken, setUserInfo, clearInfo } = userStore.actions

// 用户登录
/**
 * 异步 actions
 */
const fetchLogin = (data: LoginParams) => {
  return async (dispatch: Dispatch) => {
    const result = await loginAPI(data)
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
      data: {
        code,
        data: { userInfo },
      },
    } = await getUserInfoAPI()
    if (code === 20000) {
      // 触发 actions
      dispatch(setUserInfo(userInfo))
    } else {
      // 路由跳转
      window.location.href = '/login'
    }
  }
}

// 统一暴露 actions
export { fetchLogin, fetchInfo, clearInfo }

// 导出 reducers
const userReducer = userStore.reducer

export default userReducer
