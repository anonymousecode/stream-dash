'use client'

import React, { useState, useEffect } from 'react'
import { get_data } from '@/api/methods'

// // Sample facility data
// const facilityData = [
//   {
//     id: 1,
//     name: 'Govt HSS Aluva Lab',
//     labType: 'ICT Lab',
//     brc: 'Aluva BRC',
//     district: 'Ernakulam',
//   },
//   {
//     id: 2,
//     name: 'Model School Palakkad',
//     labType: 'Science Lab',
//     brc: 'Palakkad North BRC',
//     district: 'Palakkad',
//   },
//   {
//     id: 3,
//     name: 'St. Joseph’s HS',
//     labType: 'Computer Lab',
//     brc: 'Thrissur Central BRC',
//     district: 'Thrissur',
//   },
//   {
//     id: 4,
//     name: 'GHSS Varkala',
//     labType: 'Math Lab',
//     brc: 'Varkala BRC',
//     district: 'Thiruvananthapuram',
//   },
//   {
//     id: 5,
//     name: 'GHSS Manjeri',
//     labType: 'ICT Lab',
//     brc: 'Manjeri BRC',
//     district: 'Malappuram',
//   },
//   {
//     id: 6,
//     name: 'Govt Model Boys School',
//     labType: 'Language Lab',
//     brc: 'Kollam City BRC',
//     district: 'Kollam',
//   },
//   {
//     id: 7,
//     name: 'SRV GHSS Ernakulam',
//     labType: 'Science Lab',
//     brc: 'Ernakulam BRC',
//     district: 'Ernakulam',
//   },
//   {
//     id: 8,
//     name: 'GHSS Neyyattinkara',
//     labType: 'ICT Lab',
//     brc: 'Neyyattinkara BRC',
//     district: 'Thiruvananthapuram',
//   },
// ]

const FacilitiesView = () => {

  const [facilityData, setFacilityData] = useState([])
  useEffect(() => {

    get_data("Facility", ["name", "title", "description", "attach_image", "state", "district", "brc", "lab_type", "address", "lab_name", "brc_name", "district_name"], "")
      .then((res) => {
        console.log("Blog data:", res);
        setFacilityData(res);
      }
      ).catch((err) => {
        console.log("Error fetching blog data:", err);
      })

  }, []);


  const [currentPage, setCurrentPage] = useState(1)
  const facilitiesPerPage = 6

  const totalPages = Math.ceil(facilityData.length / facilitiesPerPage)
  const startIndex = (currentPage - 1) * facilitiesPerPage
  const currentFacilities = facilityData.slice(startIndex, startIndex + facilitiesPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handleEdit = (id) => {
    console.log('Edit facility with id:', id)
    // Add your edit logic here
  }

  const handleDelete = (id) => {
    console.log('Delete facility with id:', id)
    // Add your delete logic here
  }

  return (
    <div className="container py-4 bg-white">
      {currentFacilities.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Facility Name</th>
                <th>Lab Type</th>
                <th>BRC</th>
                <th>District</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentFacilities && currentFacilities.map(({ id, name, title, lab_name, brc_name, district_name }, index) => (
                <tr key={id}>
                  <td>{startIndex + index + 1}</td>
                  <td className="text-start">{title}</td>
                  <td>{lab_name}</td>
                  <td>{brc_name}</td>
                  <td>{district_name}</td>
                  <td className="d-flex justify-content-center">
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => handleEdit(id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <nav>
            <ul className="pagination justify-content-center mt-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <li
                  key={page}
                  className={`page-item ${page === currentPage ? 'active' : ''}`}
                >
                  <button className="page-link" onClick={() => handlePageChange(page)}>
                    {page}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : (
        <div className="text-center text-muted">No facilities found.</div>
      )}
    </div>
  )
}

export default FacilitiesView
