import { useEffect, useState } from 'react'
import { Button, Form, Input, Select, Table, Tag } from 'antd'
import { getCourseListAPI } from '@/apis/course.tsx'
import { Course } from '@/types/course.tsx'
import './index.scss'

const CourseList = () => {
  // 课程列表
  const [courseList, setCourseList] = useState<Course[]>()

  // 获取课程列表
  const getCourseList = async () => {
    const {
      data: {
        code,
        data: { courseList },
      },
    } = await getCourseListAPI()
    if (code === 20000) {
      // 设置课程列表
      setCourseList(courseList)
    }
  }

  // 获取 Form 的 Item
  const { Item } = Form
  // 获取 Select 的 Option
  const { Option } = Select
  // 获取 Table 的 Column
  const { Column } = Table

  // 组件挂载后获取课程列表
  useEffect(() => {
    getCourseList()
  }, [])
  return (
    <div className="course-list-container">
      {/* 课程查询 */}
      <Form layout="inline">
        <Item<Course> name="title" label="课程名称">
          <Input placeholder="请输入课程名称" />
        </Item>
        <Item<Course> name="status" label="课程状态">
          <Select placeholder="请选择课程状态">
            <Option value="Draft">未发布</Option>
            <Option value="Normal">已发布</Option>
          </Select>
        </Item>
        <Item>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
          <Button type="primary" danger htmlType="reset">
            重置
          </Button>
        </Item>
      </Form>
      {/* 课程列表表格*/}
      <Table dataSource={courseList} bordered style={{ marginTop: 20 }}>
        <Column title="序号" key="id" render={(_, __, index) => index + 1} />
        <Column title="课程名称" dataIndex="title" key="title" />
        <Column
          title="课程状态"
          dataIndex="status"
          key="status"
          render={(_, { status }: Course) => (
            <Tag color={status === 'Draft' ? 'volcano' : 'green'}>
              {status === 'Draft' ? '未发布' : '已发布'}
            </Tag>
          )}
        />
        <Column title="课时数" dataIndex="lessonNum" key="lessonNum" />
        <Column title="浏览人数" dataIndex="viewCount" key="viewCount" />
        <Column title="创建时间" dataIndex="gmtCreate" key="gmtCreate" />
        <Column
          title="操作"
          key="operation"
          render={() => (
            <>
              <Button type="link">编辑课程基本信息</Button>
              <Button type="link">编辑课程大纲</Button>
              <Button type="link">删除课程</Button>
            </>
          )}
        />
      </Table>
    </div>
  )
}

export default CourseList
