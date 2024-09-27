import { Button, DatePicker, DatePickerProps, message } from 'antd'
import type { Dayjs } from 'dayjs'
import { useState } from 'react'
import './index.scss'
import { createStatisticsByDateAPI } from '@/apis/statistics'
import { useNavigate } from 'react-router-dom'

const StatisticsCreate: React.FC = () => {
  // 日期
  const [date, setDate] = useState<string | string[]>('')
  // 跳转对象
  const navigate = useNavigate()

  // 日期变化
  const onDateChange: DatePickerProps<Dayjs[]>['onChange'] = (
    date,
    dateStr,
  ) => {
    console.log(date, dateStr)
    // 保存所选日期
    setDate(dateStr)
  }

  // 生成数据
  const onCreateData = async () => {
    const {
      data: { code },
    } = await createStatisticsByDateAPI(date as string)
    if (code === 20000) {
      // 提示信息
      message.success('生成数据成功')
      // 跳转至统计图表页
      navigate('/statistics/chart')
    }
  }
  return (
    <div className="statistics-container">
      <DatePicker onChange={onDateChange} needConfirm />
      <Button type="primary" className="create-btn" onClick={onCreateData}>
        生成
      </Button>
    </div>
  )
}

export default StatisticsCreate
