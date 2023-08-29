import Image from 'next/image'
import { CalendarBlank, Trash } from 'phosphor-react'
import { IconMapPin } from '@tabler/icons-react'
import { FC } from 'react'
import { EventDatas } from '@utils/types/carousel'

interface EventDatasProps {
  feat: EventDatas
}

export const Events: FC<EventDatasProps> = ({ feat }) => {
  return (
    <div className="flex gap-5 mx-2 overflow-hidden ">
      <div className="flex bg-[#222225] rounded-3xl flex-col pb-10">
        <div className="relative">
          <Image
            src={feat.image.src}
            alt="event"
            width={feat.image.width}
            height={feat.image.height}
          />
          <div className="absolute top-[15%] px-1 flex bg-green-500 rounded-md left-2">
            <span className="w-2 h-2 mt-1.5 bg-green-100 rounded-full"></span>
            <span className="px-1 text-sm">live</span>
          </div>
        </div>

        <div className="px-5 py-10">
          <div className="flex justify-between">
            <p className="mt-1 text-sm font-medium leading-none tracking-wide text-white">
              {feat.name}
            </p>
            <div className="flex gap-2">
              <span className="text-sm bg-[#2E2E2E] py-[2px] px-2  rounded-md">edit</span>
              <Trash size={24} weight="fill" color="#757575" />
            </div>
          </div>
          <div className="flex justify-between gap-5 pt-2 text-white">
            <div className="flex items-center gap-1 text-xs font-extralight">
              <CalendarBlank color="#FFD48F" className="w3-h-3" />
              <span className="text-sm">{feat.date}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 pt-2 text-primary-light">
            <IconMapPin color="#FFD48F" className="w-3 h-3" />
            <span className="text-sm">{feat.location}</span>
          </div>
        </div>
        <hr className="border-t-4 border-camera" />
      </div>
    </div>
  )
}
