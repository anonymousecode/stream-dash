import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import ManageProposal from '@/components/pbl/ManageProposal'



const page = () => {
  return (
    <>
      <PageHeader>
      </PageHeader>
      <div className='main-content'>
        <div className='row'>
          <ManageProposal/>
        </div>
      </div>
    </>
  )
}

export default page