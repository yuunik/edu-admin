import { MenuFoldOutlined } from '@ant-design/icons'
import { Breadcrumb, Tooltip } from 'antd'
import { useLocation } from 'react-router-dom'
import routes from '@/router/routes'
import { useState } from 'react'
import { RouteType } from '@/types/common.tsx'
import useRouteInfo from '@/hooks/useRouteInfo.tsx'
import './index.scss'

const TabbarBreadcrumb = () => {
  // 获取当前路径的相关信息
  const location = useLocation()
  const [pathname] = useState(location.pathname)
  const { id } = useRouteInfo('/teacher/edit/:id')

  // 面包屑导航栏数据类型
  type breadcrumbItemType = {
    href: string
    title: React.ReactNode
  }

  let firstPath
  // 检查当前路由是否为首页
  if (pathname === '/home') {
    firstPath = pathname
  } else {
    firstPath = pathname.substring(0, pathname.indexOf('/', 1))
  }

  // 面包屑导航栏数据
  const breadcrumbItems: breadcrumbItemType[] = []
  // 获取当前路径匹配到的路由数组
  // const matchedPathList = [firstPath, pathname]
  // 获取父路径匹配到的路由信息
  const result = routes.find((route) => route.path === firstPath)
  // 判断是否为首页页面
  if (pathname.indexOf('/') === pathname.lastIndexOf('/')) {
    // 首页
    breadcrumbItems.push({
      href: result?.children![0].path as string,
      title: (
        <>
          {result?.children![0].meta?.icon}
          <span>{result?.children![0].meta?.label}</span>
        </>
      ),
    })
  } else {
    // 非首页
    // 获取一级路由
    breadcrumbItems.push({
      href: result?.path as string,
      title: (
        <>
          {result?.meta?.icon}
          <span>{result?.meta?.label}</span>
        </>
      ),
    })
    // 处理二级路由
    let pathData = pathname
    // 若 / 出现三次, 截取至第二个 /, 并拼接 '/:id'
    if (id) {
      pathData = pathname.substring(0, pathname.lastIndexOf('/')) + '/:id'
    }
    // 获取二级路由
    const childResult = (result?.children as RouteType[])?.find(
      (childRoute) => childRoute.path === pathData,
    )
    if (childResult) {
      breadcrumbItems.push({
        href: childResult.path as string,
        title: (
          <>
            {childResult.meta?.icon}
            <span>{childResult.meta?.label}</span>
          </>
        ),
      })
    }
  }

  return (
    <div className="breadcrumb-container">
      {/* 菜单栏折叠按钮 */}
      <Tooltip title="折叠菜单栏">
        <MenuFoldOutlined style={{ cursor: 'pointer' }} />
      </Tooltip>
      {/* 面包屑 */}
      <Breadcrumb items={breadcrumbItems} className="website-breadcrumb" />
    </div>
  )
}

export default TabbarBreadcrumb
