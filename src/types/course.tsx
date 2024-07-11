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
  cover?: string | UploadFile[]
  /* 课程购买人数 */
  buyCount: number
  /* 课程浏览人数 */
  viewCount: number
  /* 课程发布状态 */
  status?: string
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

// 返回的课程详情类型
export type CourseRes = {
  courseInfo: Course
}

// 发布课程的类型
export type CoursePublishType = {
  /* 课程 id*/
  id: string
  /* 课程标题 */
  title: string
  /* 课程封面 */
  cover: string
  /* 课程总课时数*/
  lessonNum: number
  /* 课程简介 */
  description: string
  /* 课程所属的一级分类标题 */
  oneSubject: string
  /* 课程所属的二级分类标题 */
  twoSubject: string
  /* 讲师姓名 */
  teacherName: string
  /* 讲师头像 */
  teacherAvatar: string
  /* 讲师简介*/
  teacherIntro: string
  /* 课程售价 */
  price: string
}

// 返回的发布课程信息类型
export type CoursePublishResType = {
  /* 发布课程信息 */
  coursePublishInfo: CoursePublishType
}

// 返回的课程列表类型
export type CourseListResType = {
  /* 课程列表 */
  records: Course[]
  /* 总页数 */
  total: number
  /* 当前页码 */
  current: number
  /* 每页条数 */
  pageSize: number
}

// 课程搜索参数类型
export type CourseQueryType = {
  /* 课程标题 */
  title: string
  /* 课程所属一级分类ID */
  status: string
  /* 当前页 */
  current: number
  /* 每页条数 */
  pageSize: number
}
