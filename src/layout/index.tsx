import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { getUserInfo } from '@/apis/login'

// 引入样式
import './index.scss'

const Layout = () => {
  // 组件挂载后执行
  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <div className="layout-container">
      {/* 侧边菜单栏 */}
      <aside className="menu">侧边菜单栏</aside>
      <div className="content-container">
        {/* tabbar 栏 */}
        <nav className="tar-bar">我是 TabBar </nav>
        <main className="content">
          {/* 二级路由展示区 */}
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
