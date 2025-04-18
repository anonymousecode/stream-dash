import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import EventManage from '@/components/events/EventManage'
import EventsHeader from '@/components/events/EventsHeader'


const page = () => {
  return (
    <>
      <PageHeader>
        <EventsHeader />
      </PageHeader>
      <div className='main-content'>
        <div className='row'>
          <EventManage/>
        </div>
      </div>
    </>
  )
}

export default page