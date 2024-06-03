import { Navigate } from 'react-router-dom'
import {
  HomeOutlined,
  UnorderedListOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons'
import type { ReactElement } from 'react'

// 引入一级路由
import Home from '@/pages/home'
import Login from '@/pages/login'
import Error from '@/pages/error'
import Any from '@/pages/any'
// 引入二级路由
import List from '@/pages/teacher/list'
import Save from '@/pages/teacher/save'
// 引入布局组件
import Layout from '@/layout'
// 引入前置路由守卫组件
import AuthRouter from '@/components/AuthRouer'

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

// 路由表
const routes: RouteType[] = [
  {
    path: '/',
    element: <Navigate to="/home" />,
    meta: {
      visible: false,
    },
  },
  {
    path: '/home',
    element: (
      <AuthRouter>
        <Layout />
      </AuthRouter>
    ),
    children: [
      {
        index: true,
        element: <Home />,
        meta: {
          visible: true,
          label: '首页',
          icon: <HomeOutlined />,
        },
      },
    ],
    meta: {
      visible: false,
    },
  },
  {
    path: '/login',
    element: <Login />,
    meta: {
      visible: false,
      label: '登录页',
    },
  },
  {
    path: '/error',
    element: <Error />,
    meta: {
      visible: false,
      label: '错误页',
    },
  },
  {
    path: '/:pathMatch*',
    element: <Any />,
    meta: {
      visible: false,
      label: '任意页',
    },
  },
  {
    path: '/teacher',
    element: <Layout />,
    children: [
      {
        path: '/teacher/list',
        element: <List />,
        meta: {
          visible: true,
          label: '讲师列表',
          icon: <UnorderedListOutlined />,
        },
      },
      {
        path: '/teacher/save',
        element: <Save />,
        meta: {
          visible: true,
          label: '新增讲师',
          icon: <UserAddOutlined />,
        },
      },
    ],
    meta: {
      visible: true,
      label: '讲师管理',
      icon: <UserOutlined />,
    },
  },
]

export default routes
