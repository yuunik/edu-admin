import { Button, Form, Input, InputNumber, message, Select } from 'antd'
import './index.scss'
import { Teacher } from '@/types/teacher.tsx'
import { addTeacherAPI } from '@/apis/teacher.tsx'
import { useNavigate } from 'react-router-dom'

const Save = () => {
  const { Item } = Form
  const { Option } = Select
  const { TextArea } = Input
  // 获取导航对象
  const navigate = useNavigate()

  // 新增或修改讲师
  const onSaveOrUpdate = (formData: Teacher) => {
    if (formData.id) {
      // 修改讲师
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
      // 页面刷新
      window.location.reload()
    }
  }

  return (
    <Form className="teacher-saveOrUpdate-container" onFinish={onSaveOrUpdate}>
      <Item<Teacher> label="讲师名称" name="name">
        <Input placeholder="请输入讲师名称" />
      </Item>
      <Item<Teacher> label="讲师排序" name="sort">
        <InputNumber min={0} value={0} controls />
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
