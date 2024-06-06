import { useEffect, useState } from 'react'
import type { ReactElement } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import routes from '@/router/routes'
import type { RouteType } from '@/types/common'
import useRouteInfo from '@/hooks/useRouteInfo.tsx'
// 引入样式
import './index.scss'

// antD 菜单子元素类型
type MenuItem = Required<MenuProps>['items'][number]
// 菜单数据类型
type MenuItemType = {
  key: string
  label: string
  icon?: ReactElement
  children?: MenuItemType[]
}

// 获取菜单数据列表
const getMenuItemList = (routes: RouteType[]) => {
  // 存储筛选后的路由数据
  const filteredRoutes: MenuItemType[] = []
  // 遍历路由数据, 筛选出可见的路由数据
  routes.forEach((route) => {
    if (route.meta?.visible) {
      // 存储一级路由数据
      const resultRoute: MenuItemType = {
        key: route.path as string,
        label: route.meta.label as string,
        icon: route.meta.icon,
      }
      if (route.children) {
        resultRoute.children = getMenuItemList(route.children)
      }
      // 存储筛选后的路由数据
      filteredRoutes.push(resultRoute)
    } else if (route.children) {
      // 一级路由不可见, 仅二级路由可见(只有首页这一个情况)
      const childrenRoutes = getMenuItemList(route.children)
      childrenRoutes[0].key = route.path as string
      filteredRoutes.push(childrenRoutes[0])
    }
  })

  return filteredRoutes
}

const EduMenu = () => {
  // 获取路径对象
  const location = useLocation()
  const { id, routeLevel } = useRouteInfo('/teacher/list')
  console.log('当前路由层级为 ---', routeLevel)

  // 当前选中的菜单项 key 数组
  const [current, setCurrent] = useState<string>(location.pathname)

  // 当前展开项 key 数组
  let currentOpenKeys: string[] = []
  if (current.indexOf('/') === current.lastIndexOf('/')) {
    currentOpenKeys.push(current)
  } else {
    currentOpenKeys = [current.substring(0, current.lastIndexOf('/')), current]
  }
  // 当前展开项
  const [openKeys] = useState<string[]>(currentOpenKeys)

  // 菜单数据
  const [menuItemList] = useState<MenuItem[]>(
    getMenuItemList(routes as RouteType[]),
  )

  // 导航对象
  const navigate = useNavigate()

  // 菜单点击事件
  const onMenuClick = ({ key }: { key: string }) => {
    // 记录当前选中项
    setCurrent(key)
    // 二级路由跳转
    navigate(key)
  }

  useEffect(() => {
    if (!id) {
      setCurrent(location.pathname)
    } else {
      setCurrent('/teacher/list')
    }
    // 监听路由变化, 更新当前选中项
    //setCurrent(location.pathname)
  }, [location.pathname])

  return (
    <Menu
      theme="dark"
      onClick={onMenuClick}
      style={{ width: '100%' }}
      mode="inline"
      defaultOpenKeys={openKeys}
      selectedKeys={[current]}
      items={menuItemList}
    />
  )
}

export default EduMenu
