// 课程管理模块的API接口
import { request } from '@/utils'
import type { ResType } from '@/types/common'
import type {
  Course,
  CourseId,
  CourseListResType,
  CoursePublishResType,
  CourseRes,
} from '@/types/course.tsx'

// 课程管理模块的API 地址
enum CourseAPI {
  // 新增课程
  ADD_COURSE = '/eduservice/course/addCourseInfo',
  // 获取课程详情
  GET_COURSE_INFO = '/eduservice/course/getCourseInfo/',
  // 修改课程信息
  EDIT_COURSE_INFO = '/eduservice/course/editCourseInfo',
  // 获取发布课程信息
  GET_COURSE_PUBLISH_INFO = '/eduservice/course/getCoursePublishInfo/',
  // 获取课程列表
  GET_COURSE_LIST = '/eduservice/course/getCourseList',
}

// 新增课程
export const addCourseInfoAPI = (data: Course) =>
  request<ResType<CourseId>>({
    url: CourseAPI.ADD_COURSE,
    method: 'POST',
    data,
  })

// 获取课程详情
export const getCourseInfoAPI = (data: string) =>
  request<ResType<CourseRes>>({
    url: CourseAPI.GET_COURSE_INFO + data,
    method: 'GET',
  })

// 修改课程信息
export const editCourseInfoAPI = (data: Course) =>
  request<ResType<object>>({
    url: CourseAPI.EDIT_COURSE_INFO,
    method: 'POST',
    data,
  })

/**
 * 获取发布课程信息
 * @param data 课程ID
 */
export const getCoursePublishInfoAPI = (data: string) =>
  request<ResType<CoursePublishResType>>({
    url: CourseAPI.GET_COURSE_PUBLISH_INFO + data,
    method: 'GET',
  })

/**
 * 获取课程列表
 */
export const getCourseListAPI = () =>
  request<ResType<CourseListResType>>({
    url: CourseAPI.GET_COURSE_LIST,
    method: 'GET',
  })
