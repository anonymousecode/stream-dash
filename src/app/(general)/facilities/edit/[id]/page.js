"use client";
import React from "react";
import { useParams } from "next/navigation";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
//import FacilitiesHeader from "@/components/facilities/FacilitiesHeader";
import FacilitiesEdit from "@/components/facilities/FacilitiesEdit"; // Removed space here & renamed import

const FacilityEditPage = () => {
  const { id } = useParams(); // Get the dynamic id from the URL

  return (
    <>
      <PageHeader>
        
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <FacilitiesEdit id={id} /> {/* Pass id as prop */}
        </div>
      </div>
    </>
  );
};

export default FacilityEditPage;

