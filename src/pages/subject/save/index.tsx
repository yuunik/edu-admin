import { Button, Form, Input } from 'antd'
import './index.scss'

const Save = () => {
  const { Item } = Form
  return (
    <Form className="save-subject-form">
      <Item label="一级分类">
        <Input placeholder="请输入一级分类" />
      </Item>
      <Item label="二级分类">
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

export default Save
