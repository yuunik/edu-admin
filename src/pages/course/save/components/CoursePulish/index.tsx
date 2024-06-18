import { Button, Steps } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.scss'

const CoursePublish: React.FC = () => {
  // 当前步骤
  const [currentStep] = useState<number>(2)
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
    // 调整至编辑课程章节页
    navigate('/course/chapter/1234')
  }

  // 发布文章的回调
  const onHandleNext = () => {
    // 跳转至课程列表页
    navigate('/course/list')
  }

  return (
    <div className="course-publish">
      <h2 style={{ textAlign: 'center' }}>新增课程信息</h2>
      <Steps current={currentStep} items={stepsData} />
      <div className="btn-group">
        <Button type="primary" onClick={onHandlePrevious}>
          上一步
        </Button>
        <Button onClick={onHandleNext}>发布</Button>
      </div>
    </div>
  )
}

export default CoursePublish
