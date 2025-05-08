import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import ManageCoordinator from '@/components/actions/ManageCoordinator'

const page = () => {
  return (
    <>
      <PageHeader>
      </PageHeader>
      <div className='main-content container-lg'>
        <div className='row'>
            <ManageCoordinator />
        </div>
      </div>
    </>
  )
}

export default page