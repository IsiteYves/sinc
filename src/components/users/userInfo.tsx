import React from 'react'
import Button from '@components/shared/button'
import SelectBox from '@components/shared/inputs/selectbox'
import Modal from '@components/shared/modal'
import { BUTTON_STATUS } from '@utils/types/button'
import { UserInfoProps } from '@utils/types/user'
import Image from 'next/image'
import { CalendarBlank, User, XCircle } from 'phosphor-react'

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <div className="flex items-center mx-auto">
      <Modal
        description="User #6206c57e594d4f5d246f"
        buttonText="View"
        buttonStatus={BUTTON_STATUS.TERTIARY}>
        <div className="bg-secondary px-4 w-[21rem] md:w-[30rem] py-4 relative rounded-lg">
          <div className="flex gap-4 rounded-2xl">
            <div className="">
              <Image
                src={user.image}
                alt="User Avatar"
                width={150}
                height={150}
                className="rounded-md"
              />
            </div>
            <div className="">
              <h1 className="text-md font-bold">{user.names}</h1>
              <p className="text-[#6b5c5c] my-0.5">{user.email}</p>
              <div className="flex gap-1 py-2">
                <User className="text-primary" />
                <span className="text-xs">{user.role}</span>
              </div>
              <div className="flex gap-1 my-1 mb-3 items-center">
                <CalendarBlank className="text-primary" />
                <p className="flex gap-1 text-xs">
                  Added: <span>{user.added}</span>
                </p>
              </div>
            </div>
          </div>
          <br />
          <div className="w-full -mt-8">
            <p className="text-xl text-auth uppercase font-bold my-6">Actions</p>
            <div className="flex flex-wrap items-center gap-3 w-full">
              <div className="flex items-center justify-between gap-2">
                <label className="w-auto" htmlFor="role">
                  Change role
                </label>
                <SelectBox label="Role" options={['Admin', 'User']} placeholder="Select Role" />
              </div>
              <div className="flex items-center justify-between gap-2">
                <p className="w-fit">{user.invited ? 'Cancel invite' : 'Remove User'}</p>
                <Button
                  group={BUTTON_STATUS.UNIVERSITY}
                  className="bg-red-600 text-white rounded-lg">
                  {user.invited ? 'Cancel' : 'Remove'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default UserInfo
