import { Clock } from 'phosphor-react'
import React, { useState, FocusEvent } from 'react'
import Select, { ActionMeta, GroupBase, StylesConfig } from 'react-select'

// ... (Other imports)

interface OptionData {
  label: string
  value: string
}
interface CustomSelectProps {
  label: string
  options: OptionData[]
  value: OptionData | null
  begin: string
  onChange: (newValue: OptionData | null) => void
  error?: string
  touched?: boolean
}

const CustomSelector: React.FC<CustomSelectProps> = ({
  label,
  options,
  begin,
  value,
  onChange,
  error,
  touched,
}) => {
  const [selectedValue, setSelectedValue] = useState(value) // Use state to maintain the selected option
  const hasError = touched && error

  const handleChange = (selectedOption: OptionData | null, actionMeta: ActionMeta<OptionData>) => {
    onChange(selectedOption) // Pass the selected option back to the parent component
  }

  // ... (Existing code)

  const customStyles: StylesConfig<OptionData, false, GroupBase<OptionData>> = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'transparent',
      borderWidth: 2,
      height: '60px',
      borderRadius: 10,
      borderColor: hasError ? 'red' : state.isFocused ? '#F09F1B' : '#434345',
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: '#000000',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? '#000000'
        : state.isFocused
        ? '#F09F1B'
        : provided.backgroundColor,
      color: state.isSelected ? 'white' : provided.color,
    }),
    placeholder: (provided) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '0.5rem',
    }),
  }

  // Create a custom placeholder based on the selectedValue
  const customPlaceholder = (
    <div>
      <span className="text-primary -pt-2">{begin}</span>
      <div className="flex items-center text-texto">
        <Clock className="w-4 h-4 mr-2" />
        {selectedValue ? selectedValue.label : 'Select the event duration'}
      </div>
    </div>
  )

  return (
    <div>
      <Select
        id={`select-${label}`}
        placeholder={customPlaceholder}
        options={options}
        value={selectedValue}
        onChange={handleChange}
        styles={customStyles}
        className="py-2"
      />
      {hasError && <div className="mt-1 text-sm text-red-500">{error}</div>}
    </div>
  )
}
export default CustomSelector
