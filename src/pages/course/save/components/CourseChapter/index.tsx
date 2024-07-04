import { Button, Steps, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { getChapterListAPI } from '@/apis/chapter.tsx'
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

  return (
    <div className="course-chapter">
      <div className="chapter-header">
        <h2 style={{ textAlign: 'center' }}>新增课程信息</h2>
        <Steps current={currentStep} items={stepsData} />
      </div>
      <Button type="dashed">新增章节</Button>
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
          render={(text, record: ChapterDataType | VideoDataType, index) => (
            <div className="btn-group">
              <Button
                type="primary"
                icon={<EditOutlined />}
                style={{ marginRight: 10 }}
                onClick={() => {
                  console.log(text, record, index)
                }}
              >
                修改
              </Button>
              <Button type="primary" danger icon={<DeleteOutlined />}>
                删除
              </Button>
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
    </div>
  )
}

export default CourseChapter
