import { RootState } from '@store/index'
import { SincLogo } from '@utils/images'
import { ICreateEventPayload, ICreatEventFileSchema } from '@utils/types/event'
import Image from 'next/image'
import {
  ArrowLeft,
  ArrowRight,
  ChatCircle,
  DotsThreeOutline,
  Heart,
  MapPin,
  User,
  Users,
} from 'phosphor-react'
import { FC, ReactNode, useEffect, useState } from 'react'
import { DeviceFrameset } from 'react-device-frameset'
import 'react-device-frameset/styles/marvel-devices.min.css'
import { useSelector } from 'react-redux'
import useEmblaCarousel from 'embla-carousel-react'
interface Props {
  event: ICreateEventPayload
  eventMedia: ICreatEventFileSchema[]
}
interface PhoneFrameProps {
  children: ReactNode
}

const PhoneFrame: FC<PhoneFrameProps> = ({ children }) => {
  return (
    <div className="relative flex items-center justify-center w-full overflow-hidden">
      <DeviceFrameset device="iPhone 5s" color="black" height={550} width={350}>
        <div className="relative w-[355px] h-full md:w-[200px] lg:w-[355px]">{children}</div>
      </DeviceFrameset>
    </div>
  )
}

const PreviewEvent: FC<Props> = ({ event, eventMedia }) => {
  const { user } = useSelector((state: RootState) => state.userReducer)

  const Header = () => {
    return (
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-secondary">
            {user?.imageUrl ? (
              <Image
                src={user.imageUrl}
                alt="Profile image"
                fill
                className="object-cover rounded-full"
              />
            ) : (
              <User color="white" />
            )}
          </div>
          <div>
            <div className="font-semibold">
              {user?.firstName} {user?.lastName}
            </div>
            <div className="text-sm font-medium text-gray-400">
              {user?.subscribersCount} Subscribers . Just now
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end justify-end text-right text-gray-400">
          <DotsThreeOutline />
          <div>Just now</div>
        </div>
      </div>
    )
  }

  const Body = () => {
    const [viewportRef, embla] = useEmblaCarousel({ loop: false, startIndex: 0 }) // Set startIndex to 0
    const [selectedIndex, setSelectedIndex] = useState(0)

    useEffect(() => {
      if (embla) {
        embla.on('select', () => {
          setSelectedIndex(embla.selectedScrollSnap())
        })
      }
    }, [embla])

    return (
      <>
        <div ref={viewportRef} className="embla">
          <div className="embla__container">
            {eventMedia.map((media, index) => (
              <div key={index} className="my-5 embla__slide h-[200px]">
                <Image
                  src={media.url}
                  alt={`Event media ${index + 1}`}
                  width={350}
                  height={400}
                  className="rounded-2xl"
                />
              </div>
            ))}
          </div>
        </div>
        {embla && (
          <div className="flex items-center justify-center mt-2">
            <div className="flex items-center gap-2">
              {eventMedia.map((_, index) => (
                <button
                  key={index}
                  onClick={() => embla.scrollTo(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === selectedIndex ? 'bg-primary' : 'bg-secondary'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between mt-2">
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <Heart size={20} className="text-primary" />
              <span>10k</span>
            </div>
            <div className="flex items-center gap-2">
              <ChatCircle size={20} className="text-primary" />
              <span>30k</span>
            </div>
          </div>
          <div className="w-10 h-10 flex items-center justify-center relative bg-[#3E301C] rounded-full p-2">
            <Image src={SincLogo} alt="Logo" className="object-contain" width={15} height={15} />
          </div>
        </div>
      </>
    )
  }

  const Footer = () => {
    return (
      <div className="mb-2 text-sm">
        <div className="mb-2">{event?.name}</div>
        <div className="flex items-center gap-2">
          <MapPin className="text-primary" />
          <span className="text-sm">{event?.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="text-primary" />
          <span className="text-sm">{event?.maxAttendance} Remaining</span>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full p-1">
      <PhoneFrame>
        <div className="bg-black">
          <div className="h-12 bg-[#121212] rounded-b-2xl" />
          <div className="my-3 rounded-2xl bg-[#121212] p-4">
            <Header />
            <Body />
            <Footer />
          </div>
          <div className="h-16 bg-[#121212] rounded-b-2xl" />
        </div>
      </PhoneFrame>
    </div>
  )
}

export default PreviewEvent
