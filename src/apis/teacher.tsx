/**
 * 讲师模块相关接口
 */
import { request } from '@/utils'
import type { PageRes, ResType } from '@/types/common.tsx'
import type { Teacher, TeacherParams } from '@/types/teacher.tsx'

// 讲师模块基础地址
const base_url = '/eduservice/teacher'

// 请求地址管理
enum TeacherApi {
  // 分页查询讲师列表
  PAGE_TEACHER_LIST = `${base_url}/pageTeacherList/`,
  // 根据条件分页查询讲师列表
  PAGE_TEACHER_LIST_BY_CONDITION = `${base_url}/pageTeacherListByCondition/`,
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
