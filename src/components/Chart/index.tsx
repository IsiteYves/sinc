import { format, parseISO } from 'date-fns'
import { useMemo } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import chartData from './chartData'
import { CustomTooltip } from './customTooltip'

const Home = () => {
  const data = useMemo(() => chartData, [])

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FCA311" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#FCA311" stopOpacity={0.05} />
          </linearGradient>
          <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3D3C41" stopOpacity={0.1} />
            <stop offset="95%" stopColor="#3D3C41" stopOpacity={0.01} />
          </linearGradient>
        </defs>

        <Area
          dataKey="value"
          type="monotone"
          stroke="#FCA311"
          strokeWidth={4}
          fill="url(#color) "
        />
        <Area
          dataKey="value2"
          type="monotone"
          stroke="#3D3C41"
          strokeWidth={4}
          fill="url(#color2)"
        />
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tickCount={2}
          tickFormatter={(str) => {
            const date = parseISO(str)
            if (date.getDate() % 7 === 0) {
              return format(date, 'MMM, d')
            }
            return ''
          }}
          interval={0}
        />

        <YAxis
          dataKey="value"
          axisLine={false}
          tickLine={false}
          tickCount={10}
          tickFormatter={(number) => `$${number.toFixed(2)}`}
        />

        <Tooltip content={<CustomTooltip active={false} payload={[]} label={''} />} />

        <CartesianGrid opacity={0.1} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default Home
