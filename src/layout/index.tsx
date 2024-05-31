import { useEffect } from 'react'

import { getUserInfo } from '@/api/login'

const Layout = () => {
  // 组件挂载后执行
  useEffect(() => {
    getUserInfo()
  }, [])
  return <div className="layout-container">我是 Layout 页{/* 二级路由 */}</div>
}

export default Layout
