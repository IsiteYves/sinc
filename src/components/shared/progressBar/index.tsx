import React, { useEffect, useState } from 'react'
import * as Progress from '@radix-ui/react-progress'

interface ProgressBarProps {
  progressPercentage: number
  progressColor: string
  indicatorColor: string
  followers?: string
  status?: string
  colorStatus?: string
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progressPercentage,
  progressColor,
  indicatorColor,
  followers,
  status,
  colorStatus,
}) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(progressPercentage), 500)
    return () => clearTimeout(timer)
  }, [progressPercentage])

  return (
    <div className="my-3 mx-14">
      <div className="flex flex-row items-center justify-between text-white">
        <span className="font-semibold">{followers}</span>
        <span className={colorStatus}>{status}</span>
      </div>
      <Progress.Root
        className={`relative overflow-hidden ${progressColor} rounded-full w-full h-2`}
        style={{ transform: 'translateZ(0)' }}
        value={progress}>
        <Progress.Indicator
          className={`${indicatorColor} w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]`}
          style={{ transform: `translateX(-${100 - progress}%)` }}
        />
      </Progress.Root>
    </div>
  )
}

export default ProgressBar
