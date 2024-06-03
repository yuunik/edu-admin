import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { getUserInfo } from '@/apis/login'
import EduMenu from './components/EduMenu'
import WebsiteLogo from '@/layout/components/WebsiteLogo'

// 引入样式
import './index.scss'

const Layout = () => {
  // 组件挂载后获取用户信息
  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <div className="layout-container">
      {/* 侧边菜单栏容器 */}
      <aside className="menu">
        {/* 网站 logo*/}
        <WebsiteLogo />
        {/* 菜单栏 */}
        <EduMenu />
      </aside>
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
