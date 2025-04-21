import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import CreateProposal from '@/components/pbl/CreateProposal'

const page = () => {
  return (
    <>
      <PageHeader>
      </PageHeader>
      <div className='main-content'>
        <div className='row'>
          <CreateProposal/>
        </div>
      </div>

    </>
  )
}

export default page