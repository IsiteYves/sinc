import { IconMapPin } from '@tabler/icons-react'
import { Calendar } from '@utils/images'
import Image from 'next/image'
import { ArrowDown, ArrowUp } from 'phosphor-react'
import { useEffect, useRef, useState } from 'react'

export default function EventCards({ data }: { data: Record<string, string>[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [showScrollUpButton, setShowScrollUpButton] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      const handleScroll = () => {
        setShowScrollButton(
          container.scrollTop + container.clientHeight < container.scrollHeight - 10,
        )
        setShowScrollUpButton(container.scrollTop > 10)
      }

      container.addEventListener('scroll', handleScroll)

      return () => {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const handleScrollDown = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth',
      })
      setShowScrollButton(false)
    }
  }

  const handleScrollUp = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      setShowScrollUpButton(false) // Hide scroll up button when clicked
    }
  }
  return (
    <div className="h-[inherit] overflow-y-auto -z-10  rounded-2xl" ref={containerRef}>
      <div className="grid py-4 place-items-center">
        {data.map((event, index) => {
          return (
            <div key={index} className="w-11/12 my-3 space-y-2">
              <div className="w-full p-4 rounded-lg bg-card_color">
                <div className="flex justify-between lg:scrollbar-thin lg:scrollbar-thumb-card_color lg:scrollbar-thumb-rounded-md scrollbar-track-gray-800 hover:scrollbar-thumb-gray-600 hover:scrollbar-thumb-rounded-lg">
                  <span className="bg-card text-[#FFD38B] rounded-2xl text-sm px-3 py-0.5">
                    {event.content}
                  </span>
                  <div className="flex items-center gap-1 text-sm font-extralight">
                    <Image src={Calendar} alt="Calendar" className="w-3 h-3" />
                    <span className="text-xs text-white">{event.date}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <h2 className="text-white">{event.event}</h2>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-1 text-primary-light">
                      <IconMapPin className="w-3 h-3" color={'#FFD38B'} />
                      <span className="text-sm text-[#FFD38B]">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-0.5"></span>
                      <span className="text-xs text-green-500">{event.status}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <span className="text-xs">{event.live}</span>
              </div>
            </div>
          )
        })}
        <div className="items-center justify-center transform md:absolute -translate-y-3/2 md:bottom-4 lg:flex bottom:4 ">
          {showScrollButton && !showScrollUpButton && (
            <button
              className=" p-2 mt-2  rounded-full shadow-md bg-[#2B2B2D]"
              onClick={handleScrollDown}>
              <ArrowDown size={30} />
            </button>
          )}
          {!showScrollButton && showScrollUpButton && (
            <button
              className="p-2 mt-2  rounded-full shadow-md bg-[#2B2B2D]"
              onClick={handleScrollUp}>
              <ArrowUp size={30} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
