import {
  BarsOutlined,
  BookOutlined,
  ClusterOutlined,
  DesktopOutlined,
  FolderAddOutlined,
  HomeOutlined,
  InfoOutlined,
  InsertRowAboveOutlined,
  SignatureOutlined,
  UnorderedListOutlined,
  UploadOutlined,
  UserAddOutlined,
  UserOutlined,
  YoutubeOutlined,
  PieChartOutlined,
  PlusOutlined,
  LineChartOutlined,
} from '@ant-design/icons'
import type { RouteObject } from 'react-router'
import type { ReactElement } from 'react'
// 引入一级路由
import Home from '@/pages/home'
import Login from '@/pages/login'
import Error from '@/pages/error'
import Any from '@/pages/any'
// 引入二级路由
import TeacherList from '@/pages/teacher/list'
import TeacherSave from '@/pages/teacher/save'
import SubjectList from '@/pages/subject/list'
import SubjectSave from '@/pages/subject/save'
import CourseList from '@/pages/course/list'
import StatisticsCreate from '@/pages/statistics/create'
import StatisticsChart from '@/pages/statistics/chart'
// 引入布局组件
import Layout from '@/layout'
// 引入前置路由守卫组件
import AuthRouter from '@/components/AuthRouter'
import CourseInfo from '@/pages/course/save/components/CourseInfo'
import CourseChapter from '@/pages/course/save/components/CourseChapter'
import CoursePublish from '@/pages/course/save/components/CoursePublish'

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
        element: <SubjectList />,
        meta: {
          visible: true,
          label: '课程分类列表',
          icon: <InsertRowAboveOutlined />,
        },
      },
      {
        path: '/subject/save',
        element: <SubjectSave />,
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
  {
    path: '/course',
    element: <Layout />,
    children: [
      {
        path: '/course/list',
        element: <CourseList />,
        meta: {
          visible: true,
          label: '课程列表',
          icon: <BarsOutlined />,
        },
      },
      {
        path: '/course/save',
        element: <CourseInfo />,
        meta: {
          visible: true,
          label: '新增课程',
          icon: <FolderAddOutlined />,
        },
      },
      {
        path: '/course/info/:id',
        element: <CourseInfo />,
        meta: {
          visible: false,
          label: '编辑课程基本信息',
          icon: <InfoOutlined />,
        },
      },
      {
        path: '/course/chapter/:id',
        element: <CourseChapter />,
        meta: {
          visible: false,
          label: '编辑课程章节',
          icon: <YoutubeOutlined />,
        },
      },
      {
        path: '/course/publish/:id',
        element: <CoursePublish />,
        meta: {
          visible: false,
          label: '发布课程',
          icon: <UploadOutlined />,
        },
      },
    ],
    meta: {
      visible: true,
      label: '课程管理',
      icon: <DesktopOutlined />,
    },
  },
  {
    path: '/statistics',
    element: <Layout />,
    children: [
      {
        path: '/statistics/create',
        element: <StatisticsCreate />,
        meta: {
          visible: true,
          label: '生成数据',
          icon: <PlusOutlined />,
        },
      },
      {
        path: '/statistics/chart',
        element: <StatisticsChart />,
        meta: {
          visible: true,
          label: '统计图表',
          icon: <LineChartOutlined />,
        },
      },
    ],
    meta: {
      visible: true,
      label: '统计与分析',
      icon: <PieChartOutlined />,
    },
  },
]

export default routes
