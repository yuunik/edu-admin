// 课程模块的类型定义
import type { UploadFile } from 'antd'

// 课程类型
export type Course = {
  /* 课程ID */
  id?: string
  /* 讲师ID */
  teacherId: string
  /* 课程所属二级分类ID */
  subjectId: string
  /* 课程所属一级分类ID */
  subjectParentId: string
  /* 课程标题 */
  title: string
  /* 课程售价*/
  price: number
  /* 课程总数 */
  lessonNum: number
  /* 课程封面图 */
  cover: string | UploadFile[]
  /* 课程购买人数 */
  buyCount: number
  /* 课程浏览人数 */
  viewCount: number
  /* 课程简介 */
  description: string
}

// 返回的课程id类型
export type CourseId = {
  courseId: string
}

// 封面数据类型
export type CourseCover = {
  url: string
}
