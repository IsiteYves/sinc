import { BUTTON_STATUS } from './button'

export interface ModalProps {
  title?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  buttonText?: string
  buttonIcon?: React.ReactNode
  buttonStatus: BUTTON_STATUS
  buttonStyle?: string
  onClose?: () => void
}
