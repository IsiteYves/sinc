import React, { useState } from 'react'
import Image from 'next/image'
import Modal from '@components/shared/modal'
import { star } from '@utils/images'
import { paymentMethods } from '@utils/paymentMethod'
import { BUTTON_STATUS } from '@utils/types/button'
import { PricingPlanProps } from '@utils/types/pricingPlan'
import Button from '@components/shared/button'
import Checkbox from '@components/shared/checkbox'
import { CurrencyDollar } from 'phosphor-react'

const PricingPlan: React.FC<PricingPlanProps> = ({ data }) => {
  const [isAgreed, setIsAgreed] = useState(false)
  const [currentMethod, setCurrentMethod] = useState('')
  return (
    <div
      key={data.id}
      className={`${
        data.isRecommended ? 'scale-[1.1] bg-view' : 'bg-[#222224]'
      } relative px-5 py-3 text-center mb-10 h-fit rounded-xl shadow-md w-72 `}>
      {data.isRecommended ? (
        <div className="flex -translate-y-1/2 transform justify-center -mt-3">
          <span className="inline-flex rounded-md bg-[#D9D9D9] px-5 py-1.5 font-semibold text-sm text-black">
            Recommended
          </span>
        </div>
      ) : (
        ''
      )}
      <div className="flex flex-col items-center">
        <div className="text-2xl font-bold text-[#FCA311] text-center py-6">{data.name}</div>
        <div className="flex items-start justify-center gap-1 mx-auto">
          <div className="flex items-center ml-10">
            <span className="text-[#FCA311]">
              <CurrencyDollar weight="bold" size={16} />
            </span>
          </div>
          <span className=" text-[#9B9A9A] text-4xl font-bold">{data.amount}</span>
          <div className="w-fit mt-5 text-[#9B9A9A] text-xs font-semibold">
            <span className="min-w-full">Per Month</span>
          </div>
        </div>
        <div className="flex px-4 items-center mt-8 mb-2 w-auto">
          <ul className="font-semibold text-sm mx-auto">
            {data.features.map((feature, featureIndex) => (
              <li key={featureIndex} className={`my-4 ${featureIndex === 1 ? '-ml-5' : ''}`}>
                <Image src={star} width={15} height={15} alt="" className="inline-block mr-4" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Modal
        buttonText="GET STARTED"
        buttonStatus={BUTTON_STATUS.PRIMARY}
        buttonStyle="left-0 right-0 mt-5 text-white py-2 w-full transition ease-in duration-200 text-center shadow-md focus:outline-none rounded-xl">
        <div className="flex justify-center items-center">
          <p className="font-normal text-sm">How do you want to pay?</p>
        </div>
        <div className="overflow-hidden">
          <div className="text-2xl font-bold text-[#FCA311] text-center py-5">{data.name}</div>
          <div className="flex items-center justify-center mx-24">
            <div className="flex items-start">
              <span className="text-[#FCA311] text-md font-bold -mt-5">$</span>
            </div>
            <span className="ml-1 text-[#9B9A9A] text-4xl font-bold">{data.amount}</span>
          </div>
        </div>
        <ul className="space-y-4">
          {paymentMethods.map((method, index) => (
            <Button
              group={BUTTON_STATUS.SECONDARY}
              key={index}
              className={`flex !justify-start ${
                currentMethod === method.name
                  ? 'border-[#F09F1B] !text-[#F09F1B]'
                  : 'border-transparent'
              } hover:border-[#F09F1B] hover:text-[#F09F1B] transition duration-200 rounded-md px-3 py-2 w-full cursor-pointer border !bg-[#2E2E2E]`}
              onClick={() => {
                setCurrentMethod(method.name)
              }}>
              <div className="flex items-center justify-center w-8 h-8 rounded-md mr-2">
                <Image src={method.image} alt={method.name} className="w-6 h-6" />
              </div>
              <span>{method.name}</span>
            </Button>
          ))}
        </ul>
        <div className="my-4">
          <Checkbox
            label={
              <>
                I agree to the <span className="text-[#FCA311]">terms and conditions</span> that
                come with this pricing plan!
              </>
            }
            isChecked={isAgreed}
            onCheckboxChange={setIsAgreed}
          />
        </div>

        <Button className="!text-white" group={BUTTON_STATUS.PRIMARY} disabled={!isAgreed}>
          PROCEED
        </Button>
      </Modal>
    </div>
  )
}

export default PricingPlan
