/**
 * 讲师模式相关类型定义
 */

// 讲师列表请求参数类型
export type TeacherParams = {
  /* 当前页 */
  current: number
  /* 每页条数 */
  pageSize: number
  /* 讲师查询条件 */
  teacherQuery?: TeacherQuery
}

// 讲师查询条件类型
export type TeacherQuery = {
  /* 讲师姓名 */
  name: string
  /* 讲师头衔 */
  level: number
  /* 开始时间 */
  begin: string
  /* 结束时间 */
  end: string
}

// 讲师数据类型
export type Teacher = {
  /* 讲师 id */
  id: string
  /* 讲师姓名 */
  name: string
  /* 讲师简介 */
  intro: string
  /* 讲师资历 */
  career: string
  /* 讲师头衔 */
  level: number
  /* 讲师头像 */
  avatar: string
  /* 排序 */
  sort: number
  /* 逻辑删除 */
  isDeleted: boolean
  /* 创建时间 */
  gmtCreate: string
  /* 更新时间 */
  gmtModified: string
}

// 获取讲师详情接口返回的数据类型
export type InfoType = {
  /* 讲师信息 */
  eduTeacher: Teacher
}
