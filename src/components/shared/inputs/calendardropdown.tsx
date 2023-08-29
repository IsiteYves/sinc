import CalendarComponent from '@components/shared/calendar'
import { CaretDown } from 'phosphor-react'
import { ChangeEvent, useState } from 'react'

interface Option {
  label: string
  value: string
}

interface DropdownInputProps {
  label?: string
  placeholder: string
}

const CalendarDropdownInput: React.FC<DropdownInputProps> = ({ label, placeholder }) => {
  const [selectedOption, setSelectedOption] = useState('')
  const [isCalendarOpen, setCalendarOpen] = useState(false)
  const handleSelect = (option: string) => {
    setSelectedOption(option)
    // Perform any other actions here based on the selected option
  }

  const handleCalendarToggle = () => {
    setCalendarOpen(!isCalendarOpen)
  }

  return (
    <div className="relative">
      {label && (
        <label className="text-white text-sm mb-1.5 block">
          {label}
          <span className="text-primary">*</span>
        </label>
      )}
      <div className="relative">
        <button
          className="block w-full px-3 py-2 text-texto bg-transparent border-2 border-[#434345] rounded-md shadow-sm appearance-none focus:outline-none cursor-pointer"
          onClick={handleCalendarToggle}>
          {selectedOption || placeholder || 'Select an option'}
        </button>
        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
          <CaretDown size={16} className="text-gray-400" weight="thin" />
        </div>
      </div>
      {isCalendarOpen && (
        <div className="absolute left-0 p-5 mt-2 rounded-2xl top-full bg-[#1B1B1D] z-50 border border-primary">
          <CalendarComponent />
        </div>
      )}
    </div>
  )
}
export default CalendarDropdownInput
