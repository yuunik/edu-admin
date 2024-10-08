import { Avatar, Button, Card, Divider, Image, List, Steps } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCoursePublishInfoAPI } from '@/apis/course.tsx'
import type { CoursePublishType } from '@/types/course.tsx'
import './index.scss'

const CoursePublish: React.FC = () => {
  // 当前步骤
  const [currentStep] = useState<number>(2)
  // 获取导航对象
  const navigate = useNavigate()
  // 获取路径中 id 参数
  const { id } = useParams()

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
    navigate(`/course/chapter/${id}`)
  }

  // 发布文章的回调
  const onHandleNext = () => {
    // 跳转至课程列表页
    navigate('/course/list')
  }

  // 发布课程信息
  const [coursePublishInfo, setCoursePublishInfo] =
    useState<CoursePublishType>()

  // 获取发布课程详情
  const getCoursePublishInfo = async () => {
    const {
      data: {
        code,
        data: { coursePublishInfo },
      },
    } = await getCoursePublishInfoAPI(id as string)
    if (code === 20000) {
      // 保存发布课程信息
      setCoursePublishInfo(coursePublishInfo)
    }
  }

  // 页面加载完成后获取发布课程详情
  useEffect(() => {
    // 获取发布课程详情
    id && getCoursePublishInfo()
  }, [id])

  // 获取 Card 的 Meta 数据
  const { Meta } = Card

  return (
    <div className="course-publish">
      <div className="publish-header">
        <h2 style={{ textAlign: 'center' }}>新增课程信息</h2>
        <Steps current={currentStep} items={stepsData} />
      </div>
      <Card
        className="course-card"
        bordered
        cover={
          <Image
            alt="课程封面"
            src={coursePublishInfo?.cover}
            preview={false}
          />
        }
      >
        <Divider orientation="center">
          <h3>讲师信息</h3>
        </Divider>
        <Meta
          avatar={
            <Avatar
              alt="讲师头像"
              src={coursePublishInfo?.teacherAvatar}
              size={64}
            />
          }
          title={coursePublishInfo?.teacherName}
          description={coursePublishInfo?.teacherIntro}
        />
        <Divider orientation="center">
          <h3>课程信息</h3>
        </Divider>
        <Meta
          avatar={
            <Avatar alt="讲师头像" size={64} style={{ visibility: 'hidden' }} />
          }
          title={coursePublishInfo?.title}
          description={
            <List
              size="small"
              bordered
              dataSource={[
                `课程总课时: ${coursePublishInfo?.lessonNum} 节`,
                `所属一级分类：${coursePublishInfo?.oneSubject}`,
                `所属二级分类：${coursePublishInfo?.twoSubject}`,
                `课程售价: ${coursePublishInfo?.price} 元`,
              ]}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          }
        />
      </Card>
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
