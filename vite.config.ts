import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 相对路径别名配置，使用 @ 代替 src
      '@': path.resolve(__dirname, './src'),
    },
  },
})
