import { ButtonProps, BUTTON_STATUS } from '@utils/types/button'
import { HTMLMotionProps, motion } from 'framer-motion'
import { ButtonHTMLAttributes, FC } from 'react'
import { ClipLoader } from 'react-spinners'

const Button: FC<
  ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps & HTMLMotionProps<'input'>
> = (props) => {
  const { children, disabled, loading, group, className, icon } = props

  let styleClass

  switch (group) {
    case BUTTON_STATUS.PRIMARY:
      styleClass = 'bg-primary text-black'
      break
    case BUTTON_STATUS.SECONDARY:
      styleClass = 'bg-secondary text-dark_text border '
      break
    case BUTTON_STATUS.UNIVERSITY:
      styleClass = 'bg-primary text-black font-semibold rounded-2xl'
      break
    case BUTTON_STATUS.TERTIARY:
      styleClass = 'bg-view text-white font-semibold'
      break
    case BUTTON_STATUS.PRIMARY_DARK:
      styleClass = 'bg-graye text-black font-semibold'
      break
    default:
      styleClass = 'bg-primary text-black font-semibold'
      break
  }

  return (
    <motion.button
      {...props}
      className={`${
        disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
      } ${className} py-2.5 px-4 active:opacity-90  rounded-full text-sm md:text-[16px] flex items-center text-black font-semibold justify-center gap-2 ${styleClass}`}>
      {loading ? (
        <div className="min-w-min">
          <ClipLoader color={group} loading={true} size={16} />
        </div>
      ) : icon ? (
        icon
      ) : null}
      {children}
    </motion.button>
  )
}

export default Button
