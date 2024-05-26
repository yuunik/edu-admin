// 对外部传入的参数进行类型显示
import React from 'react'

interface Props {
  // svg 宽度
  width?: string
  // svg 高度
  height?: string
  // svg 前缀名
  prefix?: string
  // svg 名字
  name: string
  // svg 颜色
  color?: string
}

// 自定义 svg 组件
const SvgIcon: React.FC<Props> = ({
  width = '16px',
  height = '16px',
  prefix = '#icon-',
  name,
  color = '',
}) => {
  return (
    <div className="svg-icon">
      <svg style={{ width, height }}>
        <use xlinkHref={`${prefix}${name}`} fill={color}></use>
      </svg>
    </div>
  )
}

export default SvgIcon
