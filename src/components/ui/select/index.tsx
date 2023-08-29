import { cn } from '@utils/cn'
import { FC } from 'react'
import { Label } from '../label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components'

const SelectInput: FC<any> = ({ className, type, id, field, form, ...props }, ref) => {
  const { options, placeholder } = props

  const errorMessage = form?.errors[field.name]

  return (
    <div>
      {props?.label && (
        <Label htmlFor="email">
          {props?.label}
          <span className="text-primary">*</span>
        </Label>
      )}
      <select
        className={cn(
          'flex w-full py-4 rounded-lg border border-border_gray bg-transparent px-3 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50  font-semibold:normal  outline-none',
          'text-blue-placeholder',
          `${errorMessage && 'border-red-300'}`,
          className,
        )}
        {...field}
        {...props}>
        <option disabled value="" selected>
          {placeholder}
        </option>
        {options?.map((opt: { label: string; value: string }, index: number) => {
          return (
            <option key={index} value={opt.value}>
              {opt.label}
            </option>
          )
        })}
      </select>
      {errorMessage && <div className="my-1 text-base text-red-300">{errorMessage}</div>}
    </div>
  )
}

export default SelectInput
