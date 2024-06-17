// 课程管理模块相关的API接口

import { request } from '@/utils'
import type { ResType } from '@/types/common.tsx'
import type { AddCategoryField, SubjectRes } from '@/types/category.tsx'

// 课程管理模块API地址
const base_api = '/eduservice/subject'

// API 接口地址枚举
enum CategoryAPI {
  // 获取课程分类信息
  GET_CATEGORY_INFO = `${base_api}/getCategoryList`,
  // 新增课程分类信息
  ADD_CATEGORY_INFO = `${base_api}/addCategory`,
}

// 获取课程分类信息
export const getCategoryInfoAPI = () =>
  request<ResType<SubjectRes>>({
    url: CategoryAPI.GET_CATEGORY_INFO,
    method: 'GET',
  })

// 新增课程分类信息
export const addCategoryInfoAPI = (data: AddCategoryField) =>
  request<ResType<object>>({
    url: CategoryAPI.ADD_CATEGORY_INFO,
    method: 'POST',
    data,
  })
