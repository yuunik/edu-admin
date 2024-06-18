import { Button, Steps } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.scss'

const CourseInfo: React.FC = () => {
  // 当前步骤
  const [currentStep] = useState<number>(0)
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

  // 下一步的回调
  const onHandleNext = () => {
    navigate('/course/chapter/123123')
  }

  return (
    <div className="course-info">
      <h2 style={{ textAlign: 'center' }}>新增课程信息</h2>
      <Steps current={currentStep} items={stepsData} />
      <Button onClick={onHandleNext} style={{ marginTop: '20px' }}>
        下一步
      </Button>
    </div>
  )
}

export default CourseInfo
