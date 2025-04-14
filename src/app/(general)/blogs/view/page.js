import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
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