import React from 'react'
import { ActionMeta, GroupBase, StylesConfig } from 'react-select'
import Select from 'react-select'

interface OptionData {
  label: string
  value: number
}

interface MyNextComponentProps {
  label: string
  options: OptionData[]
  value: OptionData | null
  isLoading: boolean
  onChange: (newValue: OptionData | null) => void
  error?: string
  touched?: boolean
  isSearchable: boolean
}

const CustomSelect: React.FC<MyNextComponentProps> = ({
  label,
  options,
  value,
  isLoading,
  onChange,
  error,
  isSearchable,
  touched,
}) => {
  const customStyles: StylesConfig<OptionData, false, GroupBase<OptionData>> = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'transparent',
      borderWidth: 2,
      height: '60px',
      borderRadius: 10,
      hoverColor: '#F09F1B',
      borderColor: error ? 'red' : '#434345',
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: '#1C1C1E',
      borderWidth: 1,
      borderColor: '#F09F1B',
      borderRadius: 10,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? '#2c2c2E'
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

  const handleChange = (selectedOption: OptionData | null, actionMeta: ActionMeta<OptionData>) => {
    onChange(selectedOption)
  }

  return (
    <div>
      <label>{label}</label>
      <Select
        isClearable
        isDisabled={isLoading}
        isLoading={isLoading}
        isSearchable={true}
        onChange={handleChange}
        options={options}
        value={value}
        styles={customStyles}
      />
      {error && touched && <div className="text-sm text-red-500">{error}</div>}
    </div>
  )
}

export default CustomSelect
