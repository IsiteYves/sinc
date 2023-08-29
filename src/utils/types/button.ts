import { ReactNode } from 'react'

export const enum BUTTON_STATUS {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'view',
  UNIVERSITY = 'dark_primary',
  PRIMARY_DARK = 'primary_dark',
}

export type ButtonProps = {
  loading?: boolean
  icon?: ReactNode
  group: BUTTON_STATUS
  styles?: string
  type?: string
}
