import { Avatar, Button, Dropdown, MenuProps, Space } from 'antd'
import {
  DownOutlined,
  FullscreenOutlined,
  ReloadOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { useSelector } from 'react-redux'
import store from '@/store'

const Settings = () => {
  // 获取状态管理库的用户信息
  const { name, avatar } = useSelector(
    (state: ReturnType<typeof store.getState>) => state.user.userInfo,
  )

  // 用户信息数据
  const userInfoItems: MenuProps['items'] = [
    {
      key: 'logout',
      danger: true,
      label: '退出登录',
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
