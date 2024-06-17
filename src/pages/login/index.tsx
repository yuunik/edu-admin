import { Button, Form, Input, message } from 'antd'
import {
  EyeInvisibleTwoTone,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { fetchLogin } from '@/store/modules/user.tsx'
import { useNavigate } from 'react-router-dom'
import store from '@/store'

// 引入样式
import './index.scss'
import Left from '@/assets/images/login_left3.png'
import Logo from '@/assets/images/logo.png'

// 登录表单字段的数据类型声明
type LoginFieldType = {
  username: string
  password: string
}

const Login = () => {
  const dispatch = useDispatch<typeof store.dispatch>()
  const navigate = useNavigate()

  // 用户登录
  const login = async (values: LoginFieldType) => {
    // 触发异步actions, 用户登录
    await dispatch(fetchLogin(values))
    // 页面跳转
    navigate('/home')
    // 提供成功信息
    message.success('登录成功')
  }

  return (
    <div className="login">
      <div className="container">
        <div className="left">
          <img src={Left} alt="登录页欢迎图" className="login-pic" />
        </div>
        <div className="login-form">
          <div className="header">
            <img src={Logo} alt="图标" className="logo" />
            {/* 系统标题 */}
            <strong className="system-title">Edu-Admin</strong>
          </div>
          <Form
            size="large"
            className="content"
            validateTrigger="onBlur"
            onFinish={login}
          >
            <Form.Item<LoginFieldType>
              name="username"
              rules={[
                { required: true, message: '用户名不能为空' },
                {
                  pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]{6,12}$/,
                  message: '用户名需为 6 - 12 位的非空字符',
                },
              ]}
            >
              <Input placeholder="请输入用户名" prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item<LoginFieldType>
              name="password"
              rules={[
                { required: true, message: '密码不能为空' },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{8,16}$/,
                  message: '密码需为 8 - 16 位的非空字符',
                },
              ]}
            >
              <Input.Password
                placeholder="请输入密码"
                prefix={<LockOutlined />}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleTwoTone />
                }
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="default"
                size="large"
                className="btn-reset"
                htmlType="reset"
              >
                重置
              </Button>
              <Button
                type="primary"
                size="large"
                className="btn-login"
                htmlType="submit"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login
