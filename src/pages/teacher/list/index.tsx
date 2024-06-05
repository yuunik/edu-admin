import { useEffect, useState } from 'react'
import { Button, Table, Tag } from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  RobotOutlined,
  TrophyOutlined,
} from '@ant-design/icons'
import { getTeacherListByConditionAPI } from '@/apis/teacher.tsx'
import { Teacher } from '@/types/teacher.tsx'
import './index.scss'

const List = () => {
  // 讲师列表
  const [teacherList, setTeacherList] = useState<Teacher[]>([])

  // 获取讲师列表
  const getTeacherList = async () => {
    const {
      data: {
        code,
        data: { records },
      },
    } = await getTeacherListByConditionAPI({
      current: 1,
      limit: 10,
    })
    if (code === 20000) {
      // 更新讲师列表
      setTeacherList(records)
    }
  }

  // 页面加载完成后获取讲师列表
  useEffect(() => {
    getTeacherList()
  }, [])

  // 获取表格列
  const { Column } = Table
  return (
    <div className="teacher-list-container">
      <Table dataSource={teacherList} bordered>
        <Column
          title="序号"
          key="id"
          align="center"
          render={(_, __, index) => index + 1}
        />
        <Column title="姓名" dataIndex="name" key="name" align="center" />
        <Column title="简介" dataIndex="intro" key="intro" align="center" />
        <Column title="资历" dataIndex="career" key="career" align="center" />
        <Column
          title="头衔"
          key="level"
          align="center"
          render={(_, { level }: Teacher) => (
            <Tag
              color={level === 1 ? 'success' : 'processing'}
              icon={level === 1 ? <RobotOutlined /> : <TrophyOutlined />}
              className="level-tag"
            >
              <em className="level-text">
                {level === 1 ? '一级讲师' : '首席讲师'}
              </em>
            </Tag>
          )}
        />
        <Column
          title="添加时间"
          dataIndex="gmtCreate"
          key="gmtCreate"
          align="center"
        />
        <Column title="排序" dataIndex="sort" key="sort" align="center" />
        <Column
          title="操作"
          key="operation"
          render={() => (
            <>
              <Button
                type="primary"
                icon={<EditOutlined />}
                style={{ marginRight: 10 }}
              >
                修改
              </Button>
              <Button type="primary" danger icon={<DeleteOutlined />}>
                删除
              </Button>
            </>
          )}
          align="center"
        />
      </Table>
    </div>
  )
}

export default List
