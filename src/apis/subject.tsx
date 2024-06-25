// 课程管理模块相关的API接口

import { request } from '@/utils'
import type { ResType } from '@/types/common.tsx'
import type { AddSubjectField, SubjectRes } from '@/types/subject.tsx'

// 课程管理模块API地址
const base_api = '/eduservice/subject'

// API 接口地址枚举
enum SubjectAPI {
  // 获取课程分类信息
  GET_SUBJECT_INFO = `${base_api}/getSubjectList`,
  // 新增课程分类信息
  ADD_SUBJECT_INFO = `${base_api}/addSubject`,
  // 下载课程分类模板
  DOWNLOAD_SUBJECT_TEMPLATE = `${base_api}/exportTemplate`,
  // 导入课程分类模板
  IMPORT_SUBJECT_TEMPLATE = `${base_api}/import`,
}

// 获取课程分类信息
export const getSubjectInfoAPI = () =>
  request<ResType<SubjectRes>>({
    url: SubjectAPI.GET_SUBJECT_INFO,
    method: 'GET',
  })

// 新增课程分类信息
export const addSubjectInfoAPI = (data: AddSubjectField) =>
  request<ResType<object>>({
    url: SubjectAPI.ADD_SUBJECT_INFO,
    method: 'POST',
    data,
  })

// 下载课程分类模板
export const downloadSubjectTemplateAPI = () =>
  request({
    url: SubjectAPI.DOWNLOAD_SUBJECT_TEMPLATE,
    method: 'GET',
  })

// 导入课程分类模板
export const importSubjectTemplateAPI = (data: FormData) =>
  request<ResType<object>>({
    url: SubjectAPI.IMPORT_SUBJECT_TEMPLATE,
    method: 'POST',
    data,
  })
