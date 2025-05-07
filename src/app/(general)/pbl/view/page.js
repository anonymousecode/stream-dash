import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import ViewProposal from '@/components/pbl/ViewProposal'

const page = () => {
  return (
    <>
      <PageHeader>
      </PageHeader>
      {/* <ProjectViewTabItems /> */}
      <div className='main-content'>
      <ViewProposal/>
    
      </div>
    </>
  )
}

export default page