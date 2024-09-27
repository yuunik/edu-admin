import {
  DatePicker,
  DatePickerProps,
  Form,
  Select,
  Button,
  Tooltip,
} from 'antd'
import type { Dayjs } from 'dayjs'
import React, { useState } from 'react'
import { getChartDataAPI } from '@/apis/statistics'
import './index.scss'
import { Line } from '@ant-design/plots'
import { format } from 'fecha'
import type { ChartDataType } from '@/types/statistics'
import { log } from 'console'
import { title } from 'process'
import { text } from 'stream/consumers'

const StatisticsChart: React.FC = () => {
  // 获取 Item
  const Item = Form.Item

  // 开始时间
  const [beginDate, setBeginDate] = useState<string | string[]>('')

  // 结束时间
  const [endDate, setEndDate] = useState<string | string[]>('')

  // 统计数据类型
  const [statisticsType, setStatisticsType] = useState<string>('')

  // 日期列表
  const [dataList, setDataList] = useState<ChartDataType[]>([])

  // 开始时间变化
  const onBeginDateChange: DatePickerProps<Dayjs[]>['onChange'] = (
    _,
    dateStr,
  ) => {
    // 保存所选日期
    setBeginDate(dateStr)
  }

  // 结束时间变化
  const onEndDateChange: DatePickerProps<Dayjs[]>['onChange'] = (
    _,
    dateStr,
  ) => {
    // 保存所选日期
    setEndDate(dateStr)
  }

  // 统计类型选项
  const statisticsOptions = [
    { label: '学员注册数统计', value: 'register_num' },
    { label: '学员登录数统计', value: 'login_num' },
    { label: '课程播放数统计', value: 'video_view_num' },
    { label: '每日课程数统计', value: 'course_num' },
  ]

  // 统计类型变化
  const onStatisticsTypeChange = (value: string) => {
    setStatisticsType(value)
  }

  // 提交表单
  const onSubmit = async () => {
    const {
      data: { code, data },
    } = await getChartDataAPI({
      statisticsType,
      beginDate: beginDate as string,
      endDate: endDate as string,
    })
    if (code === 20000) {
      setDataList(data.chartData)
    }
  }

  // 图表数据映射
  const mapStatisticsData = {
    register_num: {
      subTitle: '学员注册数统计',
      tooptipName: '注册人数',
      unit: '人',
    },
    login_num: {
      subTitle: '学员登录数统计',
      tooptipName: '登录人数',
      unit: '人',
    },
    video_view_num: {
      subTitle: '课程播放数统计',
      tooptipName: '播放次数',
      unit: '次',
    },
    course_num: {
      subTitle: '每日课程数统计',
      tooptipName: '新增课程数',
      unit: '门',
    },
  }

  const { subTitle, tooptipName, unit } = mapStatisticsData[statisticsType] || {
    subTitle: 'subTitle',
    tooptipName: 'tooptipName',
    unit: 'unit',
  }

  // 图表数据
  const chartConfig = {
    title: {
      title: `统计图表 - ${subTitle}`,
      // subtitle: subTitle || '',
      align: 'center',
    },
    data: dataList,
    xField: (d) => new Date(d.date),
    yField: 'num',
    tooltip: (d) => ({
      name: tooptipName || '',
      value: d.num + unit || '',
    }),
    axis: { x: { title: false, size: 40 }, y: { title: false, size: 36 } },
    slider: {
      x: {
        labelFormatter: (d) => format(d, 'YYYY/M/D'),
      },
      y: { labelFormatter: '~s' },
    },
  }

  return (
    <div className="statistics-chart-container">
      <Form onFinish={onSubmit}>
        <Item label="统计数据类型">
          <Select
            style={{ width: 200 }}
            onChange={onStatisticsTypeChange}
            options={statisticsOptions}
          />
        </Item>
        <Item label="开始时间">
          <DatePicker onChange={onBeginDateChange} />
        </Item>
        <Item label="结束时间">
          <DatePicker onChange={onEndDateChange} needConfirm />
        </Item>
        <Item>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Item>
      </Form>
      {/* 获取图表数据后, 渲染图表 */}
      {dataList.length > 0 && <Line {...chartConfig} />}
    </div>
  )
}

export default StatisticsChart
