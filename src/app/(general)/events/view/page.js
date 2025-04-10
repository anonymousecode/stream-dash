import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import PaymentHeader from '@/components/payment/PaymentHeader'
import EventsView from '@/components/events/EventsView'

const page = () => {
  return (
    <>
      <PageHeader>
        <PaymentHeader />
      </PageHeader>
      <div className='main-content container-lg'>
        <div className='row'>
          {/* <PaymentTable /> */}
          <EventsView />
        </div>
      </div>
    </>
  )
}

export default page