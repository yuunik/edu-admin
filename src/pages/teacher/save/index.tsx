import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  message,
  Select,
  Upload,
} from 'antd'
import { useEffect, useState } from 'react'
import type { GetProp, UploadProps, UploadFile } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import {
  addTeacherAPI,
  getTeacherInfoByIdAPI,
  updateTeacherInfoAPI,
} from '@/apis/teacher.tsx'
import useRouteInfo from '@/hooks/useRouteInfo.tsx'
import type { Teacher, UploadAvatarType } from '@/types/teacher.tsx'
import type { ResType } from '@/types/common.tsx'
import './index.scss'

const TeacherSave = () => {
  const { Item } = Form
  const { Option } = Select
  const { TextArea } = Input
  // 获取导航对象
  const navigate = useNavigate()
  // 获取当前路径信息
  const location = useLocation()
  // 获取路由信息
  /**
   * paramValue: 路由参数值
   * editMode: 是否为编辑模式
   */
  const { paramValue, editMode } = useRouteInfo(location.pathname)

  // 新增或修改讲师
  const onSaveOrUpdate = (formData: Teacher) => {
    // 若有 id 数据, 则存入表单数据中
    editMode && (formData.id = paramValue as string)
    if (formData.id) {
      // 修改讲师
      updateTeacherInfoById(formData)
    } else {
      // 处理头像数据
      Object.assign(formData, {
        avatar: (
          (formData.avatar![0] as UploadFile<ResType<UploadAvatarType>>)
            .response as ResType<UploadAvatarType>
        ).data.url,
      })
      // 新增讲师
      onAddTeacher(formData)
    }
  }

  // 新增讲师
  const onAddTeacher = async (formData: Teacher) => {
    const {
      data: { code },
    } = await addTeacherAPI(formData)
    if (code === 20000) {
      // 提示信息
      message.success('新增讲师成功')
      // 路由跳转
      navigate('/teacher/list')
    }
  }

  // 表单实例
  const [form] = Form.useForm()
  // 获取讲师详情
  const getTeacherInfo = async (teacherId: string) => {
    // 调用接口给, 回显数据
    const {
      data: {
        code,
        data: { teacher },
      },
    } = await getTeacherInfoByIdAPI(teacherId)
    if (code === 20000) {
      // 回显头像
      setAvatarUrl(teacher.avatar as string)
      // 清除 avatar 字段
      delete teacher.avatar
      // 回显数据
      form.setFieldsValue(teacher)
    }
  }

  // 组件挂载后, 若有 id 则回显数据
  useEffect(() => {
    // 清空表单数据
    form.resetFields()
    // 清空回显头像
    setAvatarUrl('')
    // 若有 id 则回显数据
    editMode && getTeacherInfo(paramValue as string)
  }, [editMode, form])

  // 编辑讲师
  const updateTeacherInfoById = async (formData: Teacher) => {
    const {
      data: { code },
    } = await updateTeacherInfoAPI(formData)
    if (code === 20000) {
      // 提示信息
      message.success('修改讲师成功')
      // 路由跳转
      navigate('/teacher/list')
    }
  }

  // 头像文件地址
  const [avatarUrl, setAvatarUrl] = useState('')

  // 上传中状态
  const [loading, setLoading] = useState(false)

  // 上传组件
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传头像</div>
    </button>
  )

  // 文件类型
  type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]
  // 上传头像前的预处理
  const onBeforeUpload = (file: FileType) => {
    const { size, type } = file
    // 限制文件大小
    if (size > 4 * 1024 * 1024) {
      // 提示信息
      message.error('文件大小不能超过 4M')
      return false
    }
    // 限制文件类型
    if (type !== 'image/jpeg' && type !== 'image/png' && type !== 'image/gif') {
      // 提示信息
      message.error('请上传 jpg/png/gif 格式的图片')
      return false
    }
    return true
  }

  // 上传头像
  const onUploadChange: UploadProps['onChange'] = (info) => {
    const { file } = info
    // 上传响应状态校验
    // 上传中
    if (file.status === 'uploading') {
      // 打开上传中状态
      setLoading(true)
      return
    }
    // 上传成功
    if (file.status === 'done') {
      const {
        response: {
          code,
          data: { url },
        },
      } = file
      if (code === 20000) {
        // 关闭上传中状态
        setLoading(false)
        // 上传成功, 回显图片地址
        setAvatarUrl(url)
        // 提示信息
        message.success('上传头像成功')
      }
    }
  }

  // 表单字段 avatar 获取值
  const onGetValueFromUploadFile: UploadProps['onChange'] = (e) => {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  return (
    <Form
      onFinish={onSaveOrUpdate}
      form={form}
      className="teacher-saveOrUpdate-container"
    >
      <Item<Teacher> label="讲师名称" name="name">
        <Input placeholder="请输入讲师名称" />
      </Item>
      <Item<Teacher> label="讲师排序" name="sort" initialValue={0}>
        <InputNumber min={0} controls />
      </Item>
      <Item<Teacher> label="讲师头衔" name="level">
        <Select placeholder="请选择讲师头衔">
          <Option value={1}>高级讲师</Option>
          <Option value={2}>首席讲师</Option>
        </Select>
      </Item>
      <Item<Teacher>
        label="讲师头像"
        name="avatar"
        valuePropName="fileList"
        getValueFromEvent={onGetValueFromUploadFile}
      >
        <Upload
          listType="picture-card"
          className="avatar-uploader"
          action="http://localhost:1997/ossservice/file/upload"
          showUploadList={false}
          beforeUpload={onBeforeUpload}
          onChange={onUploadChange}
        >
          {avatarUrl ? <Image src={avatarUrl} alt="讲师头像" /> : uploadButton}
        </Upload>
      </Item>
      <Item<Teacher> label="讲师资历" name="career">
        <Input placeholder="请输入讲师资历" />
      </Item>
      <Item<Teacher> label="讲师简介" name="intro">
        <TextArea rows={6} placeholder="请输入讲师简介" />
      </Item>
      <Item>
        <Button type="primary" htmlType="submit">
          保存
        </Button>
      </Item>
    </Form>
  )
}

export default TeacherSave
