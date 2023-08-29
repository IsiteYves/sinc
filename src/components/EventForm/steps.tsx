import React from 'react'
import { eventHeaderData } from '@utils/eventHeaderData'
import { useTabContext } from './TableContext'
import { CaretRight } from 'phosphor-react'

interface EventHeaderProps {}

const EventHeader: React.FC<EventHeaderProps> = () => {
  const { activeStep, handleTabClick, steps, completedSteps, markStepAsCompleted } = useTabContext()

  const visitedSteps = [true, true, false, false]
  return (
    <div className="p-8 border-2 border-borderColor rounded-2xl bg-secondary">
      <div className="flex items-center gap-2 text-white">
        <span className="text-base text-dark_text">My Events</span>
        <CaretRight weight="bold" />
        <span className="text-base font-medium ">Create Event</span>
      </div>
      <div className="flex mt-4 item-center lg:flex-row md:flex-col sm:flex-col min-[320px]:flex-col">
        {steps.map(({ name, step }, index) => {
          const isLast = index === eventHeaderData.length - 1
          const isActive = activeStep === step
          const isCompleted = completedSteps.includes(step)
          const isPreviousStep = step === activeStep - 1

          return (
            <button
              key={index}
              className="flex items-center"
              onClick={() => {
                if (isCompleted || isPreviousStep) {
                  handleTabClick(step)
                }
              }}>
              <div
                className={`rounded-full border  w-8 h-8 flex items-center justify-center mr-2 font-medium ${
                  isActive ? 'border-primary text-primary' : 'border-graye text-graye'
                }`}>
                {step + 1}
              </div>
              <div className={`${isActive ? 'text-primary' : 'text-graye'} font-medium`}>
                {name}
              </div>
              {!isLast && (
                <CaretRight
                  weight="bold"
                  className={`mx-4 ${isActive ? 'text-primary' : 'text-graye'}`}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default EventHeader
