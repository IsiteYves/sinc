import { useState, ChangeEvent } from 'react'
import { CaretDown } from 'phosphor-react'

interface Option {
  label: string
  value: string
}

interface DropdownInputProps {
  label?: string
  options: Option[]
  placeholder: string
}

const DropdownInput: React.FC<DropdownInputProps> = ({ label, options, placeholder }) => {
  const [selectedOption, setSelectedOption] = useState<string>('')

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value
    setSelectedOption(option)
    // Perform any other actions here based on the selected option
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
        <select
          className="block w-full px-3 py-2 text-texto bg-transparent border-2 border-[#434345] rounded-md shadow-sm appearance-none focus:outline-none"
          value={selectedOption}
          onChange={handleSelect}>
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value} className="text-white bg-secondary">
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
          <CaretDown size={20} className="text-[#5D5D61]" weight="bold" />
        </div>
      </div>
    </div>
  )
}

export default DropdownInput
