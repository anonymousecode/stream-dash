import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import ViewProject from '@/components/project/ViewProject'
import { get_data } from '@/api/methods'
export default async function page() {

  const projectData = await get_data("Project", ["name", "title", "description", "attach_image", "starting_date", "completed_date"], "")


  return (
    <>
      <PageHeader>
      </PageHeader>
      <div className='main-content'>
        <div className='row'>
          <ViewProject projectData={projectData} />
        </div>
      </div>
    </>
  )
}