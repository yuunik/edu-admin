// 图表统计模块相关的接口
import type { ResType } from '@/types/common'
import { request } from '@/utils'

// 模块基地址
const base_url = '/statisticsservice/statistics'

// 请求地址
enum StatisticsAPI {
  // 生成统计数据
  CREATE_STATISTICS_DATE = `${base_url}/createStatisticsByDate/`,
}

/**
 * 生成统计数据
 * @param data 生成统计数据的日期
 * @returns
 */
export const createStatisticsByDateAPI = (data: string) =>
  request<ResType<object>>({
    url: StatisticsAPI.CREATE_STATISTICS_DATE + data,
    method: 'POST',
  })
