import { Button, Input, Tree } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { getSubjectInfoAPI } from '@/apis/subject.tsx'
import type { SubjectInfo } from '@/types/subject.tsx'
import './index.scss'

const SubjectList = () => {
  // 课程分类
  const [subjectData, setSubjectData] = useState<SubjectInfo[]>([])
  // 搜索栏关键字
  const [keyword, setKeyword] = useState('')

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
    // 获取搜索栏关键字
    const {
      target: { value },
    } = e
    setKeyword(value)
  }

  // 根据关键字检索数据
  const searchData = (keyword: string) => {
    const result = subjectData.filter((subject) => {
      if (subject.title.toLowerCase().includes(keyword.toLowerCase())) {
        // 记录
        return true
      }
      if (subject.children) {
        const result = subject.children.filter((child) =>
          child.title.toLowerCase().includes(keyword.toLowerCase()),
        )
        if (result.length !== 0) {
          return true
        }
      }
    })
    return result
  }

  return (
    <div className="subject-list-container">
      <div className="subject-form">
        {/* 搜索栏*/}
        <Input
          placeholder="搜索课程分类"
          className="subject-search"
          onChange={onSearchChange}
        />
        <div className="btn-group">
          <Button type="primary">下载文件模板</Button>
          <Button type="primary" danger>
            批量导入课程分类
          </Button>
        </div>
      </div>
      {/* 树形控件 */}
      <Tree
        treeData={keyword !== '' ? searchData(keyword) : subjectData}
        defaultSelectedKeys={['1178214681118568449']}
        switcherIcon={<DownOutlined />}
      />
    </div>
  )
}

export default SubjectList
