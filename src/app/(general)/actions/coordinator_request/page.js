"use client"

import React from "react"
import PageHeader from "@/components/shared/pageHeader/PageHeader"
import dynamic from "next/dynamic"

// Dynamically import  to avoid SSR issues
const CoordinatorRequest = dynamic(() => import("@/components/actions/CoordinatorRequest"), {
  ssr: false,
})

const page = () => {
  return (
    <>
      <PageHeader />
      <div className="main-content">
        <div className="row">
          <CoordinatorRequest />
        </div>
      </div>
    </>
  )
}

export default page