// 引入一级路由
import Home from '@/pages/home'
import Login from '@/pages/login'
import Error from '@/pages/error'
import Any from '@/pages/any'

// 路由表
const routes = [
  {
    path: '/',
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
