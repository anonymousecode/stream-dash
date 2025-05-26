'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { get_data } from '@/api/methods';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const FacilitiesView = () => {
  const router = useRouter();
  const [facilitiesData, setFacilitiesData] = useState([]);

  useEffect(() => {
    get_data(
      "Facility",
      [
        "title",
        "name",
        "lab_type",
        "lab_name",
        "brc",
        "district",
        "address",
        "description",
        "attach_image",
        "state",
        "state_name",
        "district_name",
        "brc_name"
      ],
      ""
    )
      .then((res) => {
        console.log("Facilities data:", res);
        setFacilitiesData(res);
      })
      .catch((err) => {
        console.log("Error fetching facilities data:", err);
      });
  }, []);

  const handleViewFacilityDetail = (facilityId) => {
    router.push(`/facilities/details/${facilityId}`);
  };

  return (
    <div className="container py-3 rounded bg-white">
      <h3 className="mb-4">Facilities</h3>

      {/* Facility Cards */}
      <div className="row g-4">
        {facilitiesData.length > 0 ? (
          facilitiesData.map((item) => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={item.facility_name}>
              <div className="card h-100 shadow-sm border-0">
                {item.attach_image ? (
                  <img  
                    src={`${apiBaseUrl}${item.attach_image}`}
                    alt={item.facility_name}
                    className="card-img-top"
                    style={{ height: '180px', objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    className="card-img-top d-flex align-items-center justify-content-center bg-secondary text-white"
                    style={{ height: '180px' }}
                  >
                    No Image
                  </div>
                )}
                <div className="card-body pb-1">
                  <h5 className="card-title text-truncate">{item.facility_name}</h5>
                  <p className="card-text text-muted mb-1">Lab Type: {item.lab_type || "-"}</p>
                  <p className="card-text text-muted mb-2">District: {item.district || "-"}</p>

                  <button
                    className="btn btn-warning btn-sm text-white rounded-2"
                    onClick={() => handleViewFacilityDetail(item.name)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center text-muted">No facilities available.</div>
        )}
      </div>
    </div>
  );
};

export default FacilitiesView;
