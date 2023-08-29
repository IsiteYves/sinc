import React, { Fragment } from 'react'
import { TabProvider } from './TableContext'
import Steps from './steps'
import Form from './form'

const EventForm = () => {
  return (
    <TabProvider>
      <Fragment>
        <Steps />
        <Form />
      </Fragment>
    </TabProvider>
  )
}

export default EventForm
