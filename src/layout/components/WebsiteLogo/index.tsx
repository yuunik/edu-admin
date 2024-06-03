import Logo from '@/assets/images/logo.png'
// 引入样式
import './index.scss'

const WebsiteLogo = () => {
  return (
    <div className="website-info">
      <img src={Logo} alt="logo" className="logo" />
      <strong className="name">Edu-Admin</strong>
    </div>
  )
}

export default WebsiteLogo
