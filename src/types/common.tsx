/**
 * @description公共的数据类型
 */

import type { RouteObject } from 'react-router'
import type { ReactElement } from 'react'

// 统一返回数据的类型
export type ResType<T> = {
  // 是否响应成功
  success: boolean
  // 状态码
  code: number
  // 响应消息
  message: string
  // 返回的数据
  data: T
}

// 分页查询返回数据类型
export type PageRes<T> = {
  /* 查询总条数 */
  total: number
  /* 返回数据 */
  records: T
}

// 分页数据类型
export type PageParams = {
  /* 当前页 */
  current: number
  /* 每页条数 */
  pageSize: number
  /* 总条数*/
  total?: number
}

// 路由类型
// 路由类型
export type RouteType = RouteObject & {
  index?: boolean
  path?: string
  element: React.ReactNode
  meta?: {
    visible?: boolean
    label?: string
    icon?: ReactElement
  }
  children?: RouteType[]
}

// 树状结构数据通用的数据类型
export type TreeDataType = {
  /* 节点ID */
  key: string
  /* 节点标题 */
  title: string
}
