import { Input, Tree } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { getSubjectInfoAPI } from '@/apis/subject.tsx'
import './index.scss'
import { SubjectInfo } from '@/types/subject.tsx'

const List = () => {
  // 课程分类
  const [subjectData, setSubjectData] = useState<SubjectInfo[]>([])
  // 搜索关键字
  const [keyword, setKeyword] = useState<string>()

  // 获取树形控件数据
  const getSubjectData = async () => {
    const {
      data: {
        code,
        data: { subjectList },
      },
    } = await getSubjectInfoAPI()
    if (code === 20000) {
      // 设置树形控件数据
      setSubjectData(subjectList)
    }
  }

  // 组件挂载时获取数据
  useEffect(() => {
    // 获取数据
    getSubjectData()
  }, [])

  // 搜索栏 onChange 事件
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 获取搜索关键字
    setKeyword(e.target.value)
  }
  return (
    <div className="subject-list-container">
      {/* 搜索栏*/}
      <Input
        placeholder="搜索课程分类"
        className="subject-search"
        onChange={onSearchChange}
      />
      {/* 树形控件 */}
      <Tree
        treeData={subjectData}
        defaultSelectedKeys={['1178214681118568449']}
        switcherIcon={<DownOutlined />}
      />
    </div>
  )
}

export default List
