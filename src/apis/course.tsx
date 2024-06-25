// 课程管理模块的API接口
import { request } from '@/utils'
import type { ResType } from '@/types/common'
import type { Course, CourseId } from '@/types/course.tsx'

// 课程管理模块的API 地址
enum CourseAPI {
  // 新增课程
  ADD_COURSE = '/eduservice/course/addCourseInfo',
}

// 新增课程
export const addCourseInfoAPI = (data: Course) =>
  request<ResType<CourseId>>({
    url: CourseAPI.ADD_COURSE,
    method: 'POST',
    data,
  })
