import {
  DownOutlined,
  FullscreenOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  ReloadOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Breadcrumb, Button, Dropdown, MenuProps, Space } from 'antd'
import UserAvatar from '@/assets/images/user-avatar.jpg'
import './index.scss'

const Tabbar = () => {
  // 面包屑导航栏数据
  const breadcrumbItems = [
    {
      href: '/home',
      title: <HomeOutlined />,
    },
    {
      href: '/teacher/list',
      title: (
        <>
          <UserOutlined />
          <span>讲师模块</span>
        </>
      ),
    },
    {
      href: '/teacher/list',
      title: (
        <>
          <UserOutlined />
          <span>讲师列表</span>
        </>
      ),
    },
  ]

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
      <div className="breadcrumb-container">
        {/* 菜单栏折叠按钮 */}
        <MenuFoldOutlined />
        {/* 面包屑 */}
        <Breadcrumb items={breadcrumbItems} className="website-breadcrumb" />
      </div>
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
