import Image from 'next/image'
import { Info } from 'phosphor-react'
import { FC } from 'react'

interface Props {
  title: string
  description: string
}

const InfoWithIcon: FC<Props> = ({ title, description }) => {
  return (
    <div className="flex gap-2 w-full bg-sinc-purple p-3 rounded-2xl">
      <div className="w-[37px] h-[37px] relative">
        <Info size={22} className="text-primary" />
      </div>
      <div className="text-left text-white">
        <p className="text-white font-light text-xs line-clamp-1">{description}</p>
      </div>
    </div>
  )
}

export default InfoWithIcon
