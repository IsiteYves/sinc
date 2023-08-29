import React from 'react'
import { Cell, Pie, PieChart } from 'recharts'

interface PieChartProps {
  data: { name: string; value: number; fill: string }[]
  mainText: string
  subscribersText: string
  mainTextColor: string
  subscribersTextColor: string
  outerRadius: number
  innerRadius: number
}

const PieChartComponent: React.FC<PieChartProps> = ({
  data,
  mainText,
  subscribersText,
  mainTextColor,
  subscribersTextColor,
  outerRadius,
  innerRadius,
}) => {
  return (
    <PieChart width={290} height={290}>
      {/* Outer Circle */}
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        cornerRadius={10}
        fill="#8884d8"
        startAngle={90}
        endAngle={450}
        paddingAngle={0}
        animationDuration={1000}
        stroke="none">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.fill} />
        ))}
      </Pie>

      {/* Inner Circle */}
      <Pie
        data={[{ name: '', value: 1 }]}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={60}
        fill="#f5f5f5"
      />

      {/* Text in the middle */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={mainTextColor}
        style={{ fontWeight: '600' }}>
        {mainText}
      </text>

      {/* Subscribers text */}
      <text
        x="50%"
        y="60%" // Adjust y position to position the text below the main text
        textAnchor="middle"
        dominantBaseline="middle"
        fill={subscribersTextColor}
        style={{ fontWeight: '400' }} // Apply desired font weight
      >
        {subscribersText}
      </text>
    </PieChart>
  )
}

export default PieChartComponent
