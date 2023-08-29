import React from 'react'
import EventHeader from './EventHeader'
import EventContent from './EventContent'

const AllEventComponent = () => {
  return (
    <div className="space-between">
      <EventHeader />
      <EventContent />
    </div>
  )
}

export default AllEventComponent
