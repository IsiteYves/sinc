import { EventList } from '@components/Events/EventLists'
import { notfound } from '@utils/images'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const EventContent = () => {
  // const { data, error } = useAllEventsQuery();
  const [events, setEvents] = useState([])

  return (
    <section className="w-full lg:h-[565px] overflow-y-scroll mt-8 mx-auto bg-secondary rounded-2xl border-borderColor border-2 bottom-0 md:h-[690px] air:h-[850px] galaxy:h-[1000px] fold:h-[890px] desktop:h-[545px] mac:h-[840px] imac:h-[910px]">
      {events.length === 0 ? (
        <div className="items-center justify-center mx-auto mac:px-10">
          <div className="flex items-center justify-center gap-2 px-4 pt-28">
            <h3 className="text-3xl font-thin text-center text-white">No Events created Yet!</h3>
          </div>
          <div className="flex items-center justify-center">
            <Image src={notfound} alt="not found" />
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-center pt-2 mx-auto gap-7 mac:px-10">
          {events.map((event) => (
            <EventList key={event} event={event} />
          ))}
        </div>
      )}
    </section>
  )
}

export default EventContent
