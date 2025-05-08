import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import ManageMentor from '@/components/actions/ManageMentor'

const page = () => {
  return (
    <>
      <PageHeader>
      </PageHeader>
      <div className='main-content container-lg'>
        <div className='row'>
            <ManageMentor />
        </div>
      </div>
    </>
  )
}

export default page