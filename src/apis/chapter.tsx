// 课程章节接口
import { request } from '@/utils'
import type { ResType } from '@/types/common.tsx'
import type {
  ChapterListType,
  ChapterResType,
  ChapterType,
} from '@/types/chapter.tsx'

// 基础路径
const baseURL = '/eduservice/chapter'

// 请求接口地址管理
enum ChapterAPI {
  // 获取课程章节列表
  GET_CHAPTER_LIST = `${baseURL}/getChapterList/`,
  // 新增课程章节
  ADD_CHAPTER = `${baseURL}/addChapter/`,
  // 获取课程章节详情
  GET_CHAPTER_DETAIL = `${baseURL}/getChapterInfo/`,
  // 修改课程章节
  EDIT_CHAPTER = `${baseURL}/editChapter/`,
}

/**
 * 获取课程章节列表
 * @param data 课程 id
 */
export const getChapterListAPI = (data: string) =>
  request<ResType<ChapterListType>>({
    url: ChapterAPI.GET_CHAPTER_LIST + data,
    method: 'GET',
  })

/**
 * 新增课程章节
 * @param data 新增的课程章节数据
 */
export const addChapterAPI = (data: ChapterType) =>
  request<ResType<object>>({
    url: ChapterAPI.ADD_CHAPTER,
    method: 'POST',
    data,
  })

/**
 * 获取课程章节详情
 * @param data 课程章节 id
 */
export const getChapterAPI = (data: string) =>
  request<ResType<ChapterResType>>({
    url: ChapterAPI.GET_CHAPTER_DETAIL + data,
    method: 'GET',
  })

/**
 * 修改课程章节
 * @param data 修改的课程章节数据
 */
export const editChapterAPI = (data: ChapterType) =>
  request<ResType<object>>({
    url: ChapterAPI.EDIT_CHAPTER,
    method: 'POST',
    data,
  })
