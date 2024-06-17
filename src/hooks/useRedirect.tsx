// 路由重定向钩子函数
import { useNavigate } from 'react-router-dom'

export const useRedirect = () => {
  const navigate = useNavigate()

  return (pathname: string) => {
    switch (pathname) {
      case '/':
        navigate('/home')
        break
      case '/teacher':
        navigate('/teacher/list')
        break
      case '/category':
        navigate('/category/list')
        break
      case '/subject':
        navigate('/subject/list')
        break
      // 添加更多的路径和重定向逻辑
      default:
        // 默认情况下不执行任何操作
        break
    }
  }
}

export default useRedirect
