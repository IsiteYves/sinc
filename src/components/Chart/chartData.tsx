import { ChartData } from '@utils/types/chart'
import { subDays } from 'date-fns'

const chartData: ChartData[] = []

for (let num = 30; num >= 0; num--) {
  chartData.push({
    date: subDays(new Date(), num).toISOString().substr(0, 10),
    value: 1 + Math.random(),
    value2: 1 - Math.random(),
  })
}

export default chartData
