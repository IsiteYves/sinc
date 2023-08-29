import React from 'react'
import Image from 'next/image'
import { success } from '@utils/images'

const SuccessComponent = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div>
          <h1 className="py-10 text-center lg:text-xl">
            Congratulations! Your event has been successfully published!!
          </h1>
        </div>
        <Image src={success} alt="success" className="w-[600px] relative" />
      </div>
    </>
  )
}

export default SuccessComponent
