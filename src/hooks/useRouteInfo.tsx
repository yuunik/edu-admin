import { useParams } from 'react-router-dom'

const useRouteInfo = (pathname: string) => {
  // 获取路由参数
  const param = useParams()
  const paramName = Object.keys(param)[0]
  const paramValue = param[paramName]
  // 编辑模式
  let editMode = false

  // 当前路径对应的路由路径
  const currentPathList = pathname.substring(1).split('/')
  let currentRoutePath = pathname
  // 若路径最后一项为数字, 则视为编辑模式
  if (
    parseFloat(currentPathList[currentPathList.length - 1]).toString() !== 'NaN'
  ) {
    // 重组路径数组
    currentRoutePath =
      pathname.substring(0, pathname.lastIndexOf('/')) + `/:${paramName}`
    editMode = true
  }

  /**
   * @param id 当前路径的 id 参数
   * @param editMode 是否处于编辑模式
   * @param currentRoutePath 当前路径对应的路由路径
   */
  return { paramValue, editMode, currentRoutePath }
}

export default useRouteInfo
