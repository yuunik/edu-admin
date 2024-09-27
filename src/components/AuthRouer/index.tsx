import { GET_TOKEN } from '@/utils'
import { Navigate } from 'react-router-dom'

// 前置路由守卫
interface Prop {
  children: React.ReactNode
}

const AuthRouter: React.FC<Prop> = ({ children }) => {
  // 获取本地存储中的 token
  const token = GET_TOKEN()
  if (token) {
    return <>{children}</>
  } else {
    return <Navigate to="/login" replace />
  }
}

export default AuthRouter
