// 课程管理模块相关的数据类型

// 课程分类信息的数据类型
export type SubjectInfo = {
  /* 一级分类 id*/
  key: string
  /* 一级分类名称 */
  title: string
  /* 二级分类列表 */
  children?: SubjectInfo[]
}

// 获取课程分类信息接口的返回数据类型
export type SubjectRes = {
  /* 课程分类信息列表 */
  subjectList: SubjectInfo[]
}

// 新增课程分类表单的数据类型
export type AddSubjectField = {
  /* 一级分类名称 */
  oneSubject: string
  /* 二级分类名称 */
  twoSubject: string
}
