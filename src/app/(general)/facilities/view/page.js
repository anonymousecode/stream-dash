import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import FacilitiesView from '@/components/facilities/FacilitiesView'

const page = () => {
  return (
    <>
      <PageHeader>
      </PageHeader>
      <div className='main-content'>
        <div className='row'>
          <FacilitiesView/>
        </div>
      </div>
    </>
  )
}

export default page