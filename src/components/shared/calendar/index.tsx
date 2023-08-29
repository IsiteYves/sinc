import React, { useEffect, useRef, useState } from 'react'

import { CalendarBlank, CaretLeft, CaretRight } from 'phosphor-react'
import { API } from '@utils/config/envs'
import { UPLOAD_PREFIX } from '@utils/constants'
import { RootState } from '@store/index'
import { useSelector } from 'react-redux'
import useDisplayToast from '@utils/hooks/useToast'
import { useEventsQuery } from '@store/actions/organization'
import { ClipLoader } from 'react-spinners'

interface CalendarProps { }

interface Event {
  name: string
  img: string
  startDate: Date
  endDate: Date
}

const CalendarComponent: React.FC<CalendarProps> = () => {
  const [activeMonth, setActiveMonth] = useState<number>(() => new Date().getMonth())
  const [activeYear, setActiveYear] = useState<number>(() => new Date().getFullYear())
  const { activeOrganization } = useSelector((state: RootState) => state.userReducer)
  const [activeMonthString, setActiveMonthString] = useState<string>(() =>
    new Date().toLocaleString('default', { month: 'short' }),
  )
  const prevMonthIndex = useRef<number>(-1)
  const { showToast } = useDisplayToast()
  const [events, setEvents] = useState<Event[]>([])
  const { isLoading, data } = useEventsQuery({ organizerId: activeOrganization?.OrganizerProfileId })

  const [firstDayInMonth, setFirstDayInMonth] = useState<number[]>([])

  useEffect(() => {
    const getFirstDayInMonth = (year: number, month: number) => new Date(year, month, 1).getDay()

    const firstDays = Array.from({ length: 12 }, (_, i) => getFirstDayInMonth(activeYear, i))

    setFirstDayInMonth(firstDays)
  }, [activeYear])

  useEffect(() => {
    const eventsData = data?.data?.data
    if (activeOrganization?.OrganizerProfileId && eventsData) {
      const allEvents = []
      for (const event of eventsData) {
        console.log('current event in iteration....', event);
        const { name, startDate, endDate, Attachments } = event.Event
        allEvents.push({
          name,
          img: `${API}/file/${Attachments[0]?.url}`.split(UPLOAD_PREFIX)[1],
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        })
      }
      setEvents(allEvents)
    }
  }, [data, activeOrganization])

  useEffect(() => {
    setActiveMonthString(() =>
      new Date(activeYear, activeMonth).toLocaleString('default', {
        month: 'short',
      }),
    )
    prevMonthIndex.current = activeMonth
  }, [activeMonth, activeYear])

  const handlePreviousMonthClick = () => {
    const prevMonth = prevMonthIndex.current

    if (prevMonth === 0) {
      setActiveYear((prevYear) => prevYear - 1)
      setActiveMonth(11)
    } else {
      setActiveMonth(prevMonth - 1)
    }
  }

  const handleNextMonthClick = () => {
    const prevMonth = prevMonthIndex.current

    if (prevMonth === 11) {
      setActiveYear((prevYear) => prevYear + 1)
      setActiveMonth(0)
    } else {
      setActiveMonth(prevMonth + 1)
    }
  }

  const renderTableHeader = (): React.ReactNode => {
    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

    return daysOfWeek.map((day) => (
      <th
        key={day}
        className="text-sm font-regular text-[#525252] py-2 px-5 min-[320px]:px-2 desktop:px-5">
        {day}
      </th>
    ))
  }

  const renderCalendarRows = (): React.ReactNode => {
    const rows = []
    const firstDayOfMonth = firstDayInMonth[activeMonth]
    const lastDayOfMonth = new Date(activeYear, activeMonth + 1, 0).getDate()

    let dayCounter = 1
    let rowCounter = 0

    while (dayCounter <= lastDayOfMonth) {
      const row = []

      if (rowCounter === 0) {
        // Render dates from the previous month
        const daysInPrevMonth = new Date(activeYear, activeMonth, 0).getDate()
        const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1

        for (let i = daysInPrevMonth - startDay; i <= daysInPrevMonth; i++) {
          row.push(
            <td key={`prev-${i}`} className="px-1 py-1 text-center cursor-pointer text-[#564A34]">
              {i}
            </td>,
          )
        }
      }

      // Render dates for the current month
      for (let i = row.length; i < 7; i++) {
        if (dayCounter <= lastDayOfMonth) {
          const cellColor = 'inherit' // Default color for other days

          const matchingEvent = events.find(
            (event) =>
              (event.startDate.getFullYear() === activeYear &&
                event.startDate.getMonth() === activeMonth &&
                event.startDate.getDate() === dayCounter) ||
              (event.endDate.getFullYear() === activeYear &&
                event.endDate.getMonth() === activeMonth &&
                event.endDate.getDate() === dayCounter),
          )

          let sameYear = false
          let sameMonth = false
          let sameDay = false

          if (matchingEvent) {
            sameYear = matchingEvent.startDate.getFullYear() === matchingEvent.endDate.getFullYear()
            sameMonth = matchingEvent.startDate.getMonth() === matchingEvent.endDate.getMonth()
            sameDay = matchingEvent.startDate.getDate() === matchingEvent.endDate.getDate()
          }
          if (sameYear && sameMonth && sameDay) {
            row.push(
              <td
                key={`current-${dayCounter}`}
                className="px-1 py-1 text-center cursor-pointer"
                style={{ color: cellColor }}
                title={matchingEvent?.name}>
                {matchingEvent ? (
                  <span
                    className="flex rounded-full h-10 w-10 items-center justify-center border-2 border-solid border-primary"
                    style={{
                      background: `url(${matchingEvent.img}) no-repeat scroll center center / cover`,
                    }}>
                    {dayCounter}
                  </span>
                ) : (
                  dayCounter
                )}
              </td>,
            )
            dayCounter++
          }
        }
      }

      // Render dates from the upcoming month
      if (row.length < 7) {
        const daysLeft = 7 - row.length
        for (let i = 1; i <= daysLeft; i++) {
          row.push(
            <td key={`next-${i}`} className="px-1 py-1 text-center cursor-pointer text-[#564A34]">
              {i}
            </td>,
          )
        }
      }

      rows.push(
        <tr key={`row-${rowCounter}`}>
          {row.map((cell, index) => (
            <React.Fragment key={index}>{cell}</React.Fragment>
          ))}
        </tr>,
      )

      rowCounter++
    }

    return rows
  }

  return (
    <div className="w-1/2 min-[320px]:w-[240px] min-[414px]:w-[280px] pro:w-[300px] fold:w-[330px] desktop:w-[355px] mac:w-[420px] ">
      <div className="flex items-center justify-between mx-5 md:mx-0 lg:mx-2">
        <div className="flex items-center rounded-md border border-[#525252] font-medium text-base py-1 px-2 text-white gap-4 w-36">
          <CalendarBlank />
          {`${activeMonthString} ${activeYear}`}
        </div>
        <div className="flex gap-3">
          <CaretLeft className="cursor-pointer" onClick={handlePreviousMonthClick} />
          <CaretRight className="cursor-pointer" onClick={handleNextMonthClick} />
        </div>
      </div>
      {isLoading ? <div className='flex justify-center'><ClipLoader className='my-4' color="#F09F1B" loading={true} size={20} /></div> :
        <div className="flex justify-center">
          <table className="w-1 lg:my-10 lg:ml-4 lg:w-full md:my-6 md:px-16 calendar-table min-[320px]:w-[300px] desktop:w-[350px]">
            <thead>
              <tr>{renderTableHeader()}</tr>
            </thead>
            <tbody>{renderCalendarRows()}</tbody>
          </table>
        </div>}
    </div>
  )
}

export default CalendarComponent
