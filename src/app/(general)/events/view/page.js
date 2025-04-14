import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import EventsView from '@/components/events/EventsView'

const page = () => {
  return (
    <>
      <PageHeader>
      </PageHeader>
      <div className='main-content container-lg'>
        <div className='row'>
          <EventsView />
        </div>
      </div>
    </>
  )
}

export default page