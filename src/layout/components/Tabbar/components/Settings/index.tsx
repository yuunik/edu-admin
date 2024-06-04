import {
  Avatar,
  Button,
  Dropdown,
  MenuProps,
  message,
  Popconfirm,
  Space,
} from 'antd'
import {
  DownOutlined,
  FullscreenOutlined,
  ReloadOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/store'
import './index.scss'
import { clearInfo } from '@/store/modules/user.tsx'
import { useNavigate } from 'react-router-dom'
import { UserInfo } from '@/types/login.tsx'

const Settings = () => {
  // 获取状态管理库的用户信息
  const { name, avatar } = useSelector(
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

  return (
    <div className="base-setting-container">
      {/* 刷新按钮 */}
      <Button
        type="default"
        shape="circle"
        icon={<ReloadOutlined />}
        size="small"
      />
      {/* 全屏按钮 */}
      <Button
        type="default"
        shape="circle"
        icon={<FullscreenOutlined />}
        size="small"
      />
      {/* 其他设置按钮 */}
      <Button
        type="default"
        shape="circle"
        size="small"
        icon={<SettingOutlined />}
      />
      {/* 用户信息栏 */}
      <div className="user-info-container">
        {/* 用户头像 */}
        <Avatar size="small" src={avatar} alt="用户头像" className="avatar" />
        {/* 退出登录栏 */}
        <Dropdown menu={{ items: userInfoItems }}>
          <Space>
            {name}
            <DownOutlined />
          </Space>
        </Dropdown>
      </div>
    </div>
  )
}

export default Settings
