import TextInput from '@components/shared/inputs/textInput'
import { ProfilePlaceHolder } from '@components/shared/placeholders'
import { useGetUserOrganizationsQuery } from '@store/actions/organization'
import { RootState } from '@store/index'
import { setActiveOrganization } from '@store/reducers/users'
import useDisclose from '@utils/hooks/useDisclose'
import useOnClickOutside from '@utils/hooks/useOutSideClickRef'
import { IOrganizationSchema } from '@utils/types/organization'
import Image from 'next/image'
import { CaretDown, CaretUp, Check, CheckCircle } from 'phosphor-react'
import { FC, Fragment, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const SwitchOrganization: FC = () => {
  const { activeOrganization } = useSelector((state: RootState) => state.userReducer)
  const dispatch = useDispatch()

  const divRef = useRef<HTMLDivElement | null>(null)

  const { isOpen, close, open, toggle } = useDisclose()

  useOnClickOutside(divRef, close)

  const { data, isLoading } = useGetUserOrganizationsQuery()

  const handleOrganizationClick = (org: IOrganizationSchema) => {
    dispatch(setActiveOrganization(org))
    close()
  }

  useEffect(() => {
    if (!activeOrganization && data && data.data.organizations.length !== 0) {
      dispatch(setActiveOrganization(data.data.organizations[0]))
    }
  }, [data, activeOrganization, dispatch])

  return (
    <div className="w-full" ref={divRef}>
      <button
        onClick={toggle}
        className="flex items-center justify-between min-w-32 p-2 px-3 text-white rounded-full ml-14 md:ml-20 bg-secondary backdrop-blur-sm md:w-[90%]">
        {!isLoading && data && (
          <Fragment>
            <div className="flex items-center gap-3 cursor-pointer">
              {/* <ProfilePlaceHolder /> */}
              {activeOrganization?.owner?.imageUrl ? (
                <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-secondary">
                  <Image
                    src={activeOrganization?.owner?.imageUrl}
                    alt="Profile image"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
              ) : (
                <ProfilePlaceHolder size="sm" />
              )}
              <div className="hidden font-semibold md:block lg:block">
                <span className="text-primary ">@{activeOrganization?.owner.username}</span>
              </div>
            </div>
            <div className="flex-col justify-center hidden w-fit md:flex">
              <CaretUp className="cursor-pointer" size={12} />
              <CaretDown className="cursor-pointer" size={12} />
            </div>
          </Fragment>
        )}
        {!isLoading && data && data.data.organizations.length === 0 && (
          <span className="py-1 text-sm italic text-left text-gray-500">
            You currently dont belong to any organization
          </span>
        )}
      </button>
      {isOpen && data && data.data.organizations.length !== 0 && (
        <div className="bg-secondary border border-gray-600 absolute mt-4 p-5 md:ml-20 z-[50] rounded-2xl w-50 md:w-[21.5%]">
          <TextInput placeholder="Search..." className="text-xs" />
          <div className="mt-4">
            {data?.data.organizations.map((org) => {
              const isActive = org.id === activeOrganization?.id
              return (
                <button
                  key={org.id}
                  className={`rounded-full flex items-center justify-between cursor-pointer p-2 ${
                    isActive && 'bg-view'
                  } hover:bg-view w-full disabled:cursor-not-allowed`}
                  onClick={() => !isActive && handleOrganizationClick(org)}
                  disabled={isActive}>
                  <div className="flex items-center gap-2">
                    {org?.owner?.imageUrl ? (
                      <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-secondary">
                        <Image
                          src={org?.owner?.imageUrl}
                          alt="Profile image"
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                    ) : (
                      <ProfilePlaceHolder size="sm" />
                    )}
                    <div className="hidden space-x-2 font-semibold text-primary md:block lg:block">
                      <span>@{org?.owner?.username}</span>
                    </div>
                  </div>
                  {isActive && <Check size={20} className="mr-2 text-primary" />}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default SwitchOrganization
