import { FC, ReactNode } from 'react'

type SelectableButtonProps = {
  children: ReactNode
  active: boolean
  onClick: () => void
}

const SelectableButton: FC<SelectableButtonProps> = (props) => {
  const { active, onClick } = props

  const buttonStyle = active ? 'bg-select border border-[#F09F1B]' : 'border border-white'

  return (
    <button
      className={`py-8 px-4 rounded-2xl text-center text-white w-36 min-[320px]:px-2 min-[320px]:w-28 x:w-32 md:w-36 fold:w-40 desktop:w-full desktop:py-12 ${buttonStyle}`}
      onClick={onClick}>
      {props.children}
    </button>
  )
}

export default SelectableButton
