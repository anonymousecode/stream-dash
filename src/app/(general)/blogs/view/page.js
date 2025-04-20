"use client"
import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import BlogsView from '@/components/blogs/BlogsView'
import { get_data } from '@/api/methods'
import { useEffect, useState } from 'react'
export default function page() {

  return (
    <>
      <PageHeader>
      </PageHeader>
      <div className='main-content'>
        <div className='row'>
          <BlogsView />
        </div>
      </div>
    </>
  )
}
