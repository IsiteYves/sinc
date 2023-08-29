interface Option {
  label: string
  value: string
}

export interface CardProps {
  title: string
  options: Option[]
  activeOption: string
  onOptionChange: (value: string) => void
  buttonText: string
}
