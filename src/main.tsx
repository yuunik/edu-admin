import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
// 引入路由器
import router from '@/router'
// 引入 svg 插件
import 'virtual:svg-icons-register'
// 引入全局样式
import '@/styles/index.scss'
// import './index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
