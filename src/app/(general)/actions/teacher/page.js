import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import ManageTeacher from '@/components/actions/ManageTeacher'

const page = () => {
  return (
    <>
      <PageHeader>
      </PageHeader>
      <div className='main-content container-lg'>
        <div className='row'>
            <ManageTeacher />
        </div>
      </div>
    </>
  )
}

export default page