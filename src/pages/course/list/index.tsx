import { useEffect, useState } from 'react'
import { Button, Form, Input, Select, Table, Tag } from 'antd'
import { useNavigate } from 'react-router-dom'
import { DeleteFilled, EditFilled, InfoCircleFilled } from '@ant-design/icons'
import { pageCourseListAPI } from '@/apis/course.tsx'
import type { Course, CourseQueryType } from '@/types/course.tsx'
import './index.scss'

const CourseList = () => {
  // 课程列表
  const [courseList, setCourseList] = useState<Course[]>()

  // 查询课程列表的条件
  const [courseQuery, setCourseQuery] = useState<CourseQueryType>({
    current: 1,
    pageSize: 5,
    title: '',
    status: '',
  })

  // 查询课程列表的总条数
  const [total, setTotal] = useState<number>()

  // 获取课程列表
  const getCourseList = async () => {
    const {
      data: {
        code,
        data: { records, total },
      },
    } = await pageCourseListAPI(courseQuery)
    if (code === 20000) {
      // 设置课程列表
      setCourseList(records)
      // 设置查询条件的总条数
      setTotal(total)
    }
  }

  // 获取 Form 的 Item
  const { Item } = Form
  // 获取 Select 的 Option
  const { Option } = Select
  // 获取 Table 的 Column
  const { Column } = Table

  // 组件挂载后获取课程列表, courseQuery 变化时重新获取课程列表
  useEffect(() => {
    getCourseList()
  }, [courseQuery])

  // 页码改变时重新获取课程列表
  const onPageChange = (current: number, pageSize: number) => {
    setCourseQuery({ ...courseQuery, current, pageSize })
  }

  // 查询课程列表
  const onSearchCourseInfo = (courseInfo: CourseQueryType) => {
    setCourseQuery({ ...courseQuery, ...courseInfo })
  }

  // 重置查询条件
  const onResetCourseInfo = () => {
    setCourseQuery({ current: 1, pageSize: 5, title: '', status: '' })
  }

  // 获取导航对象
  const navigate = useNavigate()

  return (
    <div className="course-list-container">
      {/* 课程查询 */}
      <Form layout="inline" onFinish={onSearchCourseInfo}>
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
          <Button
            type="primary"
            danger
            htmlType="button"
            onClick={onResetCourseInfo}
          >
            重置
          </Button>
        </Item>
      </Form>
      {/* 课程列表表格*/}
      <Table
        dataSource={courseList}
        bordered
        style={{ marginTop: 20 }}
        pagination={{
          current: courseQuery.current,
          pageSize: courseQuery.pageSize,
          total: total,
          hideOnSinglePage: true,
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20'],
          showTotal: (total) => `共 ${total} 条数据`,
          onChange: (current, pageSize) => onPageChange(current, pageSize),
        }}
      >
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
          render={(_, { id }: Course) => (
            <>
              <Button
                type="link"
                icon={<InfoCircleFilled />}
                onClick={() => navigate(`/course/info/${id}`)}
              >
                编辑课程基本信息
              </Button>
              <Button
                type="link"
                icon={<EditFilled />}
                onClick={() => navigate(`/course/chapter/${id}`)}
              >
                编辑课程大纲
              </Button>
              <Button type="link" icon={<DeleteFilled />}>
                删除课程
              </Button>
            </>
          )}
        />
      </Table>
    </div>
  )
}

export default CourseList
