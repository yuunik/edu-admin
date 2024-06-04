import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import EduMenu from './components/EduMenu'
import WebsiteLogo from '@/layout/components/WebsiteLogo'
import { fetchInfo } from '@/store/modules/user.tsx'
import store from '@/store'
import Tabbar from '@/layout/components/Tabbar'

// 引入样式
import './index.scss'

const Layout = () => {
  // 获取触发对象
  const dispatch = useDispatch<typeof store.dispatch>()

  // 组件挂载后获取用户信息
  useEffect(() => {
    dispatch(fetchInfo())
  }, [dispatch])

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
        <Tabbar />
        <main className="content">
          {/* 二级路由展示区 */}
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
