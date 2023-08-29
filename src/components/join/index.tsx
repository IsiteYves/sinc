import Button from '@components/shared/button'
import { Organizer } from '@utils/images'
import { BUTTON_STATUS } from '@utils/types/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const UserComponent = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-20">
        <Image src={Organizer} alt="organizer" />
        <h1 className="text-primary font-bold text-2xl my-">Become an organisor!</h1>
        <p className="font-bold">
          Join other event organisors and be among people who contribute the event industry!
        </p>
        <p className="text-auth my-4">
          This will change your account into a business account where you will have access to
          exclusive features
        </p>
        <Button group={BUTTON_STATUS.UNIVERSITY} className="rounded-full w-48">
          <Link className="text-xl" href="/pricing">
            Join
          </Link>
        </Button>
      </div>
    </div>
  )
}
export default UserComponent
