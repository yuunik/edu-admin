// 课程章节相关数据类型声明
import type { TreeDataType } from '@/types/common.tsx'

// 课程章节数据类型
export type ChapterDataType = TreeDataType & {
  children?: VideoDataType[]
}

// 课程小节数据类型
export type VideoDataType = TreeDataType

// 返回的课程章节数据类型
export type ChapterListType = {
  /* 课程章节列表 */
  chapterList: ChapterDataType[]
}
