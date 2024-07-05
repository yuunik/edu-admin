// 课程小节相关的数据类型定义

// 课程小节的类型
export type VideoType = {
  /* 课程小节 id*/
  id?: string
  /* 所属课程 id */
  courseId: string
  /* 所属课程章节 id*/
  chapterId: string
  /* 课程小节标题 */
  title: string
  /* 排序*/
  sort: number
}
