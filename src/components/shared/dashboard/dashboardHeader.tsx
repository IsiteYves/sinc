import { BUTTON_STATUS } from '@utils/types/button'
import { CardProps } from '@utils/types/dashboard'
import Image from 'next/image'
import { CaretDown, Plus, SlidersHorizontal } from 'phosphor-react'
import React, { FC, useState } from 'react'
import Button from '../button'
import SelectBox from '../inputs/selectbox'
import Modal from '../modal'

const DashboardHeaderCard: FC<CardProps> = ({ title, options, activeOption, onOptionChange }) => {
  return (
    <div className="flex md:w-[202%] lg:w-full justify-between items-center bg-secondary border-2 border-view md:p-6 p-2 mb-6 rounded-2xl">
      <div>
        <h1 className="text-xl font-bold text-white">{title}</h1>
        <div className="flex items-center gap-6">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => onOptionChange(option.value)}
              className={`cursor-pointer ${
                option.value === activeOption ? 'text-primary border-primary border-b' : ''
              }`}>
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <Modal
          title="Invite more members"
          description="Lorem ipsum dolor sit amet consectetur,  dolor sit amet consectetur."
          buttonText="Invite user"
          buttonIcon={<Plus />}
          buttonStatus={BUTTON_STATUS.UNIVERSITY}>
          <div className="flex flex-col py-4">
            <h1 className="text-lg font-bold">Emails</h1>
            <div className="flex flex-col items-center gap-4">
              {Array(4)
                .fill(null)
                .map((_, index) => (
                  <div className="flex gap-2 md:gap-16" key={index}>
                    <div
                      key={index}
                      className="flex w-full md:w-auto items-center gap-2 md:px-4 bg-[#0f0e0e] rounded-md">
                      <Image
                        src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                        alt="User Avatar"
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                      <p>Michaeldruen@gmail.com</p>
                    </div>
                    <SelectBox
                      label="Roles"
                      options={['Admin', 'User']}
                      placeholder="Select Role"
                    />
                  </div>
                ))}
            </div>
            <div className="flex items-center justify-between mx-2 my-4">
              <Button
                group={BUTTON_STATUS.PRIMARY}
                icon={<Plus />}
                className="flex flex-row-reverse w-20 py-2 font-semibold text-white rounded-lg bg-secondary_dark">
                Add
              </Button>
              <Button
                group={BUTTON_STATUS.PRIMARY}
                className="relative -bottom-10 w-32 rounded-[1.9rem] bg-primary px-16 py-2 text-secondary_dark font-semibold">
                Invite
              </Button>
            </div>
          </div>
        </Modal>

        <div className="flex items-center justify-end gap-2 mt-3">
          <SlidersHorizontal />
          <p>Filter</p>
          <CaretDown weight="fill" />
        </div>
      </div>
    </div>
  )
}

export default DashboardHeaderCard
