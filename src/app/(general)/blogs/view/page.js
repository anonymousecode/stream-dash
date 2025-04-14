import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import CustomersViewHeader from '@/components/customersView/CustomersViewHeader'
import CustomerContent from '@/components/customersView/CustomerContent'
import BlogsView from '@/components/blogs/BlogsView'

const page = () => {
  return (
    <>
      <PageHeader>
      </PageHeader>
      <div className='main-content'>
        <div className='row'>
          <BlogsView/>
        </div>
      </div>
    </>
  )
}

export default page