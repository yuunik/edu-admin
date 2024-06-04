import TabbarBreadcrumb from './components/TabbarBreadcrumb'
import Settings from './components/Settings'
import './index.scss'

const Tabbar = () => {
  return (
    <nav className="tar-bar">
      {/* 面包屑导航栏 */}
      <TabbarBreadcrumb />
      {/* 基础设置栏 */}
      <Settings />
    </nav>
  )
}

export default Tabbar
