import { MenuFoldOutlined } from '@ant-design/icons'
import { Breadcrumb, Tooltip } from 'antd'
import { useLocation, useMatches } from 'react-router-dom'
import routes from '@/router/routes'
import './index.scss'
import { RouteType } from '@/types/common.tsx'

const TabbarBreadcrumb = () => {
  // 获取当前路径的相关信息
  const location = useLocation()

  // 面包屑导航栏数据类型
  type breadcrumbItemType = {
    href: string
    title: React.ReactNode
  }

  // 面包屑导航栏数据
  const breadcrumbItems: breadcrumbItemType[] = []
  // 获取当前路径匹配到的路由数组
  const matchedPathList = useMatches().map((match) => match.pathname)
  // 获取父路径匹配到的路由信息
  const result = routes.find((route) => route.path === matchedPathList[0])
  // 判断是否为首页页面
  if (location.pathname.indexOf('/') === location.pathname.lastIndexOf('/')) {
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
    // 获取二级路由
    const childResult = (result?.children as RouteType[])?.find(
      (childRoute) => childRoute.path === matchedPathList[1],
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
