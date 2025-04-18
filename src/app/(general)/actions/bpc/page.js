import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import ManageBpc from '@/components/actions/ManageBpc'

const page = () => {
  return (
    <>
      <PageHeader>
      </PageHeader>
      <div className='main-content container-lg'>
        <div className='row'>
            <ManageBpc />
        </div>
      </div>
    </>
  )
}

export default page