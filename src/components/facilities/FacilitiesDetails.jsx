"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { get_data } from "@/api/methods";
import Loading from "@/components/shared/Loading";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const FacilitiesDetail = () => {
  const router = useRouter();
  const { id: facilityId } = useParams();
  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacilityDetail = async () => {

      console.log("Fetching facility details for ID:", facilityId); // Debug log
      if (!facilityId) {
        setLoading(false);
        return;
      }

      try {
        const res = await get_data(
          "Facility",
          [
            "title",
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
          [["name", "=", facilityId]] // Assuming name is unique key
        );
        console.log("Facility data:", res); // Debug log

        if (res && res.length > 0) {
          setFacility(res[0]);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching facility details:", err);
        setLoading(false);
      }
    };

    fetchFacilityDetail();
  }, [facilityId]);

  const handleBack = () => {
    router.push("/facilities/manage"); // Adjust path as needed
  };

  if (loading) return <Loading />;

  if (!facility) {
    return (
      <div className="container py-5">
        <button className="btn btn-outline-secondary mb-4" onClick={handleBack}>
          <i className="fas fa-arrow-left me-2"></i>Back to Facilities
        </button>
        <div className="alert alert-warning">Facility not found</div>
      </div>
    );
  }

  return (
    <div className="container py-4 bg-white">
      {/* Back button */}
      <button className="btn btn-outline-secondary mb-4" onClick={handleBack}>
        <i className="fas fa-arrow-left me-2"></i>Back to Facilities
      </button>
      <div className="row">
        {/* Facility Image */}
        {facility.attach_image && (
          <div className="col-lg-6 mb-4">
            <div className="position-relative">
              <img
                src={`${apiBaseUrl}${facility.attach_image}`}
                alt={facility.facility_name}
                className="img-fluid rounded shadow"
                style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
              />
            </div>
          </div>
        )}

        {/* Facility Info */}
        <div className={facility.attach_image ? "col-lg-6" : "col-12"}>
          <h2 className="mb-3">{facility.facility_name}</h2>

          <div className="mb-3">
            <strong>Lab Type:</strong> {facility.lab_type || "-"}
          </div>
          <div className="mb-3">
            <strong>BRC:</strong> {facility.brc || "-"}
          </div>
          <div className="mb-3">
            <strong>District:</strong> {facility.district || "-"}
          </div>
          <div className="mb-3">
            <strong>Address:</strong> {facility.address || "-"}
          </div>

          {facility.description && (
            <div className="mb-4">
              <h5 className="text-secondary">Description</h5>
             <p style={{ whiteSpace: "pre-line" }} dangerouslySetInnerHTML={{ __html: facility.description }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacilitiesDetail;