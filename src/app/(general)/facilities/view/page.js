import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import FacilitiesView from '@/components/facilities/FacilitiesView'
import { get_data } from '@/api/methods'
export default async function page() {



  return (
    <>
      <PageHeader>
      </PageHeader>
      <div className='main-content'>
        <div className='row'>
          <FacilitiesView />
        </div>
      </div>
    </>
  )
}

