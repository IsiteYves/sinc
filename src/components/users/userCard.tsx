import React from 'react'
import Button from '@components/shared/button'
import { BUTTON_STATUS } from '@utils/types/button'
import Image from 'next/image'
import { CalendarBlank, User } from 'phosphor-react'
import UserInfo from './userInfo'

type UserCardProps = {
  user: {
    userId: string
    image: string
    names: string
    email: string
    role: string
    added: string
    invited: boolean
  }
}
const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="flex justify-around p-4 shadow-md shadow-[#0f0f10] gap-3 bg-[#222225] w-full rounded-2xl">
      <div className="w-1/2">
        <Image
          src={user.image}
          height={250}
          width={170}
          className="object-cover rounded-lg"
          alt="avatar"
        />
      </div>
      <div className="w-1/2">
        <h1 className="text-md font-bold">{user.names}</h1>
        <p className="text-auth my-0.5">{user.email}</p>
        <div className="flex gap-1">
          <User className="text-primary" />
          <span className="text-xs">{user.role}</span>
        </div>
        <div className="flex gap-1 my-1 mb-3 items-center">
          <CalendarBlank className="text-primary" />
          <p className="flex gap-1 text-xs">
            Added: <span>{user.added}</span>
          </p>
        </div>
        <UserInfo user={user} />
      </div>
    </div>
  )
}
export default UserCard
