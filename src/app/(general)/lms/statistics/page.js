import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import LmsHeader from '@/components/lms/LmsHeader'

const page = () => {
  return (
    <>
      <PageHeader>
        <LmsHeader />
      </PageHeader>
      <div className='main-content container-lg'>
        <div className='row'>
            <h1>LMS Statistics</h1>
        </div>
      </div>
    </>
  )
}

export default page