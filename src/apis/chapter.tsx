// 课程章节接口
import { request } from '@/utils'
import type { ResType } from '@/types/common.tsx'
import type { ChapterListType, ChapterType } from '@/types/chapter.tsx'

// 基础路径
const baseURL = '/eduservice/chapter'

// 请求接口地址管理
enum ChapterAPI {
  // 获取课程章节列表
  GET_CHAPTER_LIST = `${baseURL}/getChapterList/`,
  // 新增课程章节
  ADD_CHAPTER = `${baseURL}/addChapter/`,
}

// 获取课程张列表
// data: courseId
export const getChapterListAPI = (data: string) =>
  request<ResType<ChapterListType>>({
    url: ChapterAPI.GET_CHAPTER_LIST + data,
    method: 'GET',
  })

// 新增课程章节
export const addChapterAPI = (data: ChapterType) =>
  request<ResType<object>>({
    url: ChapterAPI.ADD_CHAPTER,
    method: 'POST',
    data,
  })
