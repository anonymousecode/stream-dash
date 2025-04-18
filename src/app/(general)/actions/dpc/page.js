import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import ManageDpc from '@/components/actions/ManageDpc'

const page = () => {
  return (
    <>
      <PageHeader>
      </PageHeader>
      <div className='main-content container-lg'>
        <div className='row'>
            <ManageDpc />
        </div>
      </div>
    </>
  )
}

export default page