import { Button, Form, Input, message, Tooltip, Divider, QRCode } from 'antd'
import {
  EyeInvisibleTwoTone,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
  DoubleRightOutlined,
  QqOutlined,
  WechatOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import type { LoginParams } from '@/types/login'
import store from '@/store'
import { fetchLogin } from '@/store/modules/user.tsx'

// 引入样式
import './index.scss'
import Left from '@/assets/images/login_left3.png'
import Logo from '@/assets/images/logo.png'
import { loginByWechat } from '@/apis/login'

const Login = () => {
  // 获取dispatch
  const dispatch = useDispatch<typeof store.dispatch>()
  // 路由跳转
  const navigate = useNavigate()
  // 获取当前路径
  const { pathname } = useLocation()
  // 是否显示微信二维码组件
  const [isShowWechatQRcode, setIsShowWechatQRcode] = useState(false)
  // 微信二维码地址
  const [wechatQRCodeUrl, setWechatQRCodeUrl] = useState('')

  // 用户登录
  const login = async (values: LoginParams) => {
    // 判断是否为手机号登录
    const phoneNumReg = /^1[3456789]\d{9}$/
    let loginParams: LoginParams = {
      password: '',
    }
    if (phoneNumReg.test(values.account as string)) {
      loginParams = {
        mobile: values.account,
        password: values.password,
      }
    } else {
      loginParams = {
        nickname: values.account,
        password: values.password,
      }
    }
    // 触发异步actions, 用户登录
    await dispatch(fetchLogin(loginParams))
    // 页面跳转
    navigate('/home')
    // 提供成功信息
    message.success('登录成功')
  }

  // 微信登录
  const onShowWechatQRcode = async () => {
    // 调用接口, 获取微信登录二维码
    const {
      data: {
        code,
        data: { QRCodeUrl },
      },
    } = await loginByWechat(encodeURIComponent(location.port))
    if (code === 20000) {
      // 保存二维码地址
      setWechatQRCodeUrl(QRCodeUrl)
      // 打开二维码
      setIsShowWechatQRcode(true)
    }
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
          {!isShowWechatQRcode && (
            <Form
              size="large"
              className="content"
              validateTrigger="onBlur"
              onFinish={login}
            >
              <Form.Item<LoginParams>
                label="账号"
                name="account"
                rules={[{ required: true, message: '用户名/手机号不能为空' }]}
              >
                <Input
                  placeholder="请输入用户名/手机号"
                  prefix={<UserOutlined />}
                />
              </Form.Item>
              <Form.Item<LoginParams>
                label="密码"
                name="password"
                rules={[{ required: true, message: '密码不能为空' }]}
              >
                <Input.Password
                  placeholder="请输入密码"
                  prefix={<LockOutlined />}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleTwoTone />
                  }
                />
              </Form.Item>
              <Form.Item className="btn-group">
                <Button
                  type="default"
                  size="large"
                  className="btn-reset"
                  htmlType="reset"
                  shape="round"
                >
                  重置
                </Button>
                <Button
                  type="primary"
                  size="large"
                  className="btn-login"
                  htmlType="submit"
                  shape="round"
                  style={{ marginRight: '20px' }}
                >
                  登录
                </Button>
                <Tooltip
                  placement="right"
                  title={pathname === '/login' ? '注册' : '登录'}
                >
                  <DoubleRightOutlined className="login-register-btn" />
                </Tooltip>
              </Form.Item>
              {/* 第三方登录 */}
              <Divider>第三方登录</Divider>
              <div className="third-part-login">
                <QqOutlined className="qq-icon" />
                <Divider type="vertical" />
                <WechatOutlined
                  className="wechat-icon"
                  onClick={onShowWechatQRcode}
                />
              </div>
            </Form>
          )}
          {isShowWechatQRcode && (
            <div className="wechat-qrcode-container">
              <QRCode value={wechatQRCodeUrl || '-'} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
