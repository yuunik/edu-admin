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
import { PageParams } from '@/types/common.tsx'
import './index.scss'

const List = () => {
  // 讲师列表
  const [teacherList, setTeacherList] = useState<Teacher[]>([])

  // 分页数据
  const [pageData, setPageData] = useState<PageParams>({
    current: 1,
    pageSize: 3,
  })

  // 总页数
  const [total, setTotal] = useState<number>(0)

  // 获取讲师列表
  const getTeacherList = async () => {
    const {
      data: {
        code,
        data: { records, total: totalCount },
      },
    } = await getTeacherListByConditionAPI(pageData)
    if (code === 20000) {
      // 更新讲师列表
      setTeacherList(records)
      // 更新总页数
      setTotal(totalCount)
    }
  }

  // 页面加载完成后获取讲师列表
  useEffect(() => {
    getTeacherList()
  }, [pageData])

  // 分页器翻页的回调
  const onPageChange = (pageNumber: number, pageSize: number) => {
    // 更新当前页
    setPageData({
      ...pageData,
      current: pageNumber,
      pageSize: pageSize,
    })
  }

  // 获取表格列
  const { Column } = Table

  return (
    <div className="teacher-list-container">
      <Table
        dataSource={teacherList}
        bordered
        pagination={{
          current: pageData.current,
          pageSize: pageData.pageSize,
          total: total,
          onChange: onPageChange,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: [3, 5, 7, 9],
          showTotal: (total) => `共 ${total} 条数据`,
        }}
      >
        <Column
          title="序号"
          dataIndex="id"
          align="center"
          render={(_, __, index) => index + 1}
        />
        <Column title="姓名" dataIndex="name" align="center" />
        <Column title="简介" dataIndex="intro" align="center" />
        <Column title="资历" dataIndex="career" align="center" />
        <Column
          title="头衔"
          dataIndex="level"
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
        <Column title="添加时间" dataIndex="gmtCreate" align="center" />
        <Column title="排序" dataIndex="sort" key="sort" align="center" />
        <Column
          title="操作"
          dataIndex="operations"
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
