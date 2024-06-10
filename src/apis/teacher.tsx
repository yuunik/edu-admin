/**
 * 讲师模块相关接口
 */
import { request } from '@/utils'
import type { PageRes, ResType } from '@/types/common.tsx'
import type { InfoType, Teacher, TeacherParams } from '@/types/teacher.tsx'

// 讲师模块基础地址
const base_url = '/eduservice/teacher'

// 请求地址管理
enum TeacherApi {
  // 分页查询讲师列表
  PAGE_TEACHER_LIST = `${base_url}/pageTeacherList/`,
  // 根据条件分页查询讲师列表
  PAGE_TEACHER_LIST_BY_CONDITION = `${base_url}/pageTeacherListByCondition/`,
  // 根据讲师 id 删除讲师
  DELETE_TEACHER_BY_ID = `${base_url}/deleteTeacherById/`,
  // 新增讲师
  ADD_TEACHER = `${base_url}/addTeacher`,
  // 获取讲师详情
  GET_TEACHER_INFO = `${base_url}/getTeacherInfoById/`,
  // 修改讲师信息
  UPDATE_TEACHER_INFO = `${base_url}/updateTeacherInfoById`,
  // 下载新增讲师模板
  DOWNLOAD_TEACHER_TEMPLATE = `${base_url}/exportTemplate`,
}

// 分页查询讲师列表
export const pageTeacherListAPI = ({ current, pageSize }: TeacherParams) =>
  request<ResType<PageRes<Teacher[]>>>({
    url: TeacherApi.PAGE_TEACHER_LIST + `${current}/${pageSize}`,
    method: 'GET',
  })

// 根据条件分页查询讲师列表
export const getTeacherListByConditionAPI = ({
  current,
  pageSize,
  teacherQuery,
}: TeacherParams) =>
  request<ResType<PageRes<Teacher[]>>>({
    url: TeacherApi.PAGE_TEACHER_LIST_BY_CONDITION + `${current}/${pageSize}`,
    method: 'POST',
    // data 会以 json 格式传输数据
    data: teacherQuery,
  })

// 根据讲师 id 删除讲师
export const deleteTeacherByIdAPI = (teacherId: string) =>
  request<ResType<object>>({
    url: TeacherApi.DELETE_TEACHER_BY_ID + `${teacherId}`,
    method: 'DELETE',
  })

// 新增讲师
export const addTeacherAPI = (data: Teacher) =>
  request<ResType<object>>({
    url: TeacherApi.ADD_TEACHER,
    method: 'POST',
    data,
  })

// 获取讲师详情
export const getTeacherInfoByIdAPI = (teacherId: string) =>
  request<ResType<InfoType>>({
    url: TeacherApi.GET_TEACHER_INFO + `${teacherId}`,
    method: 'GET',
  })

// 修改讲师信息
export const updateTeacherInfoAPI = (data: Teacher) =>
  request<ResType<object>>({
    url: TeacherApi.UPDATE_TEACHER_INFO,
    method: 'POST',
    data,
  })

// 下载新增讲师模板
export const downloadTeacherTemplateAPI = () =>
  request({
    url: TeacherApi.DOWNLOAD_TEACHER_TEMPLATE,
    method: 'GET',
    responseType: 'blob',
  })
