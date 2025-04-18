import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import FacilitiesView from '@/components/facilities/FacilitiesView'
import { get_data } from '@/api/methods'
export default async function page() {

  const facilitiesData = await get_data("Facility", ["name", "title", "description", "attach_image", "state", "district", "brc", "lab_type", "address", "lab_name", "brc_name", "district_name"], "")


  return (
    <>
      <PageHeader>
      </PageHeader>
      <div className='main-content'>
        <div className='row'>
          <FacilitiesView facilityData={facilitiesData} />
        </div>
      </div>
    </>
  )
}

