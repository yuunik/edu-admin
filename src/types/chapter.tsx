// 课程章节相关数据类型声明
import type { TreeDataType } from '@/types/common.tsx'

// 课程章节树形数据类型
export type ChapterDataType = TreeDataType & {
  children?: VideoDataType[]
}

// 课程小节树形数据类型
export type VideoDataType = TreeDataType

// 返回的课程章节数据类型
export type ChapterListType = {
  /* 课程章节列表 */
  chapterList: ChapterDataType[]
}

// 课程章节类型
export type ChapterType = {
  /* 课程章节 id */
  id?: string
  /* 属于课程 id*/
  courseId: string
  /* 课程章节名称 */
  title: string
  /* 课程章节排序 */
  sort: number
}

// 回显的课程章节数据类型
export type ChapterResType = {
  /* 课程章节详情*/
  eduChapter: ChapterType
}
