// 课程小节接口模块
import { request } from '@/utils'
import type { ResType } from '@/types/common.tsx'
import type { VideoType } from '@/types/video.tsx'

// 请求基地址
const baseUrl = '/eduservice/video'

// 请求接口地址
enum VideoApi {
  // 新增课程小节
  ADD_VIDEO = `${baseUrl}/addVideo`,
}

/**
 * 新增课程小节
 * @param data 新增课程小节所需数据type
 */
export const addVideoAPI = (data: VideoType) =>
  request<ResType<object>>({
    url: VideoApi.ADD_VIDEO,
    method: 'POST',
    data,
  })
