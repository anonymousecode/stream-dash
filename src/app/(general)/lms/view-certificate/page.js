import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import ViewCertificate from '@/components/lms/ViewCertificate'

const page = () => {
  return (
    <>
      <PageHeader>
      </PageHeader>
      <div className='main-content container-lg'>
        <div className='row'>
          <ViewCertificate />
        </div>
      </div>
    </>
  )
}

export default page