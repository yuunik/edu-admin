import { useEffect, useState } from 'react'
import { Button, DatePicker, Form, Input, Select, Table, Tag } from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  RedoOutlined,
  RobotOutlined,
  SearchOutlined,
  TrophyOutlined,
} from '@ant-design/icons'
import { getTeacherListByConditionAPI } from '@/apis/teacher.tsx'
import { Teacher, TeacherQuery } from '@/types/teacher.tsx'
import { PageParams } from '@/types/common.tsx'
import './index.scss'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

const List = () => {
  // dayjs 使用中文
  dayjs.locale('zh-cn')

  // 讲师列表
  const [teacherList, setTeacherList] = useState<Teacher[]>([])

  // 分页数据
  const [pageData, setPageData] = useState<PageParams>({
    current: 1,
    pageSize: 3,
  })

  // 讲师查询条件
  const [teacherQuery, setTeacherQuery] = useState<TeacherQuery>({
    name: '',
    level: 0,
    begin: '',
    end: '',
  })

  // 总页数
  const [total, setTotal] = useState<number>(0)

  // 根据条件分页查询讲师列表
  const pageTeacherListByCondition = async () => {
    const {
      data: {
        code,
        data: { records, total: totalCount },
      },
    } = await getTeacherListByConditionAPI({
      ...pageData,
      teacherQuery,
    })
    if (code === 20000) {
      // 更新讲师列表
      setTeacherList(records)
      // 更新总页数
      setTotal(totalCount)
    }
  }

  // pageData、 teacherQuery 变化时重新分页查询
  useEffect(() => {
    pageTeacherListByCondition()
  }, [pageData, teacherQuery])

  // 分页器翻页的回调
  const onPageChange = (pageNumber: number, pageSize: number) => {
    // 更新当前页
    setPageData({
      ...pageData,
      current: pageNumber,
      pageSize: pageSize,
    })
  }

  // 获取表格列
  const { Column } = Table
  const { Option } = Select

  // 讲师查询表单提交的回调
  const onSearch = (values: TeacherQuery) => {
    const formData: TeacherQuery = { ...teacherQuery }
    // 收集表单数据
    if (values.name) {
      formData.name = values.name
    }
    if (values.level) {
      formData.level = values.level
    }
    if (values.begin) {
      formData.begin = dayjs(values.begin).format('YYYY-MM-DD HH:mm:ss')
    }
    if (values.end) {
      formData.end = dayjs(values.end).format('YYYY-MM-DD HH:mm:ss')
    }
    // 更新查询条件
    setTeacherQuery({
      ...teacherQuery,
      ...formData,
    })
  }

  // 重置查询条件的回调
  const onReset = () => {
    // 重置查询条件
    setTeacherQuery({
      name: '',
      level: 0,
      begin: '',
      end: '',
    })
  }

  return (
    <div className="teacher-list-container">
      {/* 讲师查询表单 */}
      <Form className="teacher-query" layout="inline" onFinish={onSearch}>
        <Form.Item<TeacherQuery> label="讲师姓名" name="name">
          <Input placeholder="请输入讲师姓名" />
        </Form.Item>
        <Form.Item<TeacherQuery> label="讲师级别" name="level">
          <Select placeholder="请选择讲师头衔">
            <Option value={1}>高级讲师</Option>
            <Option value={2}>首席讲师</Option>
          </Select>
        </Form.Item>
        <Form.Item<TeacherQuery>
          label="添加时间"
          name="begin"
          style={{ marginRight: 0 }}
        >
          <DatePicker />
        </Form.Item>
        <span style={{ margin: '0 3px' }}> - </span>
        <Form.Item<TeacherQuery> name="end">
          <DatePicker />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            style={{ marginRight: 10 }}
            htmlType="submit"
          >
            查询
          </Button>
          <Button
            type="default"
            icon={<RedoOutlined />}
            htmlType="reset"
            onClick={onReset}
          >
            重置
          </Button>
        </Form.Item>
      </Form>
      {/* 讲师列表 */}
      <Table
        dataSource={teacherList}
        bordered
        pagination={{
          current: pageData.current,
          pageSize: pageData.pageSize,
          total: total,
          onChange: onPageChange,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: [3, 5, 7, 9],
          showTotal: (total) => `共 ${total} 条数据`,
          style: { marginRight: 20 },
        }}
        className="teacher-list"
      >
        <Column
          title="序号"
          dataIndex="id"
          align="center"
          render={(_, __, index) => index + 1}
        />
        <Column title="姓名" dataIndex="name" align="center" />
        <Column title="简介" dataIndex="intro" align="center" />
        <Column title="资历" dataIndex="career" align="center" />
        <Column
          title="头衔"
          dataIndex="level"
          align="center"
          render={(_, { level }: Teacher) => (
            <Tag
              color={level === 1 ? 'success' : 'processing'}
              icon={level === 1 ? <RobotOutlined /> : <TrophyOutlined />}
              className="level-tag"
            >
              <em className="level-text">
                {level === 1 ? '一级讲师' : '首席讲师'}
              </em>
            </Tag>
          )}
        />
        <Column title="添加时间" dataIndex="gmtCreate" align="center" />
        <Column title="排序" dataIndex="sort" key="sort" align="center" />
        <Column
          title="操作"
          dataIndex="operations"
          render={() => (
            <>
              <Button
                type="primary"
                icon={<EditOutlined />}
                style={{ marginRight: 10 }}
              >
                修改
              </Button>
              <Button type="primary" danger icon={<DeleteOutlined />}>
                删除
              </Button>
            </>
          )}
          align="center"
        />
      </Table>
    </div>
  )
}

export default List
