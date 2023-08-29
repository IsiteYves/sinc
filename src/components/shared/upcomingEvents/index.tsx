import { IconMapPin } from '@tabler/icons-react'
import { Revenuee, Sinc } from '@utils/images'
import { TopFeatureData } from '@utils/types/carousel'
import Image from 'next/image'
import { CalendarBlank } from 'phosphor-react'
import { FC } from 'react'

interface UpcomingEventsProps {
  featured: TopFeatureData
}

export const UpcomingEvents: FC<UpcomingEventsProps> = ({ featured }) => {
  return (
    <div className="relative w-[300px]">
      <div className="relative w-[300px] h-[150px] bg-black rounded-2xl">
        <Image
          src={featured.image}
          alt="event"
          fill
          className="object-cover opacity-60 hover:opacity-100 transition-all duration-150 rounded-2xl"
        />
      </div>
      <div className="flex flex-col w-full mt-2">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium text-md text-gray-300 leading-5 text-left">
            {featured.place}
          </span>
        </div>

        <div className="flex items-center gap-1 text-primary-light">
          <span className="text-sx text-location">{featured.location}</span>
          <IconMapPin color="#FFD48F" className="w-3 h-3" />
        </div>
        <div className="flex justify-between gap-5 text-white">
          <div className="flex gap-3 font-extralight">
            <div className="flex items-center ">
              <span className="text-xs">{featured.revenue}</span>
              <Image src={Revenuee} alt="Revenuee" className="w-7 h-7" />
            </div>
            <div className="flex items-center ">
              <span className="text-xs">{featured.number}</span>
              <Image src={Sinc} alt="Sinc Logo" className="w-3 h-3" />
            </div>
            <div className="flex items-center gap-1 font-extralight text-gray-300">
              <span className="text-xs">{featured.time}</span>
              <CalendarBlank />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
