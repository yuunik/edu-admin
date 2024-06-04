import {
  DownOutlined,
  FullscreenOutlined,
  ReloadOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Dropdown, MenuProps, Space } from 'antd'
import TabbarBreadcrumb from './components/TabbarBreadcrumb'
import UserAvatar from '@/assets/images/user-avatar.jpg'
import './index.scss'

const Tabbar = () => {
  // 用户信息数据
  const userInfoItems: MenuProps['items'] = [
    {
      key: 'logout',
      danger: true,
      label: '退出登录',
    },
  ]

  return (
    <nav className="tar-bar">
      {/* 面包屑导航栏 */}
      <TabbarBreadcrumb />
      {/* 基础设置栏 */}
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
          <Avatar
            size="small"
            src={UserAvatar}
            alt="用户头像"
            className="avatar"
          />
          {/* 退出登录栏 */}
          <Dropdown menu={{ items: userInfoItems }}>
            <Space>
              Chorria
              <DownOutlined />
            </Space>
          </Dropdown>
        </div>
      </div>
    </nav>
  )
}

export default Tabbar
