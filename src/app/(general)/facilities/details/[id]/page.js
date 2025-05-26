

"use client";
import React from "react";
import { useParams } from "next/navigation";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
// import FacilitiesHeader from "@/components/facilities/FacilitiesHeader";
import FacilityDetails from "@/components/facilities/FacilitiesDetails";

const FacilityDetailPage = async () => {
  // const { id } = params; // ✅ Extract dynamic facility ID from the URL
  const { id } = useParams(); 
  console.log("Facility ID from URL:", id); // Debug log to check if ID is extracted correctly

  return (
    <>
      <PageHeader>
        {/* <FacilitiesHeader /> */}
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <FacilityDetails facilityId={id} /> {/* ✅ Pass the facility ID to FacilityDetail */}
        </div>
      </div>
    </>
  );
};

export default FacilityDetailPage;