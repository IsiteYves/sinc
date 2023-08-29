import Charts from '@components/Chart'
import EventCards from '@components/eventsCards'
import OverviewCard from '@components/OverviewCard'
import PieChartComponent from '@components/pieCharts'
import Button from '@components/shared/button'
import Carousel from '@components/shared/carousel/Topfeatures'
import ProgressBar from '@components/shared/progressBar'
import { eventCardsData } from '@utils/eventDatasCard'
import routes from '@utils/routes'
import TopData from '@utils/topFeature'
import { BUTTON_STATUS } from '@utils/types/button'
import { TopFeatureData } from '@utils/types/carousel'
import { useRouter } from 'next/router'
import { Download, Info, Plus } from 'phosphor-react'
import React, { useState } from 'react'

const data = [
  { name: 'A', value: 500, fill: '#FCA311' },
  { name: 'B', value: 150, fill: '#565656' },
  { name: 'C', value: 300, fill: '#8C8D8E' },
]

const OverviewComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const allFeatures = TopData.FeatureContent
  const router = useRouter()

  const TopFeatureData: TopFeatureData[] = allFeatures.map((feature) => ({
    image: feature.image,
    place: feature.place,
    location: feature.location,
    time: feature.time,
    revenue: feature.revenue,
    number: feature.number,
  }))

  return (
    <div className="grid gap-5 mx-page grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
      <div className="flex flex-col col-span-1 gap-5 md:mx-auto lg:col-span-2 w-[280px] md:w-[320px] lg:w-full">
        <div className="rounded-2xl">
          <div className="flex items-center justify-between bg-secondary rounded-2xl p-page">
            <p className="text-xl font-semibold">Overview</p>
            <Button group={BUTTON_STATUS.UNIVERSITY} icon={<Download size={20} weight="bold" />}>
              Export
            </Button>
          </div>

          <div className="grid justify-between  grid-cols-2 md:grid-cols-4  gap-4 mt-page">
            {TopData.OverviewContent.map((item) => (
              <OverviewCard key={item.title} item={item} />
            ))}
          </div>
        </div>
        <div className="p-3 h-96 rounded-2xl bg-secondary md:h-80 lg:h-[400px]">
          <div className="flex ml-3 lg:my-4">
            <p className="text-xl font-semibold">Revenue</p>
            <Info size={20} className="mt-1.5 ml-5" color="gray" />
          </div>

          <div className="flex gap-3 mt-10 md:mt-2 lg:mt-12">
            <Charts />
          </div>
        </div>
        <div className=" bg-secondary rounded-2xl pb-page">
          <div className="flex justify-between p-8">
            <p className="text-lg font-semibold">Top Featured Events</p>
            <Button
              group={BUTTON_STATUS.UNIVERSITY}
              icon={<Plus size={20} weight="bold" />}
              onClick={() => router.push(routes.add.url)}>
              Add an event
            </Button>
          </div>

          <div className="flex justify-start  overflow-hidden px-8">
            <Carousel datas={TopFeatureData} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 text-center w-[280px] md:w-[315px] lg:w-full">
        <div className="p-3 bg-secondary rounded-2xl">
          <div>
            <p className="text-xl font-semibold text-center">Audience</p>
            <div className="flex items-center justify-center">
              <PieChartComponent
                data={data}
                mainText="40,589"
                subscribersText="Subscribers"
                mainTextColor="#fff"
                subscribersTextColor="#FFD38B"
                outerRadius={100}
                innerRadius={80}
              />
            </div>
            <ProgressBar
              progressPercentage={80}
              progressColor="bg-bar"
              indicatorColor="bg-primary"
              followers="40 - 50"
              status="32,032"
              colorStatus="text-primary font-semibold"
            />
            <ProgressBar
              progressPercentage={50}
              progressColor="bg-bar"
              indicatorColor="bg-progress_bar_primary"
              followers="30 - 40"
              status="12,098"
              colorStatus="text-progress_bar_primary font-semibold"
            />
            <ProgressBar
              progressPercentage={20}
              progressColor="bg-bar"
              indicatorColor="bg-progress_bar_secondary"
              followers="20 - 30"
              status="50,890"
              colorStatus="text-progress_bar_secondary font-semibold"
            />
          </div>
        </div>

        <div className="p-3 rounded-lg overflow-hidden bg-secondary w-full relative flex-1 flex flex-col">
          <div className="my-3 text-xl font-semibold text-center ">Recent Activities</div>
          <EventCards data={eventCardsData} />
        </div>
      </div>
    </div>
  )
}

export default OverviewComponent
