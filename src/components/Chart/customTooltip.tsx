import { format, parseISO } from 'date-fns'
import React from 'react'

type CustomTooltipProps = {
  active: boolean
  payload: Array<{ value: number }>
  label: string
}
export function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active) {
    return (
      <div className="w-full tooltip">
        <p className="text-xs">This month</p>
        <p className="font-bold">{payload[0].value.toFixed(2)}$</p>
        <p className="text-xs">{format(parseISO(label), ' MMM')}</p>
      </div>
    )
  }
  return null
}
