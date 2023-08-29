import React, { FC, useState } from 'react'
import PageLoader from '@components/shared/Loaders/pageLoader'
import TextInput from '@components/shared/inputs/textInput'
import TSTable from '@components/tanStackTable'
import { GridFour, List, MagnifyingGlass } from 'phosphor-react'
import { Suspense, lazy } from 'react'
import EventCards from '@components/eventsCards'
import CalendarComponent from '@components/shared/calendar'
import { eventCardsData } from '@utils/eventDatasCard'
import { columns, invites, options, tableData, user } from '@utils/userCardData'
import DashboardHeaderCard from '@components/shared/dashboard/dashboardHeader'

const UserComponent = () => {
  const [isGrid, setIsGrid] = useState(true)
  const [activeOption, setActiveOption] = useState('all')
  const [displayUsers, setDisplayUsers] = useState(user)
  const handleOptionChange = (value: string) => {
    if (value === 'pending') setDisplayUsers(invites)
    if (value === 'all') setDisplayUsers(user)
    setActiveOption(value)
  }
  const UserCard = lazy(() => import('./userCard'))
  return (
    <div className="relative grid gap-4 py-4 lg:mx-4 lg:grid-cols-4 md:grid-cols-2 md:max-w-full">
      <div className="flex flex-col w-full col-span-1 gap-5 md:mx-auto lg:col-span-3 lg:w-full">
        <DashboardHeaderCard
          title="Users"
          options={options}
          activeOption={activeOption}
          onOptionChange={handleOptionChange}
          buttonText="Invite user"
        />
        <div
          className={`bg-secondary ${
            isGrid ? 'overflow-y-scroll h-[32rem] lg:h-[39rem] md:h-[48rem]' : 'overflow-hidden'
          } lg:w-full py-4 border-2 border-view  rounded-2xl`}>
          <div className="sticky flex flex-wrap justify-between w-full gap-2 p-3 -mt-4 rounded-lg lg:flex-nowrap -top-4 md:gap-32 lg:gap-12 bg-secondary">
            <div className="lg:w-[18rem] w-[16rem]">
              <TextInput
                icon={<MagnifyingGlass size={20} />}
                iconStyle="top-6 left-4 w-fit"
                className="pl-10 text-left text-white rounded-3xl"
                type="text"
                placeholder="Search"
              />
            </div>
            <div className="flex flex-wrap justify-between gap-2 pr-6 md:-mt-28 lg:mt-0">
              <div className="flex items-center gap-2">
                <p className="font-bold">from</p>
                <div className="border-none rounded-md bg-secondary-dark">
                  <TextInput type="date" className="px-2 text-lg text-center" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-bold">to</p>
                <div className="border-none rounded-md bg-secondary-dark">
                  <TextInput type="date" className="px-2 text-lg text-center" />
                </div>
              </div>
              <div className="hidden lg:flex gap-3 items-center bg-[#282828] px-4 rounded-md">
                <GridFour
                  size={32}
                  weight="bold"
                  onClick={() => setIsGrid(true)}
                  className={`${
                    isGrid ? 'bg-primary text-black' : 'bg-secondary text-white'
                  } rounded-md font-bold cursor-pointer`}
                />
                <List
                  onClick={() => setIsGrid(false)}
                  size={32}
                  weight="fill"
                  className={`${
                    !isGrid ? 'bg-primary text-black' : 'bg-secondary text-white'
                  } rounded-md font-bold cursor-pointer`}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center"></div>
          {isGrid ? (
            <div className="grid gap-5 mx-2 mt-2 lg:grid-cols-3">
              {Array(9)
                .fill(null)
                .map((_, index) => (
                  <Suspense key={index} fallback={<PageLoader />}>
                    <UserCard user={displayUsers} />
                  </Suspense>
                ))}
            </div>
          ) : (
            <div className="mr-3 -ml-6">
              {Array(1)
                .fill(null)
                .map((_, index) => (
                  <Suspense key={index} fallback={<PageLoader />}>
                    <TSTable data={tableData} columns={columns} showPagination={true} />
                  </Suspense>
                ))}
            </div>
          )}
        </div>
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
export default UserComponent
