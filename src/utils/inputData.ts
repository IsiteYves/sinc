export interface inputProps {
  label: string
  errorMessage: string
  placeholder: string
  buttonLabel?: string
  tag?: string
}

export const inputData = [
  {
    label: 'Event Name',
    placeholder: 'Event Name',
    errorMessage: 'Event name missing',
  },
  {
    label: 'Event Description',
    placeholder: 'Description (type @ to mention someone)',
    errorMessage: 'event description missing',
  },
  {
    label: 'Tags',
    placeholder: 'Description (type @ to mention someone)',
    tag: 'Enter a comma after each tag',
    errorMessage: 'tag is missing',
  },
  {
    label: 'Event Address',
    placeholder: 'Enter Address',
    errorMessage: 'Address is missing',
  },
  {
    label: 'City',
    placeholder: 'Enter City',
    errorMessage: 'City is missing',
  },
]
