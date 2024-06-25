import { Button, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import type { AddSubjectField } from '@/types/subject.tsx'
import { addSubjectInfoAPI } from '@/apis/subject.tsx'
import './index.scss'

const SubjectSave = () => {
  const { Item } = Form
  // 获取导航对象
  const navigate = useNavigate()

  // 表单提交
  const onHandleSubmit = async (formData: AddSubjectField) => {
    const {
      data: { code },
    } = await addSubjectInfoAPI(formData)
    if (code === 20000) {
      // 提示信息
      message.success('新增课程分类')
      // 跳转网页
      navigate('/subject/list')
    }
  }

  return (
    <Form className="save-subject-form" onFinish={onHandleSubmit}>
      <Item<AddSubjectField>
        label="一级分类"
        name="oneSubject"
        rules={[{ required: true, message: '请输入一级分类' }]}
      >
        <Input placeholder="请输入一级分类" />
      </Item>
      <Item<AddSubjectField>
        label="二级分类"
        name="twoSubject"
        rules={[
          {
            required: true,
            message: '请输入二级分类',
          },
        ]}
      >
        <Input placeholder="请输入二级分类" />
      </Item>
      <Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginRight: '10px' }}
        >
          保存
        </Button>
        <Button type="primary" danger htmlType="reset">
          重置
        </Button>
      </Item>
    </Form>
  )
}

export default SubjectSave
