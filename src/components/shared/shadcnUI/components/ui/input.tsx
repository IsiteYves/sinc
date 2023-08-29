import * as React from 'react'
import { cn } from '@lib/utils'
import { Icon } from '@iconify/react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, id, ...props }, ref) => {
    const isSearchInput = id === 'location'

    return (
      <div className="relative">
        {isSearchInput && (
          // <Search className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2" size={16} />
          <Icon
            icon="ri:search-fill"
            className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2"
          />
        )}
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-lg border border-[#434345] bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50 lg:w-[580px] lg:h-[57px] font-semibold:normal lg:text-[20px] min-[320px]:w-[230px] x:w-[280px] x:h-14 pro:w-[295px] fold:w-[340px]',
            'text-blue-placeholder',
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
