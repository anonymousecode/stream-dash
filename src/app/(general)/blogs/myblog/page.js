"use client"
import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import BlogsManage from '@/components/blogs/BlogsManage'
import { get_data } from '@/api/methods'
import { useEffect, useState } from 'react'
export default function page() {

  return (
    <>
      <PageHeader>
      </PageHeader>
      <div className='main-content'>
        <div className='row'>
          <BlogsManage />
        </div>
      </div>
    </>
  )
}