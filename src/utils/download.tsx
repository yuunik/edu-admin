// 下载工具类

import { AxiosResponse } from 'axios'

// 下载 excel 文件
export const downloadFile = (response: AxiosResponse, filename: string) => {
  // 创建 Blob 对象, 将响应数据转化为 excel 文件
  const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' })
  // 创建 URL 对象, 并将其作为 a 标签的 href 属性值, 下载 excel 文件
  const downloadUrl = URL.createObjectURL(blob)
  // 创建 a 标签
  const aElement = document.createElement('a')
  // 设置 a 标签的 download 属性值, 并将其作为 excel 文件的名称
  aElement.href = downloadUrl
  aElement.download = filename
  // 模拟点击动作
  aElement.click()
  // 下载文件完成, 移除 a 标签
  aElement.remove()
  // 释放 URL 对象
  URL.revokeObjectURL(downloadUrl)
}
