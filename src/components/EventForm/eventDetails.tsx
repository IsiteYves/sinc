import { Input } from '@components/ui/input'
import SelectInput from '@components/ui/select'
import { useGetEventContextsQuery } from '@store/actions/eventContexts'
import { Field } from 'formik'
import { FC } from 'react'

interface Props {
  setFieldValue: any
}

const EventDetails: FC<Props> = ({ setFieldValue }) => {
  const { data: response, isLoading, isError } = useGetEventContextsQuery()

  return (
    <div className="flex flex-col gap-4 ">
      <div className="my-2 mb-3 text-3xl font-medium text-center text-primary">Event details</div>
      <Field name="name" id="name" label="Event Name" component={Input} placeholder="Event Name" />
      <Field
        name="description"
        id="description"
        label="Description"
        component={Input}
        placeholder="Type event description here"
        as="textarea"
      />
      <Field
        name="EventContextId"
        id="EventContextId"
        type="select"
        label="Type"
        component={SelectInput}
        disabled={isLoading || isError}
        placeholder="Select event type"
        options={response?.data.data.map((res) => {
          return {
            label: res.name,
            value: res.id,
          }
        })}
      />
      <Field
        name="maxAttendance"
        id="maxAttendance"
        label="Max seats"
        component={Input}
        placeholder="Enter maximum attendance"
        min={1}
        type="number"
      />
    </div>
  )
}

export default EventDetails
