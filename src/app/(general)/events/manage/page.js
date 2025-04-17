import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import EventManage from '@/components/events/EventManage'


const page = () => {
  return (
    <>
      <PageHeader>
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