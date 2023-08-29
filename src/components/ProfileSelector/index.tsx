import { ProfilePlaceHolder } from '@components/shared/placeholders'
import { useProfileQuery } from '@store/actions/auth'
import { RootState } from '@store/index'
import { updateUser } from '@store/reducers/users'
import Image from 'next/image'
import { CaretDown, User } from 'phosphor-react'
import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ProfileSelector: FC = () => {
  const { user } = useSelector((state: RootState) => state.userReducer)
  const { data } = useProfileQuery()

  const dispatch = useDispatch()

  useEffect(() => {
    if (data) {
      const profileData = data?.data
      dispatch(updateUser(profileData))
    }
  }, [data, dispatch])

  return (
    <div className="flex items-center gap-2 cursor-pointer">
      {user?.imageUrl ? (
        <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-secondary">
          <Image
            src={user?.imageUrl}
            alt="Profile image"
            fill
            className="object-cover rounded-full"
          />
        </div>
      ) : (
        <ProfilePlaceHolder size="md" />
      )}

      <div className="hidden text-sm font-bold text-white md:block lg:block">
        <span>
          {user?.firstName} {user?.lastName}
        </span>
        <div className="hidden font-semibold md:block lg:block text-primary">@{user?.username}</div>
      </div>
      <CaretDown size={18} className="inline text-white" />
    </div>
  )
}

export default ProfileSelector
