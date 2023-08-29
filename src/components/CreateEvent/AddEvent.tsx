import React from 'react'
import EventCards from '@components/eventsCards'
import { eventCardsData } from '@utils/eventDatasCard'
import EventForm from '@components/EventForm'
import CalendarComponent from '../shared/calendar'

const CreateEventComponent = () => {
  return (
    <div className="grid gap-10 lg:gap-11 md:gap-3 lg:mx-4 lg:grid-cols-3 md:grid-cols-2 md:max-w-full ">
      <div className="flex flex-col col-span-1 md:mx-auto lg:col-span-2 min-[390px]:w-[275px] md:w-[330px] lg:w-full min-[320px]:w-[250px] min-[360px]:w-[250px] min-[375px]:w-[265px] min-[414px]:w-[300px] min-[428px]:w-[315px] fold:w-[360px]">
        <EventForm />
      </div>
      <div className="flex flex-col gap-5 text-center w-[280px] md:w-[330px] lg:w-full min-[320px]:w-[250px] min-[360px]:w-[250px] min-[375px]:w-[265px] min-[414px]:w-[300px] min-[428px]:w-[315px] fold:w-[360px]">
        <div className="p-3 bg-secondary rounded-2xl">
          <p className="p-5 text-xl font-semibold text-start md:py-5 md:px-1">Calendar</p>
          <CalendarComponent />
        </div>
        <div className="p-3 rounded-lg h-[400px] bg-secondary w-full md:h-[530px] air:h-[690px] galaxy:h-[840px] fold:h-[630px] desktop:h-[350px] mac:h-[650px] imac:h-[720px]">
          <p className="mb-3 text-xl font-semibold text-center ">Recent Activities</p>
          <EventCards data={eventCardsData} />
        </div>
      </div>
    </div>
  )
}
export default CreateEventComponent
