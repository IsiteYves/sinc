import React, { KeyboardEventHandler, useState } from 'react'
import { StylesConfig, components } from 'react-select'
import CreatableSelect from 'react-select/creatable'

// Define the prop types for the Option
interface Option {
  readonly label: string
  readonly value: string
}

// Function to create an option object
const createOption = (label: string): Option => ({
  label,
  value: label,
})

interface MyNextComponentProps {
  error?: string | string[]
  touched?: boolean | never[]
  id: string
  onChange?: (value: string[]) => void
  onInputChange?: (newValue: string) => void
  label?: string
  maxLength?: number
}

const WhiteTextInput: React.FC<MyNextComponentProps> = ({
  error,
  touched,
  id,
  onChange,
  onInputChange,
  label,
  ...props
}) => {
  const isErrorVisible = touched && !!error
  const [tags, setTags] = useState<string[]>([])
  const [inputValue, setInputValue] = React.useState('')
  const [value, setValue] = React.useState<Option[]>([])

  // Event handler for keydown event
  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) {
      return
    }

    switch (event.key) {
      case 'Enter':
      case 'Tab':
        setValue((prev) => [...prev, createOption(inputValue)])
        setInputValue('')
        event.preventDefault()
        break
      default:
        break
    }
  }

  // Custom styles for the CreatableSelect component
  const customStyles: StylesConfig<Option, true> = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'transparent',
      borderWidth: 2,
      height: '60px',
      borderRadius: 10,
      hoverColor: '#F09F1B',
      borderColor: error ? 'red' : state.isFocused ? '#F09F1B' : '#434345',
    }),
    option: (provided, state: { isFocused: any; isSelected: any }) => ({
      ...provided,
      background: state.isFocused ? 'blue' : 'white',
      color: state.isSelected ? 'red' : 'black',
    }),
    multiValue: (provided) => ({
      ...provided,
      background: '#F09F1B',
      borderRadius: '10px',
      color: 'white',
      display: 'inline-flex',
      alignItems: 'center',
      paddingLeft: '5px',
      paddingRight: '5px',
      margin: '2px',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'white',
      paddingLeft: '5px',
      paddingRight: '5px',
    }),
  }
  const handleTagChange = (selectedTags: Option[]) => {
    const selectedValues = selectedTags.map((tag) => tag.value)
    onChange?.(selectedValues) // Call the onChange function from the parent component
    setValue(selectedTags) // Update the value state with the selected tags
  }
  const handleInputChange = (newValue: string) => {
    setInputValue(newValue) // Update the input value state
    onInputChange?.(newValue) // Call the onInputChange function from the parent component with a single string
  }
  return (
    <div>
      <CreatableSelect
        components={components}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={(newValue) => {
          if (newValue) {
            // Handle tag changes
            const selectedTags = Array.isArray(newValue)
              ? (newValue as Option[]) // Explicitly cast to Option[]
              : [newValue as unknown as Option] // Wrap single option in an array
            handleTagChange(selectedTags)
          }
        }}
        onInputChange={(newValue) => {
          setInputValue(newValue)
          onInputChange?.(newValue) // Call the onInputChange function from the parent component
        }}
        onKeyDown={handleKeyDown}
        placeholder="Type something and press enter..."
        value={value}
        styles={customStyles}
      />
      {isErrorVisible && error && <div className="text-sm text-red-500">{error}</div>}
    </div>
  )
}

export default WhiteTextInput
