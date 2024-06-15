// 课程管理模块相关的API接口

import { request } from '@/utils'
import { ResType } from '@/types/common.tsx'
import { SubjectRes } from '@/types/subject.tsx'

const base_api = '/eduservice/subject'
// API 接口地址枚举
enum SubjectAPI {
  // 获取课程分类信息
  GET_SUBJECT_INFO = `${base_api}/getSubjectList`,
}

// 获取课程分类信息
export const getSubjectInfoAPI = () =>
  request<ResType<SubjectRes>>({
    url: SubjectAPI.GET_SUBJECT_INFO,
    method: 'GET',
  })
