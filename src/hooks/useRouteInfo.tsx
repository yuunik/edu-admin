import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import routes from '@/router/routes'

const useRouteInfo = (pathname: string) => {
  // 获取路由参数
  const { id } = useParams()
  // 路由层级
  let routeLevel = 0
  // 编辑模式
  let editMode = false
  // 当前路径对应的路由路径
  const currentRoutePath = pathname.substring(1)

  // 获取当前路径对应的路由层级
  const getCurrentRouteLevel = (routeList: typeof routes) => {
    routeList.forEach((route) => {
      if (route.path === currentRoutePath) {
        // 路由层级+1
        routeLevel += 1

        if (routeLevel >= 2) {
          // 二级路由开始, 若有visible属性为 false, 则进入编辑模式
          !route.meta?.visible && (editMode = true)
        }
      }
      if (route.children) {
        // 进入子路由层级
        routeLevel += 1
        getCurrentRouteLevel(route.children)
      }
    })

    return routeLevel
  }

  // componentDidMount
  useEffect(() => {
    // 获取当前路径对应的路由层级
    getCurrentRouteLevel(routes)
  }, [])

  /**
   * 自定义 hook 返回路由信息未完成
   * TODO: 1. 若 pathname 为匹配路径时, 输出路由表对应的路由路径, 返回 参数 currentRoutePath
   * @param id 当前路径的 id 参数
   * @param routeLevel 当前路径的路由层级
   * @param editMode 是否处于编辑模式
   * @param currentRoutePath 当前路径对应的路由路径
   */
  return { id, routeLevel, editMode, currentRoutePath }
}

export default useRouteInfo
