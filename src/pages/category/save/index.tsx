import { Button, Form, Input, message } from 'antd'
import './index.scss'
import { AddCategoryField } from '@/types/category.tsx'
import { addCategoryInfoAPI } from '@/apis/category.tsx'
import { useNavigate } from 'react-router-dom'

const CategorySave = () => {
  const { Item } = Form
  // 获取导航对象
  const navigate = useNavigate()

  // 表单提交
  const onHandleSubmit = async (formData: AddCategoryField) => {
    const {
      data: { code },
    } = await addCategoryInfoAPI(formData)
    if (code === 20000) {
      // 提示信息
      message.success('新增课程分类')
      // 跳转网页
      navigate('/category/list')
    }
  }

  return (
    <Form className="save-category-form" onFinish={onHandleSubmit}>
      <Item<AddCategoryField>
        label="一级分类"
        name="oneSubject"
        rules={[{ required: true, message: '请输入一级分类' }]}
      >
        <Input placeholder="请输入一级分类" />
      </Item>
      <Item<AddCategoryField>
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
        <Button type="default" htmlType="reset">
          重置
        </Button>
      </Item>
    </Form>
  )
}

export default CategorySave
