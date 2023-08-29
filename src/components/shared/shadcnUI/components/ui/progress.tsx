'use client'
import { cn } from '@lib/utils'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import React from 'react'

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn('relative h-4 w-full overflow-hidden rounded-full bg-primary', className)}
    {...props}>
    <ProgressPrimitive.Indicator
      className="flex-1 w-full h-full transition-all transform bg-primary"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
