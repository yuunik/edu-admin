// 图标统计模块相关的数据类型

// 统计图表数据的请求参数类型
export type StatisticsReqType = {
  // 统计类型
  statisticsType: string
  // 开始时间
  beginDate: string
  // 结束时间
  endDate: string
}

// 图表数据返回类型
export type StatisticsDataType = {
  chartData: ChartDataType[]
}

// 图表数据类型
export type ChartDataType = {
  date: string
  num: number
}
