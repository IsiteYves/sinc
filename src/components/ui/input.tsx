import * as React from 'react'
import { cn } from '@lib/utils'
import { Label } from './label'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps & any>(
  ({ className, type, id, field, form, ...props }) => {
    // const isSearchInput = id === "location";

    const errorMessage = form?.errors[field.name]

    return (
      <div className="relative w-ful">
        {/* {isSearchInput && (
          // <Search className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2" size={16} />
          <Icon
            icon="ri:search-fill"
            className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2"
          />
        )} */}
        {props?.label && (
          <Label htmlFor="email" className="">
            {props?.label}
            <span className="text-primary">*</span>
          </Label>
        )}

        <input
          type={type}
          className={cn(
            'flex w-full py-4 rounded-lg border border-border_gray bg-transparent px-3 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50  font-semibold:normal  outline-none',
            'text-blue-placeholder ',
            `${errorMessage && 'border-red-300'}`,
            className,
          )}
          {...field}
          {...props}
        />
        {errorMessage && <div className="my-1 text-base text-red-300">{errorMessage}</div>}
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
