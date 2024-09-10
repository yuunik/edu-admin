import {
  Avatar,
  Button,
  Dropdown,
  MenuProps,
  message,
  Popconfirm,
  Space,
  Tooltip,
} from 'antd'
import {
  DownOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  ReloadOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { clearInfo } from '@/store/modules/user.tsx'
import { useNavigate } from 'react-router-dom'
import store from '@/store'
import type { UserInfo } from '@/types/login.tsx'
import './index.scss'

const Settings = () => {
  // 获取状态管理库的用户信息
  const { avatar, nickname } = useSelector(
    (state: ReturnType<typeof store.getState>) =>
      state.user.userInfo as UserInfo,
  )

  // 获取触发器
  const dispatch = useDispatch()

  // 获取导航对象
  const navigate = useNavigate()

  // 退出登录事件
  const onLogout = async () => {
    // 清除用户信息
    dispatch(clearInfo())
    // 提示信息
    message.success('退出登录成功')
    // 跳转至登录页
    navigate('/login')
  }
  // 用户信息数据
  const userInfoItems: MenuProps['items'] = [
    {
      key: 'logout',
      danger: true,
      label: (
        <Popconfirm title="确认退出登录吗？" onConfirm={onLogout}>
          <em>退出登录</em>
        </Popconfirm>
      ),
    },
  ]

  // 全屏模式
  const [isFullScreen, setIsFullScreen] = useState(false)

  // 全屏显示事件
  const onHandleFullScreen = () => {
    // 获取全屏对象
    const fullscreenElement = document.fullscreenElement
    if (!fullscreenElement) {
      // 进入全屏
      setIsFullScreen(true)
      document.documentElement.requestFullscreen()
    } else {
      // 退出全屏
      setIsFullScreen(false)
      document.exitFullscreen()
    }
  }

  return (
    <div className="base-setting-container">
      {/* 刷新按钮 */}
      <Tooltip title="刷新页面">
        <Button
          type="default"
          shape="circle"
          icon={<ReloadOutlined />}
          size="small"
        />
      </Tooltip>
      {/* 全屏按钮 */}
      <Tooltip title={isFullScreen ? '退出全屏' : '全屏显示'}>
        <Button
          type="default"
          shape="circle"
          icon={
            isFullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />
          }
          size="small"
          onClick={onHandleFullScreen}
        />
      </Tooltip>
      {/* 其他设置按钮 */}
      <Tooltip title="设置">
        <Button
          type="default"
          shape="circle"
          size="small"
          icon={<SettingOutlined />}
        />
      </Tooltip>

      {/* 用户信息栏 */}
      <div className="user-info-container">
        {/* 用户头像 */}
        <Avatar size="small" src={avatar} alt="用户头像" className="avatar" />
        {/* 退出登录栏 */}
        <Dropdown menu={{ items: userInfoItems }}>
          <Space>
            {nickname}
            <DownOutlined style={{ fontSize: 10 }} />
          </Space>
        </Dropdown>
      </div>
    </div>
  )
}

export default Settings
