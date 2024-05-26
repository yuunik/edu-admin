import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// 引入 svg 插件
import 'virtual:svg-icons-register'
// 引入全局样式
import '@/styles/index.scss'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
