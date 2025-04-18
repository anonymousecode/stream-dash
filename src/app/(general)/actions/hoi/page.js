import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import ManageHoi from '@/components/actions/ManageHoi'

const page = () => {
  return (
    <>
      <PageHeader>
      </PageHeader>
      <div className='main-content container-lg'>
        <div className='row'>
            <ManageHoi />
        </div>
      </div>
    </>
  )
}

export default page