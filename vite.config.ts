import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createSvgIconsPlugin({
      // svg 图片文件夹位置
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // svg 图片名称
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  resolve: {
    alias: {
      // 相对路径别名配置，使用 @ 代替 src
      '@': path.resolve(__dirname, './src'),
    },
  },
})
