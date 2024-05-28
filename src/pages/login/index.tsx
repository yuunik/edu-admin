import Left from '@/assets/images/login_left3.png'
import Logo from '@/assets/images/logo.png'
import { Button, Form, Input } from 'antd'
import {
  EyeInvisibleTwoTone,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons'

// 引入样式
import './index.scss'

const Login = () => {
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
          <Form size="large" className="content">
            <Form.Item>
              <Input placeholder="请输入用户名" prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item>
              <Input.Password
                placeholder="请输入密码"
                prefix={<LockOutlined />}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleTwoTone />
                }
              />
            </Form.Item>
            <Form.Item>
              <Button type="default" size="large" className="btn-reset">
                重置
              </Button>
              <Button type="primary" size="large" className="btn-login">
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
