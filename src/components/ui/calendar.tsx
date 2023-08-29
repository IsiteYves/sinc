'use client'

import { buttonVariants } from '@components/ui/button'
import { cn } from '@utils/cn'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { FC } from 'react'
import { DayPicker } from 'react-day-picker'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

const Calendar: FC<CalendarProps> = ({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) => {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-5 right-0 bg-secondary_dark rounded-3xl', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium text-white',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
        ),
        nav_button_previous: 'absolute left-1 text-white',
        nav_button_next: 'absolute right-1 text-white',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] text-white',
        row: 'flex w-full mt-2',
        cell: 'text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 ',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100 text-[#837D7D]',
        ),
        day_selected:
          'bg-primary text-white hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-[50px]',
        day_today: 'bg-calendar text-primary rounded-[50px]',
        day_outside: 'text-[#FFE6B5] ',
        day_disabled: 'text-white opacity-50',
        day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="w-4 h-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="w-4 h-4" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
