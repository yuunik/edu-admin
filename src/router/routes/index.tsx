// 引入一级路由
import Home from '@/pages/home'
import Login from '@/pages/login'
import Error from '@/pages/error'
import Any from '@/pages/any'

// 引入布局组件
import Layout from '@/layout'

// 引入前置路由守卫组件
import AuthRouter from '@/components/AuthRouer'

// 路由表
const routes = [
  {
    path: '/',
    element: (
      <AuthRouter>
        <Layout />
      </AuthRouter>
    ),
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/error',
    element: <Error />,
  },
  {
    path: '/:pathMatch*',
    element: <Any />,
  },
]

export default routes
