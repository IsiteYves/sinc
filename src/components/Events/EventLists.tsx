import Image from 'next/image'
import { CalendarBlank, Trash } from 'phosphor-react'
import { IconMapPin } from '@tabler/icons-react'
import { EventImage4 } from '@utils/images'
import { IEventSchema } from '@utils/types/user'

interface EventListProps {
  event: IEventSchema
}

export const EventList = ({ event }: EventListProps) => {
  return (
    <div className="flex flex-col bg-[#222225] w-[274.12px] rounded-2xl shadow-2xl">
      <div className="relative rounded-xl">
        <Image
          src={event?.flyer || EventImage4}
          alt="Event Flyer"
          width={500}
          height={300}
          className="object-cover"
        />
        <div className="flex items-center gap-0.5 justify-center absolute top-4 px-1 bg-green-500 rounded-sm left-5">
          <span className="w-1.5 h-1.5 bg-green-100 rounded-full"></span>
          <span className="text-[11px]">Live</span>
        </div>
      </div>

      <div className="px-3 pt-5">
        <div className="flex justify-between">
          <p className="mt-1 text-sm font-medium leading-none tracking-wide text-white">
            {event?.name}
          </p>
          <div className="flex gap-2">
            <span className="text-[10px] flex items-center jus bg-[#2E2E2E] py-0.5 px-4 rounded-lg cursor-pointer">
              Edit
            </span>
            <Trash size={24} weight="fill" color="#757575" className="cursor-pointer" />
          </div>
        </div>
        <div className="flex justify-between gap-5 pt-2 text-white">
          <div className="flex items-center gap-1 text-xs font-extralight">
            <CalendarBlank color="#FFD48F" className="w-3 h-3" />
            {/* <span className="text-sm">{event?.date}</span> */}
          </div>
        </div>
        <div className="flex items-center gap-1 pt-2 text-primary-light">
          <IconMapPin color="#FFD48F" className="w-3 h-3" />
          <span className="text-sm">{event?.locationName}</span>
        </div>
      </div>
      <hr className="mt-5 border-t border-gray-700 mb-7" />
    </div>
  )
}
