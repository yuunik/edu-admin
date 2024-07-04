import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Popconfirm,
  Steps,
  Table,
} from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import {
  addChapterAPI,
  editChapterAPI,
  getChapterAPI,
  getChapterListAPI,
  removeChapterAPI,
} from '@/apis/chapter.tsx'
import type { ChapterDataType, VideoDataType } from '@/types/chapter.tsx'
import './index.scss'

const CourseChapter: React.FC = () => {
  // 当前步骤
  const [currentStep] = useState(1)
  // 获取导航对象
  const navigate = useNavigate()

  // 步骤数据
  const stepsData = [
    {
      title: '编辑课程信息',
      content: '课程信息',
    },
    {
      title: '编辑课程章节',
      content: '课程章节',
    },
    {
      title: '编辑课程资源',
      content: '课程资源',
    },
  ]

  // 上一步的回调
  const onHandlePrevious = () => {
    navigate(`/course/info/${id}`)
  }

  // 下一步的回调
  const onHandleNext = () => {
    navigate('/course/publish/1234')
  }

  // 课程章节列表信息
  const [chapterList, setChapterList] = useState<ChapterDataType[]>([])

  // 获取课程章节列表信息
  const getChapterListInfo = async (courseId: string) => {
    const {
      data: {
        code,
        data: { chapterList },
      },
    } = await getChapterListAPI(courseId)
    if (code === 20000) {
      // 设置课程章节列表信息
      setChapterList(chapterList)
    }
  }

  // 获取路径中的课程 id 参数
  const { id } = useParams()

  // 页面加载完成后获取课程章节列表信息
  useEffect(() => {
    id && getChapterListInfo(id)
  }, [])

  // 获取 Table 的 Column 组件
  const { Column } = Table
  // 获取 Form 的 Item 组件
  const { Item } = Form

  // 课程章节对话框是否可见
  const [modalChapterVisible, setModelChapterVisible] = useState<boolean>(false)

  // 打开课程章节对话框
  const openChapterModal = () => {
    // 重置表单
    form.resetFields()
    // 打开模态框
    setModelChapterVisible(true)
  }

  // Form 的实例
  const [form] = Form.useForm()

  // 新增课程章节
  const addChapter = async () => {
    // 处理课程信息数据
    const {
      data: { code },
    } = await addChapterAPI({
      ...form.getFieldsValue(),
      courseId: id,
    })
    if (code === 20000) {
      // 提示信息
      message.success('新增成功')
      // 刷新课程章节列表信息
      getChapterListInfo(id as string)
      // 关闭模态框
      setModelChapterVisible(false)
    }
  }

  // 修改或新增课程章节
  const onHandleSubmit = () => {
    if (!chapterId) {
      // 新增课程章节
      addChapter()
    } else {
      // 修改课程章节
      editChapter()
    }
  }

  // 修改的课程章节 id
  const [chapterId, setChapterId] = useState<string>('')

  // 获取课程章节信息
  const getChapterInfo = async (chapterId: string) => {
    const {
      data: {
        code,
        data: { eduChapter },
      },
    } = await getChapterAPI(chapterId)
    if (code === 20000) {
      // 回显课程章节信息
      form.setFieldsValue(eduChapter)
      // 获取课程章节 id
      setChapterId(chapterId)
    }
  }

  // 编辑课程章节模式
  const [editChapterMode, setEditChapterMode] = useState<boolean>(false)
  // 打开修改课程章节对话框
  const onOpenEditChapterModal = (chapterId: string) => {
    // 切换编辑课程章节模式
    setEditChapterMode(true)
    // 获取课程章节信息
    getChapterInfo(chapterId)
    // 打开弹窗
    setModelChapterVisible(true)
  }

  // 编辑课程章节
  const editChapter = async () => {
    const {
      data: { code },
    } = await editChapterAPI({ ...form.getFieldsValue(), id: chapterId })
    if (code === 20000) {
      // 提示信息
      message.success('修改成功')
      // 清除所修改的课程章节 id
      setChapterId('')
      // 关闭编辑课程章节模式
      setEditChapterMode(false)
      // 关闭课程章节对话框
      setModelChapterVisible(false)
      // 刷新课程章节列表信息
      getChapterListInfo(id as string)
    }
  }

  // 删除课程章节
  const onDeleteChapter = async (chapterId: string) => {
    const {
      data: { code },
    } = await removeChapterAPI(chapterId)
    if (code === 20000) {
      // 提示信息
      message.success('删除成功')
      // 刷新课程章节列表信息
      getChapterListInfo(id as string)
    }
  }

  return (
    <div className="course-chapter">
      <div className="chapter-header">
        <h2 style={{ textAlign: 'center' }}>新增课程信息</h2>
        <Steps current={currentStep} items={stepsData} />
      </div>
      <Button type="dashed" onClick={openChapterModal}>
        新增章节
      </Button>
      <Table
        dataSource={chapterList}
        bordered
        pagination={false}
        className="chapter-content"
      >
        <Column title="章节名称" dataIndex="title" key="title" />
        <Column
          title="操作"
          dataIndex="operations"
          width={400}
          render={(_, record: ChapterDataType | VideoDataType) => (
            <div className="btn-group">
              <Button
                type="primary"
                icon={<EditOutlined />}
                style={{ marginRight: 10 }}
                onClick={() => onOpenEditChapterModal(record.key)}
              >
                修改
              </Button>
              <Popconfirm
                title="删除提示"
                description="确认删除该章节吗?"
                okText="确认"
                cancelText="取消"
                onConfirm={() => onDeleteChapter(record.key)}
              >
                <Button type="primary" danger icon={<DeleteOutlined />}>
                  删除
                </Button>
              </Popconfirm>
              <Button
                type="default"
                style={{
                  visibility: (record as ChapterDataType).children
                    ? 'visible'
                    : 'hidden',
                }}
              >
                新增小节
              </Button>
            </div>
          )}
          align="center"
        />
      </Table>
      <div className="btn-group">
        <Button type="primary" onClickCapture={onHandlePrevious}>
          上一步
        </Button>
        <Button type="default" onClick={onHandleNext}>
          下一步
        </Button>
      </div>
      <Modal
        title={editChapterMode ? '修改课程章节' : '新增课程章节'}
        open={modalChapterVisible}
        onCancel={() => setModelChapterVisible(false)}
        onOk={onHandleSubmit}
        centered
        destroyOnClose
      >
        <Form
          initialValues={{ sort: 1 }}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          form={form}
        >
          <Item label="章节名称" name="title">
            <Input placeholder="请输入章节名称" />
          </Item>
          <Item label="排序" name="sort">
            <InputNumber min={0} />
          </Item>
        </Form>
      </Modal>
    </div>
  )
}

export default CourseChapter
