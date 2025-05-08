import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import ManageStudents from '@/components/actions/ManageStudents'

const page = () => {
  return (
    <>
      <PageHeader>
      </PageHeader>
      <div className='main-content container-lg'>
        <div className='row'>
            <ManageStudents />
        </div>
      </div>
    </>
  )
}

export default page