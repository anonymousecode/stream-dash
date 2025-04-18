import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import ManageSchools from '@/components/actions/ManageSchool'

const page = () => {
  return (
    <>
      <PageHeader>
      </PageHeader>
      <div className='main-content container-lg'>
        <div className='row'>
            <ManageSchools />
        </div>
      </div>
    </>
  )
}

export default page