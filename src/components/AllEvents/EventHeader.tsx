import Button from '@components/shared/button'
import { BUTTON_STATUS } from '@utils/types/button'
import { useRouter } from 'next/router'
import { CaretDown, Plus, SlidersHorizontal } from 'phosphor-react'
import React from 'react'

const EventHeader = () => {
  const router = useRouter()
  return (
    <div className="overflow-hidden border-2 border-borderColor rounded-2xl bg-secondary h-[200px]">
      <div className="py-8 mx-auto mac:px-10">
        <div className="flex items-center justify-between gap-2 px-4 text-white">
          <h3 className="text-base font-semibold">My Events</h3>
          <div className="rounded-2xl w-[144px] md:w-[160px]">
            <Button
              group={BUTTON_STATUS.UNIVERSITY}
              icon={<Plus size={20} />}
              disabled={false}
              loading={false}
              onClick={() => router.push('/add')}>
              Create event
            </Button>
          </div>
        </div>
        <div className="bottom-0 flex justify-between pt-10">
          <h2 className="px-4">
            Lorem ipsum dolor sit amet <span className="text-primary">consectetur</span>
          </h2>
          <div className="flex items-center gap-2 px-10 text-[#838384]">
            <SlidersHorizontal />
            <p>Filter</p>
            <CaretDown weight="fill" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventHeader
