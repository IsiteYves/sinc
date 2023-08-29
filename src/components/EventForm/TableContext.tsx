import { eventHeaderData } from '@utils/eventHeaderData'
import { IEVENT_SETUP_ENUMS } from '@utils/types/event'
import React, { createContext, useContext, useState } from 'react'

type TabContextType = {
  activeStep: number
  handleTabClick: (index: number) => void
  steps: { step: number; name: string }[]
  setup: IEVENT_SETUP_ENUMS
  handleUpdateEventSetup: (index: IEVENT_SETUP_ENUMS) => void
  completedSteps: number[] // Correct the type to an array of numbers
  markStepAsCompleted: (step: number) => void // Correct the type
}

const TabContext = createContext<TabContextType | undefined>(undefined)

export const useTabContext = (): TabContextType => {
  const context = useContext(TabContext)
  if (!context) {
    throw new Error('useTabContext must be used within a TabProvider')
  }
  return context
}

type TabProviderProps = {
  children: React.ReactNode
}

export const TabProvider: React.FC<TabProviderProps> = ({ children }) => {
  const [activeStep, setActiveStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([]) // Add this state to track completed steps
  const [steps] = useState(eventHeaderData)
  const [setup, setSetup] = useState<IEVENT_SETUP_ENUMS>(IEVENT_SETUP_ENUMS.ONSITE)

  const handleTabClick = (index: number) => {
    setActiveStep(index)
  }

  const handleUpdateEventSetup = (setup: IEVENT_SETUP_ENUMS) => {
    setSetup(setup)
  }

  const markStepAsCompleted = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step])
    }
  }

  const value: TabContextType = {
    activeStep,
    handleTabClick,
    steps,
    setup,
    handleUpdateEventSetup,
    completedSteps, // Add completedSteps to the context value
    markStepAsCompleted, // Add markStepAsCompleted function to the context value
  }

  return <TabContext.Provider value={value}>{children}</TabContext.Provider>
}
