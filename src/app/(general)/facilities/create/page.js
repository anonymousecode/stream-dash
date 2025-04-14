"use client"

import React from "react"
import PageHeader from "@/components/shared/pageHeader/PageHeader"
import dynamic from "next/dynamic"

// Dynamically import CreateFacility to avoid SSR issues
const FacilitiesCreate = dynamic(() => import("@/components/facilities/FacilitiesCreate"), {
  ssr: false,
})

const page = () => {
  return (
    <>
      <PageHeader />
      <div className="main-content">
        <div className="row">
          <FacilitiesCreate />
        </div>
      </div>
    </>
  )
}

export default page
