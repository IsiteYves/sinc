import Button from '@components/shared/button'
import { useAddEventMutation } from '@store/actions/events'
import { RootState } from '@store/index'
import useDisplayToast from '@utils/hooks/useToast'
import { BUTTON_STATUS } from '@utils/types/button'
import { ICreateEventPayload, ICreatEventFileSchema, IEVENT_SETUP_ENUMS } from '@utils/types/event'
import { ITicketSchema } from '@utils/types/ticket'
import { Form, Formik, FormikErrors } from 'formik'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'
import EventDetails from './eventDetails'
import EventMedia, { emptyTicket } from './eventMedia'
import EventVenue from './eventVenue'
import PreviewEvent from './previewEvent'
import SuccessComponent from './success'
import { useTabContext } from './TableContext'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Event name is required'),
  description: Yup.string().required('Event description is required'),
  EventContextId: Yup.number().required('Event type is required'),
  location: Yup.string().required('Event location is required'),
  startDate: Yup.string().required('When is your event starting?'),
  endDate: Yup.string().required('When is your event ending?'),
  setup: Yup.string().required('Event setup is required'),
  maxAttendance: Yup.number()
    .min(1, 'The minimum number is 1')
    .required('Enter the number of required attendance'),
  blurhash: Yup.string().required('ticket price is required'),
  file: Yup.string(),
  longitude: Yup.number().required('ticket Seats is required'),
  latitude: Yup.number().required('ticket price is required'),
})

interface HandleNextParams {
  values: ICreateEventPayload
  errors: FormikErrors<ICreateEventPayload>
  validateField: (field: string) => void
}

const initialValues: ICreateEventPayload = {
  name: '',
  description: '',
  EventContextId: undefined,
  location: '',
  startDate: '',
  endDate: '',
  longitude: 0,
  latitude: 0,
  maxAttendance: 0,
  setup: IEVENT_SETUP_ENUMS.ONSITE,
  files: [],
  tickets: [],
}

const EventContent = () => {
  const { activeOrganization } = useSelector((state: RootState) => state.userReducer)
  const { activeStep, handleTabClick } = useTabContext()
  const [eventMedia, setEventMedia] = useState<ICreatEventFileSchema[]>([])
  const [addEvent, { isLoading }] = useAddEventMutation()
  const [tickets, setTickets] = useState<ITicketSchema[]>([emptyTicket])

  const { showToast } = useDisplayToast()
  const router = useRouter()
  const handleCreateEvent = (values: ICreateEventPayload) => {
    const payload = {
      ...values,
      tickets,
      files: eventMedia,
    }

    const activeOrganizationId = activeOrganization?.OrganizerProfileId ?? 0

    addEvent({ body: payload, activeOrganizationId })
      .unwrap()
      .then((res: any) => {
        showToast('Event created successfully', 'success')
        handleTabClick(4)
      })
      .catch((e: { data: { message: string | undefined } }) => {
        showToast(e?.data?.message, 'error')
      })
  }

  const handleNextButtonClick = ({ values, errors, validateField }: HandleNextParams) => {
    const { name, description, EventContextId, location, startDate, endDate, maxAttendance } =
      values
    const {
      name: nameError,
      description: descriptionError,
      EventContextId: eventContextError,
      maxAttendance: maxAttErr,
      location: locationErr,
      startDate: startErr,
      endDate: endErr,
    } = errors

    if (activeStep === 0) {
      validateField('name')
      validateField('description')
      validateField('EventContextId')
      validateField('maxAttendance')
      if (
        name &&
        description &&
        EventContextId &&
        maxAttendance &&
        !maxAttErr &&
        !nameError &&
        !descriptionError &&
        !eventContextError
      ) {
        handleTabClick(1)
      }
    }
    if (activeStep === 1) {
      validateField('location')
      validateField('startDate')
      validateField('endDate')
      if (location && startDate && endDate && !locationErr && !startErr && !endErr) {
        handleTabClick(2)
      }
    }
    if (activeStep === 2) {
      if (eventMedia.length === 0) {
        showToast('Please upload event image to continue', 'error')
      }
      if (eventMedia.length !== -1 && tickets.length !== 0) {
        handleTabClick(3)
      }
    }
    if (activeStep === 3) {
      handleCreateEvent(values)
    }
    if (activeStep === 4) {
      router.push('/dashboard/events')
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {}}
      validateOnChange={true}
      validateOnBlur={false}>
      {({ values, errors, setFieldValue, validateField }) => {
        return (
          <div className="flex h-full p-2 py-10 mt-5 border-2 border-borderColor rounded-2xl bg-secondary">
            <Form className="w-full lg:mx-auto min-[230px]:w-full lg:w-7/12">
              {activeStep === 0 && <EventDetails setFieldValue={setFieldValue} />}
              {activeStep === 1 && <EventVenue setFieldValue={setFieldValue} />}
              {activeStep === 2 && (
                <EventMedia
                  eventMedia={eventMedia}
                  setEventMedia={setEventMedia}
                  tickets={tickets}
                  setTickets={setTickets}
                />
              )}
              {activeStep === 3 && <PreviewEvent event={values} eventMedia={eventMedia} />}
              {activeStep === 4 && <SuccessComponent />}
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center gap-3 mt-10">
                  <Button
                    group={BUTTON_STATUS.SECONDARY}
                    type="button"
                    className={`!px-10 ${activeStep === 3 ? 'hidden' : ''}`}
                    onClick={() => {
                      if (activeStep === 3) handleTabClick(1)
                      if (activeStep === 2) handleTabClick(1)
                      if (activeStep === 1) {
                        handleTabClick(0)
                      }
                      if (activeStep === 0) {
                        // console.log('Go to previous page')
                      }
                    }}
                    disabled={isLoading}>
                    Back
                  </Button>
                  <Button
                    group={BUTTON_STATUS.PRIMARY}
                    type="submit"
                    className="!px-10"
                    loading={isLoading}
                    disabled={isLoading}
                    onClick={() => handleNextButtonClick({ errors, values, validateField })}>
                    {activeStep === 3 ? 'Create event' : 'Next'}
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        )
      }}
    </Formik>
  )
}

export default EventContent
