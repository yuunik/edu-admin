import type { RouteObject } from 'react-router'
import {
  BookOutlined,
  ClusterOutlined,
  HomeOutlined,
  InsertRowAboveOutlined,
  SignatureOutlined,
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
import TeacherList from '@/pages/teacher/list'
import TeacherSave from '@/pages/teacher/save'
import CategoryList from '@/pages/category/list'
import CategorySave from '@/pages/category/save'
// 引入布局组件
import Layout from '@/layout'
// 引入前置路由守卫组件
import AuthRouter from '@/components/AuthRouer'

// 路由类型
type RouteType = RouteObject & {
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

// 路由表
const routes: RouteType[] = [
  {
    path: '/',
    element: (
      <AuthRouter>
        <Layout />
      </AuthRouter>
    ),
    children: [
      {
        path: '/home',
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
    path: '/:pathMatch/*',
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
        element: <TeacherList />,
        meta: {
          visible: true,
          label: '讲师列表',
          icon: <UnorderedListOutlined />,
        },
      },
      {
        path: '/teacher/save',
        element: <TeacherSave />,
        meta: {
          visible: true,
          label: '新增讲师',
          icon: <UserAddOutlined />,
        },
      },
      {
        path: '/teacher/edit/:id',
        element: <TeacherSave />,
        meta: {
          visible: false,
          label: '编辑讲师',
          icon: <SignatureOutlined />,
        },
      },
    ],
    meta: {
      visible: true,
      label: '讲师管理',
      icon: <UserOutlined />,
    },
  },
  {
    path: '/subject',
    element: <Layout />,
    children: [
      {
        path: '/subject/list',
        element: <CategoryList />,
        meta: {
          visible: true,
          label: '课程分类列表',
          icon: <InsertRowAboveOutlined />,
        },
      },
      {
        path: '/subject/save',
        element: <CategorySave />,
        meta: {
          visible: true,
          label: '新增课程分类',
          icon: <ClusterOutlined />,
        },
      },
    ],
    meta: {
      visible: true,
      label: '课程分类管理',
      icon: <BookOutlined />,
    },
  },
]

export default routes
