import { Input } from '@components/ui/input'
import { IEVENT_SETUP_ENUMS } from '@utils/types/event'
import { Field, useFormikContext } from 'formik'
import { FC, Fragment } from 'react'
import { useTabContext } from './TableContext'
import { Label } from '@components/ui/label'
import toUnixTimeStamp from '@utils/functions/toUnixTimeStamp'
import { ICreateEventPayload } from '@utils/types/event'
import LocationAutoCompleteInput from '@components/shared/inputs/locationAutoCompleteInput'
interface Props {
  setFieldValue: any
}
const LOCATION_TYPES = [
  {
    label: 'Onsite',
    value: IEVENT_SETUP_ENUMS.ONSITE,
  },
  {
    label: 'Online',
    value: IEVENT_SETUP_ENUMS.REMOTE,
  },
]

const EventVenue: FC<Props> = ({ setFieldValue }) => {
  const { setup, handleUpdateEventSetup } = useTabContext()
  const isLocationInputEnabled = setup === IEVENT_SETUP_ENUMS.ONSITE
  const formik = useFormikContext<ICreateEventPayload>()

  return (
    <Fragment>
      <div className="my-2 mb-3 text-3xl font-medium text-center text-primary">Event venue</div>
      <div>
        <Label>Where is your event happening from?</Label>
        <div className="flex gap-3 my-5">
          {LOCATION_TYPES.map((loc, index) => {
            const isSelected = loc.value === setup
            return (
              <button
                key={index}
                className={`border w-1/2 h-20 text-center border-border_gray p-4 rounded-2xl ${
                  isSelected && 'bg-[#4C4131] border-primary'
                }`}
                onClick={() => handleUpdateEventSetup(loc.value)}
                type="button">
                {loc.label}
              </button>
            )
          })}
        </div>
      </div>
      {isLocationInputEnabled ? (
        <LocationAutoCompleteInput setFieldValue={setFieldValue} />
      ) : (
        <Field
          name="location"
          id="location"
          label="URL"
          component={Input}
          placeholder="http://ex-am-ple.sinc"
          value={formik.values.location}
        />
      )}
      <div className="grid grid-cols-2 gap-5 my-5">
        <Field
          name="startDate"
          id="startDate"
          type="datetime-local"
          label="Start date"
          component={Input}
          placeholder="Pick date and time"
          value={
            formik.values.startDate
              ? new Date(parseInt(formik.values.startDate) * 1000).toISOString().slice(0, 16)
              : ''
          }
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = event.target.value
            const unixTimeStamp = toUnixTimeStamp(newValue)
            formik.setFieldValue('startDate', unixTimeStamp)
          }}
        />
        <Field
          name="endDate"
          id="endDate"
          label="End date"
          component={Input}
          type="datetime-local"
          placeholder="Pick date and time"
          value={
            formik.values.endDate
              ? new Date(parseInt(formik.values.endDate) * 1000).toISOString().slice(0, 16)
              : ''
          }
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = event.target.value
            const unixTimeStamp = toUnixTimeStamp(newValue)
            formik.setFieldValue('endDate', unixTimeStamp)
          }}
        />
      </div>
    </Fragment>
  )
}

export default EventVenue
