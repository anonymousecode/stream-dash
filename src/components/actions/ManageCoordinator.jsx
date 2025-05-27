
'use client'

import React, { useEffect, useState } from 'react'
import { get_data } from '@/api/methods' // custom API method

const ManageCoordinator = () => {
  const [coordinatorData, setCoordinatorData] = useState([])
  const [filter, setFilter] = useState('approval')
  const [currentPage, setCurrentPage] = useState(1)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [coordinatorToDelete, setCoordinatorToDelete] = useState(null)
  const [loading, setLoading] = useState(true)

  const coordinatorsPerPage = 6

  useEffect(() => {
    fetchCoordinators()
  }, [])

  const fetchCoordinators = async () => {
    try {
      setLoading(true)

      const [activeCoordinators, pendingCoordinators] = await Promise.all([
        get_data('Coordinator', ['name', 'unique_id', 'workflow_state'], { workflow_state: 'Active' }),
        get_data('Coordinator', ['name', 'unique_id', 'workflow_state'], { workflow_state: 'Approval Pending' }),
      ])

      const enrichWithUser = async (coordinators, status) =>
        await Promise.all(
          coordinators.map(async (coordinator) => {
            const userData = await get_data('STREAM User', ['fname', 'email', 'phone'], {
              name: coordinator.unique_id,
            })

            return {
              id: coordinator.name,
              name: userData[0]?.fname || 'N/A',
              phone: userData[0]?.phone || 'N/A',
              email: userData[0]?.email || 'N/A',
              status,
            }
          })
        )

      const enrichedActive = await enrichWithUser(activeCoordinators, 'verified')
      const enrichedPending = await enrichWithUser(pendingCoordinators, 'approval')

      setCoordinatorData([...enrichedPending, ...enrichedActive])
    } catch (error) {
      console.error('Error fetching coordinators:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCoordinators = coordinatorData.filter((c) => c.status === filter)
  const totalPages = Math.ceil(filteredCoordinators.length / coordinatorsPerPage)
  const startIndex = (currentPage - 1) * coordinatorsPerPage
  const currentCoordinators = filteredCoordinators.slice(startIndex, startIndex + coordinatorsPerPage)

  const handleAccept = (id) => {
    setCoordinatorData((prevData) =>
      prevData.map((c) =>
        c.id === id ? { ...c, status: 'verified' } : c
      )
    )
  }

  const handleReject = (id) => {
    setCoordinatorData((prevData) => prevData.filter((c) => c.id !== id))
  }

  const handleDelete = () => {
    if (coordinatorToDelete) {
      setCoordinatorData((prevData) => prevData.filter((c) => c.id !== coordinatorToDelete))
      setShowDeleteModal(false)
      setCoordinatorToDelete(null)
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
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

      {/* Coordinator Table */}
      {loading ? (
        <p>Loading...</p>
      ) : currentCoordinators.length > 0 ? (
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

