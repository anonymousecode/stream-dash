import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import PaymentHeader from '@/components/payment/PaymentHeader'
import EventsCreate from '@/components/events/EventsCreate'

const page = () => {
  return (
    <>
      <PageHeader>
        <PaymentHeader />
      </PageHeader>
      <div className='main-content container-lg'>
        <div className='row'>
          <EventsCreate />
        </div>
      </div>
    </>
  )
}

export default page