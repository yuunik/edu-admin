import { GET_TOKEN } from '@/utils'
import { Navigate } from 'react-router-dom'
import { ReactNode } from 'react'
import { message } from 'antd'

// 前置路由守卫
interface Prop {
  children: ReactNode
}

const AuthRouter: React.FC<Prop> = ({ children }) => {
  // 获取本地存储中的 token
  const token = GET_TOKEN()
  if (token) {
    return <>{children}</>
  } else {
    message.error('token 已失效, 请重新登录')
    return <Navigate to="/login" replace />
  }
}

export default AuthRouter
