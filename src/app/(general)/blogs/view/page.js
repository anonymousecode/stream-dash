import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import BlogsView from '@/components/blogs/BlogsView'
import { get_data } from '@/api/methods'

export default async function page() {

  const blogsData = await get_data("Blog", ["name", "title", "date", "author", "content", "short_description", "attach_image"], "{}")
  return (
    <>
      <PageHeader>
      </PageHeader>
      <div className='main-content'>
        <div className='row'>
          <BlogsView blogData={blogsData} />
        </div>
      </div>
    </>
  )
}
