import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@utils/cn'
import { Buttons } from '@components/ui/button'
import { Calendar } from '@components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { Label } from '@components/ui/label'

const DatePickerDemo: React.FC<any> = ({ placeholder, label }) => {
  const [date, setDate] = React.useState<Date>()

  return (
    <div>
      {label && <Label>{label}</Label>}
      <Popover>
        <PopoverTrigger asChild>
          <Buttons
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal border border-[#434345] min-[320px]:w-[230px] x:w-[280px] h-10 pro:w-[295px] fold:w-[340px] desktop:w-full',
              !date && 'text-muted-foreground',
            )}>
            <div className="relative space-y-4 text-texto">
              <div className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-2" />
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
              </div>
            </div>
          </Buttons>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DatePickerDemo
