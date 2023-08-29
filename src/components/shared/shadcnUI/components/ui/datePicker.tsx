'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@lib/utils'
import { Buttons } from '@shadcn/button'
import { Calendar } from '@shadcn/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@shadcn/popover'
import { Label } from '@shadcn/label'

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <div className="relative">
        <Label htmlFor="email" className="absolute top-0 -mt-1 ">
          Event Date<span className="text-primary">*</span>
        </Label>
      </div>

      <PopoverTrigger asChild>
        <Buttons
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal border-2 border-[#434345] lg:h-[57px] min-[320px]:w-[230px] x:w-[280px] x:h-14 pro:w-[295px] fold:w-[340px] desktop:w-full',
            !date && 'text-muted-foreground',
          )}>
          <div className="relative space-y-4 text-texto">
            <div className="absolute top-0 -mt-2">
              <span className="text-primary">Select a day</span>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="w-4 h-4 mr-2" />
              {date ? format(date, 'PPP') : <span>Pick a date</span>}
            </div>
          </div>
        </Buttons>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
      </PopoverContent>
    </Popover>
  )
}
