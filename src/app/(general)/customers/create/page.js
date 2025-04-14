"use client"

import React from "react"
import PageHeader from "@/components/shared/pageHeader/PageHeader"
import dynamic from "next/dynamic"

// Dynamically import BlogsCreate to avoid SSR issues
const BlogsCreate = dynamic(() => import("@/components/blogs/BlogsCreate"), {
  ssr: false,
})

const page = () => {
  return (
    <>
      <PageHeader />
      <div className="main-content">
        <div className="row">
          <BlogsCreate />
        </div>
      </div>
    </>
  )
}

export default page
