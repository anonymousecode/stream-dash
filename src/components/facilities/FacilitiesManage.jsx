'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { get_data, trash } from '@/api/methods'

const FacilitiesManage = () => {
  const [facilityData, setFacilityData] = useState([])
  const [loading, setLoading] = useState(false)
  const [removingId, setRemovingId] = useState(null)
  const [removedFacilities, setRemovedFacilities] = useState([])

  const router = useRouter()

  useEffect(() => {
    get_data(
      'Facility',
      [
        'name',
        'title',
        'description',
        'attach_image',
        'state',
        'district',
        'brc',
        'lab_type',
        'address',
        'lab_name',
        'brc_name',
        'district_name',
      ],
      ''
    )
      .then((res) => {
        console.log('Facility data loaded:', res) // Debug log
        setFacilityData(res)
      })
      .catch((err) => {
        console.error('Error fetching facility data:', err)
      })
  }, [])

  const [currentPage, setCurrentPage] = useState(1)
  const facilitiesPerPage = 6
  const totalPages = Math.ceil(facilityData.length / facilitiesPerPage)
  const startIndex = (currentPage - 1) * facilitiesPerPage
  const currentFacilities = facilityData.slice(startIndex, startIndex + facilitiesPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handleEdit = (facilityId) => {
    console.log('Edit button clicked for facility:', facilityId)
    console.log('Type of facilityId:', typeof facilityId)
    
    if (!facilityId) {
      console.error('Facility ID is undefined or null')
      alert('Error: Facility ID is missing')
      return
    }
    
    try {
      // Encode the facility ID to handle special characters
      const encodedId = encodeURIComponent(facilityId)
      console.log('Encoded ID:', encodedId)
      
      const targetPath = `/facilities/edit/${encodedId}`
      console.log('Attempting to navigate to:', targetPath)
      
      // Test if the route exists by trying to navigate
      router.push(targetPath)
      
      // Alternative routes to try if the above doesn't work:
      // router.push(`/facilities/${encodedId}`)
      // router.push(`/facilities/edit/${encodedId}`)
      
    } catch (error) {
      console.error('Navigation error:', error)
      alert(`Error navigating to facility detail page: ${error.message}`)
    }
  }

  const handleDelete = async (docId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this facility?')
    if (!confirmDelete) return

    setRemovingId(docId)
    setLoading(true)

    try {
      await trash('Facility', docId)
      setRemovedFacilities((prev) => [...prev, docId])
    } catch (error) {
      console.error('Error deleting facility:', error)
      alert('An error occurred while deleting.')
    } finally {
      setLoading(false)
      setRemovingId(null)
    }
  }

  return (
    <div className="container py-4 bg-white">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Facilities</h5>
      </div>

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
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {currentFacilities.map((facility, index) => {
                const isRemoved = removedFacilities.includes(facility.name)

                return (
                  <tr
                    key={facility.name || index} // Fallback key
                    style={{
                      backgroundColor: isRemoved ? '#f0f0f0' : '',
                      opacity: isRemoved ? 0.5 : 1,
                    }}
                  >
                    <td>{startIndex + index + 1}</td>
                    <td className="text-start">{facility.title || 'N/A'}</td>
                    <td>{facility.lab_name || 'N/A'}</td>
                    <td>{facility.brc_name || 'N/A'}</td>
                    <td>{facility.district_name || 'N/A'}</td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            console.log('Edit button clicked, facility:', facility)
                            handleEdit(facility.name)
                          }}
                          disabled={isRemoved}
                          type="button"
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleDelete(facility.name)
                          }}
                          disabled={isRemoved || removingId === facility.name}
                          type="button"
                        >
                          {isRemoved ? 'Removed' : 'Remove'}
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <nav>
            <ul className="pagination justify-content-center mt-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <li
                  key={page}
                  className={`page-item ${page === currentPage ? 'active' : ''}`}
                >
                  <button 
                    className="page-link" 
                    onClick={() => handlePageChange(page)}
                    type="button"
                  >
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

// Make sure this is a default export
export default FacilitiesManage

// If you need named export as well, you can do both:
// export { FacilitiesManage }
// export default FacilitiesManage