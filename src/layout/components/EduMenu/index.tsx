import { useState } from 'react'
import type { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu } from 'antd'

import type { MenuProps } from 'antd'
import routes from '@/router/routes'

// 路由类型
type RouteType = {
  index?: boolean
  path?: string
  element: JSX.Element
  meta?: {
    visible?: boolean
    label?: string
    icon?: ReactElement
  }
  children?: RouteType[]
}
// antD 菜单子元素类型
type MenuItem = Required<MenuProps>['items'][number]
// 菜单数据类型
type MenuItemType = {
  key: string
  label: string
  icon?: ReactElement
  children?: MenuItemType[]
}

// 菜单数据列表
// const menuItemList: MenuItem[] = []

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
  // 当前选中的菜单项 key 数组
  const [current] = useState('/home')

  // 菜单数据
  const [menuItemList] = useState<MenuItem[]>(getMenuItemList(routes))

  // 导航对象
  const navigate = useNavigate()

  // 菜单点击事件
  const onClick = ({ key }: { key: string }) => {
    // 二级路由跳转
    navigate(key)
  }

  return (
    <Menu
      theme="dark"
      onClick={onClick}
      style={{ width: '100%' }}
      mode="inline"
      defaultSelectedKeys={['/home']}
      selectedKeys={[current]}
      items={menuItemList}
    />
  )
}

export default EduMenu
