import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
// ConfigProvider 用于全局配置国际化文案。
import { ConfigProvider } from 'antd'
// 引入路由器
import router from '@/router'
// 引入状态管理库
import store from '@/store'
// 引入 svg 插件
import 'virtual:svg-icons-register'
// 引入全局样式
import '@/styles/index.scss'
// 引入 ant-design 汉化包
import Chinese from 'antd/locale/zh_CN'
// for date-picker i18n
import 'dayjs/locale/zh-cn'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider locale={Chinese}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>,
)
