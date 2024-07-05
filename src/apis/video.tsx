// 课程小节接口模块
import { request } from '@/utils'
import type { ResType } from '@/types/common.tsx'
import type { VideoResType, VideoType } from '@/types/video.tsx'

// 请求基地址
const baseUrl = '/eduservice/video'

// 请求接口地址
enum VideoApi {
  // 新增课程小节
  ADD_VIDEO = `${baseUrl}/addVideo`,
  // 获取课程小节详情
  GET_VIDEO_INFO = `${baseUrl}/getVideoInfo/`,
  // 编辑课程小节
  EDIT_VIDEO = `${baseUrl}/editVideoInfo`,
}

/**
 * 新增课程小节
 * @param data 新增课程小节所需数据
 */
export const addVideoAPI = (data: VideoType) =>
  request<ResType<object>>({
    url: VideoApi.ADD_VIDEO,
    method: 'POST',
    data,
  })

/**
 * 获取课程小节详情
 * @param data 课程小节ID
 */
export const getVideoInfoAPI = (data: string) =>
  request<ResType<VideoResType>>({
    url: VideoApi.GET_VIDEO_INFO + data,
    method: 'GET',
  })

/**
 * 编辑课程小节
 * @param data 编辑课程小节所需数据
 */
export const editVideoAPI = (data: VideoType) =>
  request<ResType<object>>({
    url: VideoApi.EDIT_VIDEO,
    method: 'POST',
    data,
  })
