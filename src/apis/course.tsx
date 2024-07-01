// 课程管理模块的API接口
import { request } from '@/utils'
import type { ResType } from '@/types/common'
import type { Course, CourseId, CourseRes } from '@/types/course.tsx'

// 课程管理模块的API 地址
enum CourseAPI {
  // 新增课程
  ADD_COURSE = '/eduservice/course/addCourseInfo',
  // 获取课程详情
  GET_COURSE_INFO = '/eduservice/course/getCourseInfo/',
  // 修改课程信息
  EDIT_COURSE_INFO = '/eduservice/course/editCourseInfo',
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
