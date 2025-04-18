import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import ViewCourse from '@/components/lms/ViewCourse'
import LmsHeader from '@/components/lms/LmsHeader'

const page = () => {
  return (
    <>
      <PageHeader>
        <LmsHeader />
      </PageHeader>
      <div className='main-content container-lg'>
        <div className='row'>
          <ViewCourse />
        </div>
      </div>
    </>
  )
}

export default page