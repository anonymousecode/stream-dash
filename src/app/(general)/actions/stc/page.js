import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import ManageStc from '@/components/actions/ManageStc'

const page = () => {
  return (
    <>
      <PageHeader>
      </PageHeader>
      <div className='main-content container-lg'>
        <div className='row'>
            <ManageStc />
        </div>
      </div>
    </>
  )
}

export default page