import { Button, Steps } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
    navigate('/course/info/1234')
  }

  // 下一步的回调
  const onHandleNext = () => {
    navigate('/course/publish/1234')
  }

  return (
    <div className="course-chapter">
      <h2 style={{ textAlign: 'center' }}>新增课程信息</h2>
      <Steps current={currentStep} items={stepsData} />
      <div className="btn-group">
        <Button type="primary" onClickCapture={onHandlePrevious}>
          上一步
        </Button>
        <Button onClick={onHandleNext}>下一步</Button>
      </div>
    </div>
  )
}

export default CourseChapter
