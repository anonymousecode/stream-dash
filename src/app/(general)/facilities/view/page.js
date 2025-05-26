// app/facilities/page.jsx
import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import FacilitiesView from '@/components/facilities/FacilitiesView'; // Ensure this file exists
// import { get_data } from '@/api/methods';

export default function FacilitiesPage() {
  // Uncomment and use if you want server-side fetching
  /*
  const facilitiesData = await get_data(
    "Facilities",
    [
      "facility_name",
      "lab_type",
      "brc",
      "district",
      "address",
      "description",
      "facility_image"
    ],
    ""
  );
  */

  return (
    <>
      

      <div className="main-content container-lg">
        <div className="row">
          <FacilitiesView /* facilities={facilitiesData} */ />
        </div>
      </div>
    </>
  );
}
