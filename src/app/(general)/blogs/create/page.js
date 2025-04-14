import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
// import CustomerCreateContent from '@/components/customersCreate/CustomerCreateContent'
import BlogsCreate from '@/components/blogs/BlogsCreate'

const page = () => {
  return (
    <>
      <PageHeader>
      </PageHeader>
      <div className='main-content'>
        <div className='row'>
          <BlogsCreate/>
        </div>
      </div>
    </>
  )
}

export default page