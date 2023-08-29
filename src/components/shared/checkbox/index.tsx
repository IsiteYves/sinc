import React from 'react'

interface CheckboxProps {
  label: React.ReactNode
  isChecked?: boolean
  onCheckboxChange: (checked: boolean) => void
}

const Checkbox: React.FC<CheckboxProps> = ({ label, isChecked, onCheckboxChange }) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onCheckboxChange(event.target.checked)
  }

  return (
    <div className="flex items-center">
      <label className="flex items-center">
        <input
          type="checkbox"
          className="mr-2"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span className="text-sm">{label}</span>
      </label>
    </div>
  )
}

export default Checkbox
