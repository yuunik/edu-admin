import { useEffect, useState } from 'react'
import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Select,
  Table,
  Tag,
} from 'antd'
import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  PlusOutlined,
  RedoOutlined,
  RobotOutlined,
  SearchOutlined,
  TrophyOutlined,
} from '@ant-design/icons'
import {
  deleteTeacherByIdAPI,
  downloadTeacherTemplateAPI,
  getTeacherListByConditionAPI,
} from '@/apis/teacher.tsx'
import { Teacher, TeacherQuery } from '@/types/teacher.tsx'
import { PageParams } from '@/types/common.tsx'
import './index.scss'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { useNavigate } from 'react-router-dom'
import { downloadFile } from '@/utils/download.tsx'

const TeacherList = () => {
  // dayjs 使用中文
  dayjs.locale('zh-cn')

  // 获取路由跳转方法
  const navigate = useNavigate()

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

  // 控制删除讲师确认框的显示
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false)
  // 删除讲师的 id
  const [deleteTeacherId, setDeleteTeacherId] = useState<string>('')

  // 删除讲师的回调
  const onDelete = (teacherId: string) => {
    setDeleteTeacherId(teacherId)
    // 显示删除弹窗
    setDeleteModalVisible(true)
  }

  // 确认删除讲师的回调
  const onConfirmDelete = async () => {
    // 隐藏删除弹窗
    setDeleteModalVisible(false)
    // 调用接口, 删除讲师信息
    const {
      data: { code },
    } = await deleteTeacherByIdAPI(deleteTeacherId)
    if (code === 20000) {
      // 提示信息
      message.success('删除讲师成功')
      // 重新渲染页面
      pageTeacherListByCondition()
    }
  }

  // 下载文件模板
  const onDownloadTemplate = async () => {
    const res = await downloadTeacherTemplateAPI()
    // 下载文件
    downloadFile(res, '讲师新增模板.xlsx')
    // 提示信息
    message.success('下载成功')
  }

  return (
    <div className="teacher-list-container">
      {/* 讲师查询表单 */}
      <Form
        className="teacher-query"
        layout="inline"
        onFinish={onSearch}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
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
        <Form.Item className="btn-group">
          <Button type="primary" icon={<SearchOutlined />} htmlType="submit">
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
          {/* 下载文件模板 */}
          <Button
            type="primary"
            icon={<DownOutlined />}
            onClick={onDownloadTemplate}
          >
            下载文件模板
          </Button>
          {/* 批量导入 */}
          <Button type="primary" danger icon={<PlusOutlined />}>
            批量导入
          </Button>
        </Form.Item>
      </Form>
      {/* 讲师列表 */}
      <Table
        dataSource={teacherList.map((item) => ({ ...item, key: item.id }))}
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
          key="id"
          align="center"
          render={(_, __, index) => index + 1}
        />
        <Column title="姓名" dataIndex="name" key="name" align="center" />
        <Column title="简介" dataIndex="intro" key="intro" align="center" />
        <Column title="资历" dataIndex="career" key="career" align="center" />
        <Column
          title="头衔"
          dataIndex="level"
          key="level"
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
        <Column
          title="添加时间"
          dataIndex="gmtCreate"
          key="gmtCreate"
          align="center"
        />
        <Column title="排序" dataIndex="sort" key="sort" align="center" />
        <Column
          title="操作"
          dataIndex="operations"
          render={(_, { id }: Teacher) => (
            <div className="btn-group">
              <Button
                type="primary"
                icon={<EditOutlined />}
                style={{ marginRight: 10 }}
                onClick={() => navigate(`/teacher/edit/${id}`)}
              >
                修改
              </Button>
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => onDelete(id as string)}
              >
                删除
              </Button>
            </div>
          )}
          align="center"
        />
      </Table>
      {/* 删除讲师确认框 */}
      <Modal
        open={deleteModalVisible}
        title="提示框"
        onOk={onConfirmDelete}
        onCancel={() => setDeleteModalVisible(false)}
      >
        <em>是否是否删除该讲师信息?</em>
      </Modal>
    </div>
  )
}

export default TeacherList
