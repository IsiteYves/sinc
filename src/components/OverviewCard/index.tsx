import { ArrowSquareOut } from 'phosphor-react'
import React from 'react'

interface OverviewCardProps {
  item: {
    title: string
    number: string
    display: string
    icon: React.ReactNode
  }
}

const OverviewCard: React.FC<OverviewCardProps> = ({ item: { title, number, display, icon } }) => {
  return (
    <div className="flex gap-2 lg:flex-col bg-secondary rounded-2xl p-5">
      <div className="flex flex-col">
        <div className="text-primary bg-card w-min rounded-full p-2">{icon}</div>
        <div className="my-4 font-semibold text-left text-3xl text-gray-300">{number}</div>

        <div className="text-base font-medium text-gray-500 ">{title}</div>

        {/* <div className="flex items-center gap-2 text-sm text-hero underline underline-offset-4">
          <Link href="#"> {display}</Link>
          <ArrowSquareOut />
        </div> */}
      </div>
    </div>
  )
}

export default OverviewCard
