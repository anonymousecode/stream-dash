import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import ManageDpo from '@/components/actions/ManageDpo'

const page = () => {
  return (
    <>
      <PageHeader>
      </PageHeader>
      <div className='main-content container-lg'>
        <div className='row'>
            <ManageDpo />
        </div>
      </div>
    </>
  )
}

export default page