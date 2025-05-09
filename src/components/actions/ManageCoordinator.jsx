'use client'

import React, { useState } from 'react'

// Dummy Data
const initialCoordinatorData = [
  { id: 'COORD001', name: 'John Doe', phone: '9996325871', email: 'john@example.com', status: 'approval' },
  { id: 'COORD002', name: 'Jane Smith', phone: '9888745213', email: 'jane@example.com', status: 'verified' },
  { id: 'COORD003', name: 'Michael Brown', phone: '9012345668', email: 'mike@example.com', status: 'approval' },
  { id: 'COORD004', name: 'Sophia Wilson', phone: '9255678123', email: 'sophia@example.com', status: 'verified' },
  { id: 'COORD005', name: 'David Lee', phone: '9988766655', email: 'david@example.com', status: 'verified' },
]

const ManageCoordinator = () => {
  const [coordinatorData, setCoordinatorData] = useState(initialCoordinatorData)
  const [filter, setFilter] = useState('approval')
  const [currentPage, setCurrentPage] = useState(1)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [coordinatorToDelete, setCoordinatorToDelete] = useState(null)

  const coordinatorsPerPage = 6
  const filteredCoordinators = coordinatorData.filter((coordinator) => coordinator.status === filter)
  const totalPages = Math.ceil(filteredCoordinators.length / coordinatorsPerPage)
  const startIndex = (currentPage - 1) * coordinatorsPerPage
  const currentCoordinators = filteredCoordinators.slice(startIndex, startIndex + coordinatorsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleAccept = (id) => {
    setCoordinatorData((prevData) =>
      prevData.map((coordinator) =>
        coordinator.id === id ? { ...coordinator, status: 'verified' } : coordinator
      )
    )
  }

  const handleReject = (id) => {
    setCoordinatorData((prevData) => prevData.filter((coordinator) => coordinator.id !== id))
  }

  const handleDelete = () => {
    if (coordinatorToDelete) {
      setCoordinatorData((prevData) => prevData.filter((coordinator) => coordinator.id !== coordinatorToDelete))
      setShowDeleteModal(false)
      setCoordinatorToDelete(null)
    }
  }

  return (
    <div className="container py-3 rounded bg-white">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Manage Coordinators</h4>
      </div>

      {/* Filter Buttons */}
      <div className="mb-3 d-flex gap-2">
        <button
          className={`btn btn-sm ${filter === 'approval' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => {
            setFilter('approval')
            setCurrentPage(1)
          }}
        >
          Approval Requests
        </button>
        <button
          className={`btn btn-sm ${filter === 'verified' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => {
            setFilter('verified')
            setCurrentPage(1)
          }}
        >
          Verified
        </button>
      </div>

      {currentCoordinators.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>Coordinator ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCoordinators.map(({ id, name, phone, email }) => (
                <tr key={id}>
                  <td>{id}</td>
                  <td className="text-start">{name}</td>
                  <td>{phone}</td>
                  <td>{email}</td>
                  <td>
                    <div className="d-flex justify-content-center gap-2 flex-wrap">
                      {filter === 'approval' ? (
                        <>
                          <button
                            className="btn btn-sm btn-outline-success"
                            onClick={() => handleAccept(id)}
                          >
                            Accept
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleReject(id)}
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => {
                            setCoordinatorToDelete(id)
                            setShowDeleteModal(true)
                          }}
                        >
                          Remove
                        </button>
                      )}
                    </div>
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
        <div className="text-center text-muted">No coordinators found.</div>
      )}

      {/* Confirm Delete Modal */}
      {showDeleteModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                />
              </div>
              <div className="modal-body">
                Are you sure you want to remove this coordinator?
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Yes, Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageCoordinator
