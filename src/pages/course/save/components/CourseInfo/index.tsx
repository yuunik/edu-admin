import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  message,
  Select,
  Steps,
  Upload,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { UploadFile, UploadProps } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
// 引入富文本编辑器的 css
import '@wangeditor/editor/dist/css/style.css'
import { getTeacherListAPI } from '@/apis/teacher.tsx'
import { getSubjectInfoAPI } from '@/apis/subject.tsx'
import {
  addCourseInfoAPI,
  editCourseInfoAPI,
  getCourseInfoAPI,
} from '@/apis/course.tsx'
import type { Course, CourseCover } from '@/types/course.tsx'
import type { Teacher } from '@/types/teacher.tsx'
import type { SubjectInfo } from '@/types/subject.tsx'
import type { ResType } from '@/types/common.tsx'
import './index.scss'

const CourseInfo: React.FC = () => {
  // 当前步骤
  const [currentStep] = useState<number>(0)
  // 导航对象
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

  // 获取Form的子标签
  const { Item } = Form
  // 获取Select的子标签
  const { Option } = Select

  // 修改课程信息
  const editCourseInfo = async (courseInfo: Course) => {
    // 处理其余表单数据
    Object.assign(courseInfo, {
      id: id,
      cover: courseCover,
      description: description,
    })
    const {
      data: { code },
    } = await editCourseInfoAPI(courseInfo)
    if (code === 20000) {
      // 提示信息
      message.success('修改成功')
      // 跳转到课程详情页面
      navigate(`/course/chapter/${id}`)
    }
  }

  // 表单提交的回调
  const onHandleSubmit = async (courseInfo: Course) => {
    // 若有id, 则为编辑课程信息
    if (id) {
      return editCourseInfo(courseInfo)
    }
    // 处理课程封面数据
    const { cover } = courseInfo
    //debugger
    // 回显图片地址
    const coverUrl = (
      (cover![0] as UploadFile<ResType<CourseCover>>)
        .response as ResType<CourseCover>
    ).data.url
    // 课程封面地址格式化
    Object.assign(courseInfo, { cover: coverUrl, description: description })
    // 调用接口, 保存课程信息
    const {
      data: {
        code,
        data: { courseId },
      },
    } = await addCourseInfoAPI(courseInfo)
    if (code === 20000) {
      // 提示信息
      message.success('新增成功')
      // 跳转到课程章节编辑页面
      navigate(`/course/chapter/${courseId}`)
    }
  }

  // 讲师列表
  const [teacherList, setTeacherList] = useState<Teacher[]>([])

  // 获取讲师列表
  const getTeacherList = async () => {
    const {
      data: {
        code,
        data: { teacherList },
      },
    } = await getTeacherListAPI()
    if (code === 20000) {
      // 获取讲师列表
      setTeacherList(teacherList)
    }
  }

  // 课程一级分类列表
  const [oneSubjectList, setOneSubjectList] = useState<SubjectInfo[]>([])

  // 获取课程分类列表
  const getSubjectList = async () => {
    const {
      data: {
        code,
        data: { subjectList },
      },
    } = await getSubjectInfoAPI()
    if (code === 20000) {
      // 获取一级分类列表
      setOneSubjectList(subjectList)
    }
  }

  // 组件挂载完成后获取数据
  useEffect(() => {
    // 获取讲师列表
    getTeacherList()
    // 获取课程分类列表
    getSubjectList()
  }, [])

  // 二级分类列表
  const [twoSubjectList, setTwoSubjectList] = useState<SubjectInfo[]>([])
  // 监听一级分类的变化
  const onHandleSubjectParentIdChange = (id: string) => {
    const result = oneSubjectList.find((oneSubject) => oneSubject.key === id)
    // 获取二级分类列表
    setTwoSubjectList(result!.children as SubjectInfo[])
  }

  // 课程封面
  const [courseCover, setCourseCover] = useState<string>('')

  // 上传封面前的钩子函数
  const onBeforeUpload = (file: File) => {
    const { type, size } = file

    // 限制文件大小
    if (size / 1024 / 1024 > 2) {
      // 提示信息
      message.error('请上传小于2M的图片')
      return false
    }

    // 限制文件格式
    if (type !== 'image/jpeg' && type !== 'image/png' && type !== 'image/gif') {
      // 提示信息
      message.error('请上传jpg/png/gif格式的图片')
      return false
    }
    return true
  }

  // 上传封面前的组件样式
  const uploadButton = (
    <button style={{ border: 'none', background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传课程封面</div>
    </button>
  )

  // 上传封面成功的回调
  const onAvatarChange: UploadProps['onChange'] = (uploadInfo) => {
    // 获取上传状态
    const { file } = uploadInfo
    // 上传成功
    if (file.status === 'done') {
      const {
        response: {
          code,
          data: { url },
        },
      } = file
      if (code === 20000) {
        // 上传成功, 回显图片地址
        setCourseCover(url)
        // 提示信息
        message.success('上传成功')
      }
    }
  }

  // 将 upload 组件的返回值转换成 fileList
  const onGetCoverFromEvent: UploadProps['onChange'] = (e) => {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  // wangEditor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null)

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {}

  // 编辑器编辑
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入课程简介',
  }

  // 课程简介
  const [description, setDescription] = useState('')
  // 课程简介变化的回调
  const onDescriptionChange = (editor: IDomEditor) => {
    // 调用 wangEditor 的 setContents 方法设置内容
    setDescription(editor.getHtml())
  }

  // 获取表单示例
  const [form] = Form.useForm()

  // 获取课程详情
  const getCourseInfo = async (courseId: string) => {
    const {
      data: {
        code,
        data: { courseInfo },
      },
    } = await getCourseInfoAPI(courseId)
    if (code === 20000) {
      // 回显课程封面
      setCourseCover(courseInfo.cover as string)
      // 回显课程简介
      setDescription(courseInfo.description as string)
      // 回显二级分类
      const selectedOneSubject = oneSubjectList.find(
        (oneSubject) => oneSubject.key === courseInfo.subjectParentId,
      )
      setTwoSubjectList(selectedOneSubject?.children as SubjectInfo[])
      // 回显表单数据
      delete courseInfo.cover
      form.setFieldsValue(courseInfo)
    }
  }

  // 获取 courseId 参数
  const { id } = useParams()
  // 组件挂载完成后获取 params 参数
  useEffect(() => {
    if (id) {
      // 回显课程信息
      oneSubjectList.length > 0 && getCourseInfo(id)
    }
  }, [id, oneSubjectList])

  return (
    <div className="course-info">
      <h2 style={{ textAlign: 'center' }}>新增课程信息</h2>
      <Steps current={currentStep} items={stepsData} />
      <Form style={{ marginTop: 20 }} onFinish={onHandleSubmit} form={form}>
        <Item<Course> label="课程标题" name="title">
          <Input placeholder="请输入课程标题" />
        </Item>
        <Item label="课程分类">
          <Item<Course>
            style={{ display: 'inline-block', margin: '0 10px 0 0' }}
            name="subjectParentId"
            labelCol={{ span: 6 }}
          >
            <Select
              placeholder="请选择一级分类"
              onChange={onHandleSubjectParentIdChange}
            >
              {oneSubjectList.map((oneSubject) => (
                <Option value={oneSubject.key} key={oneSubject.key}>
                  {oneSubject.title}
                </Option>
              ))}
            </Select>
          </Item>
          <Item<Course>
            style={{ display: 'inline-block', margin: 0 }}
            name="subjectId"
            labelCol={{ span: 6 }}
          >
            <Select placeholder="请选择二级分类">
              {twoSubjectList.map((twoSubject) => (
                <Option value={twoSubject.key} key={twoSubject.key}>
                  {twoSubject.title}
                </Option>
              ))}
            </Select>
          </Item>
        </Item>
        <Item<Course> label="课程讲师" name="teacherId">
          <Select placeholder="请选择课程讲师">
            {teacherList.map((teacher) => (
              <Option value={teacher.id} key={teacher.id}>
                {teacher.name}
              </Option>
            ))}
          </Select>
        </Item>
        <Item<Course> label="总课时" name="lessonNum">
          <InputNumber min={0} controls style={{ marginLeft: 14 }} />
        </Item>
        <Item<Course> label="课程简介" name="description">
          <div
            style={{
              border: '1px solid rgba(217,217,217)',
              borderRadius: '10px',
              zIndex: 100,
            }}
          >
            <Toolbar
              editor={editor}
              defaultConfig={toolbarConfig}
              mode="default"
              style={{ borderBottom: '1px solid rgba(217,217,217)' }}
            />
            <Editor
              defaultConfig={editorConfig}
              onCreated={setEditor}
              onChange={onDescriptionChange}
              value={description}
              mode="defualt"
              style={{
                height: 300,
                overflowY: 'hidden',
              }}
            />
          </div>
        </Item>
        <Item<Course>
          label="课程封面"
          name="cover"
          valuePropName="fileList"
          getValueFromEvent={onGetCoverFromEvent}
        >
          <Upload
            action="http://localhost:1997/ossservice/file/upload"
            listType="picture-card"
            beforeUpload={onBeforeUpload}
            onChange={onAvatarChange}
            showUploadList={false}
          >
            {courseCover ? (
              <Image src={courseCover} alt="课程封面" />
            ) : (
              uploadButton
            )}
          </Upload>
        </Item>
        <Item<Course> label="课程价格" name="price">
          <InputNumber min={0} controls />
        </Item>
        <Item>
          <Button type="primary" htmlType="submit">
            保存并下一步
          </Button>
        </Item>
      </Form>
    </div>
  )
}

export default CourseInfo
