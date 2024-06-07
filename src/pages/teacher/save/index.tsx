import { Button, Form, Input, InputNumber, message, Select } from 'antd'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  addTeacherAPI,
  getTeacherInfoByIdAPI,
  updateTeacherInfoAPI,
} from '@/apis/teacher.tsx'
import './index.scss'
import { Teacher } from '@/types/teacher.tsx'
import useRouteInfo from '@/hooks/useRouteInfo.tsx'

const Save = () => {
  const { Item } = Form
  const { Option } = Select
  const { TextArea } = Input
  // 获取导航对象
  const navigate = useNavigate()
  // 获取当前路径信息
  const location = useLocation()
  // 获取路由信息
  /**
   * paramValue: 路由参数值
   * editMode: 是否为编辑模式
   */
  const { paramValue, editMode } = useRouteInfo(location.pathname)

  // 新增或修改讲师
  const onSaveOrUpdate = (formData: Teacher) => {
    // 若有 id 数据, 则存入表单数据中
    editMode && (formData.id = paramValue as string)
    if (formData.id) {
      // 修改讲师
      updateTeacherInfoById(formData)
    } else {
      // 新增讲师
      onAddTeacher(formData)
    }
  }

  // 新增讲师
  const onAddTeacher = async (formData: Teacher) => {
    const {
      data: { code },
    } = await addTeacherAPI(formData)
    if (code === 20000) {
      // 提示信息
      message.success('新增讲师成功')
      // 路由跳转
      navigate('/teacher/list')
    }
  }

  const [form] = Form.useForm()
  // 获取讲师详情
  const getTeacherInfo = async (teacherId: string) => {
    // 调用接口给, 回显数据
    const {
      data: { code, data },
    } = await getTeacherInfoByIdAPI(teacherId)
    if (code === 20000) {
      // 回显数据
      form.setFieldsValue(data.teacher)
    }
  }

  // 组件挂载后, 若有 id 则回显数据
  useEffect(() => {
    // 清空表单数据
    form.resetFields()
    // 若有 id 则回显数据
    editMode && getTeacherInfo(paramValue as string)
  }, [editMode, form])

  // 编辑讲师
  const updateTeacherInfoById = async (formData: Teacher) => {
    const {
      data: { code },
    } = await updateTeacherInfoAPI(formData)
    if (code === 20000) {
      // 提示信息
      message.success('修改讲师成功')
      // 路由跳转
      navigate('/teacher/list')
    }
  }

  return (
    <Form
      className="teacher-saveOrUpdate-container"
      onFinish={onSaveOrUpdate}
      form={form}
    >
      <Item<Teacher> label="讲师名称" name="name">
        <Input placeholder="请输入讲师名称" />
      </Item>
      <Item<Teacher> label="讲师排序" name="sort" initialValue={0}>
        <InputNumber min={0} controls />
      </Item>
      <Item<Teacher> label="讲师头衔" name="level">
        <Select placeholder="请选择讲师头衔">
          <Option value={1}>高级讲师</Option>
          <Option value={2}>首席讲师</Option>
        </Select>
      </Item>
      <Item<Teacher> label="讲师资历" name="career">
        <Input placeholder="请输入讲师资历" />
      </Item>
      <Item<Teacher> label="讲师简介" name="intro">
        <TextArea rows={6} placeholder="请输入讲师简介" />
      </Item>
      <Item>
        <Button type="primary" htmlType="submit">
          保存
        </Button>
      </Item>
    </Form>
  )
}

export default Save
