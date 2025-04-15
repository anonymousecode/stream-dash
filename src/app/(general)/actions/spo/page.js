import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import ManageSpo from '@/components/actions/ManageSpo'

const page = () => {
  return (
    <>
      <PageHeader>
      </PageHeader>
      <div className='main-content'>
        <div className='row'>
          <ManageSpo/>
        </div>
      </div>
    </>
  )
}

export default page