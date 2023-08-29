import React, { FC } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/shared/modal/dialog'
import Button from '../button'
import { ModalProps } from '@utils/types/model'

const Modal: FC<ModalProps> = ({
  title,
  description,
  children,
  buttonText,
  buttonIcon,
  buttonStatus,
  buttonStyle,
}) => {
  const defaultButtonStyles = 'w-fit font-bold px-6 mb-4 rounded-lg text-black'

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          group={buttonStatus}
          className={`${buttonStyle ? buttonStyle : defaultButtonStyles}`}
          icon={buttonIcon}>
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default Modal
