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
  // 删除课程小节
  REMOVE_VIDEO = `${baseUrl}/removeVideo/`,
  // 删除课程视频
  REMOVE_VOD_VIDEO = `/vodservice/video/deleteVodVideo/`,
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

/**
 * 删除课程小节
 * @param data 课程小节ID
 */
export const removeVideoAPI = (data: string) =>
  request<ResType<object>>({
    url: VideoApi.REMOVE_VIDEO + data,
    method: 'DELETE',
  })

/**
 * 删除课程视频
 * @param data 课程Vod视频ID
 */
export const removeVodVideoAPI = (data: string) =>
  request<ResType<object>>({
    url: VideoApi.REMOVE_VOD_VIDEO + data,
    method: 'DELETE',
  })
