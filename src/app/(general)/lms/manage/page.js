import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import LmsHeader from '@/components/lms/LmsHeader'
import ManageCourse from '@/components/lms/ManageCourse'

const page = () => {
  return (
    <>
      <PageHeader>
        <LmsHeader />
      </PageHeader>
      <div className='main-content container-lg'>
        <div className='row'>
            <ManageCourse/>
        </div>
      </div>
    </>
  )
}

export default page