"use client"

import React from "react"
import PageHeader from "@/components/shared/pageHeader/PageHeader"
import dynamic from "next/dynamic"
//import MentorRequest from "@/components/actions/MentorRequest"

// Dynamically import  to avoid SSR issues
const MentorRequest = dynamic(() => import("@/components/actions/MentorRequest"), {
  ssr: false,
})

const page = () => {
  return (
    <>
      <PageHeader />
      <div className="main-content">
        <div className="row">
          <MentorRequest />
        </div>
      </div>
    </>
  )
}

export default page