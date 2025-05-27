
'use client'

import React, { useEffect, useState } from 'react'
import { get_data } from '@/api/methods' // your custom API function

const ManageMentor = () => {
  const [mentorData, setMentorData] = useState([])
  const [filter, setFilter] = useState('approval')
  const [currentPage, setCurrentPage] = useState(1)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [mentorToDelete, setMentorToDelete] = useState(null)
  const [loading, setLoading] = useState(true)

  const mentorsPerPage = 6

  useEffect(() => {
    fetchMentors()
  }, [])

  const fetchMentors = async () => {
    try {
      setLoading(true)

      const [activeMentors, pendingMentors] = await Promise.all([
        get_data('Mentor', ['name', 'unique_id', 'workflow_state'], { workflow_state: 'Active' }),
        get_data('Mentor', ['name', 'unique_id', 'workflow_state'], { workflow_state: 'Approval Pending' })
      ])

      const enrichWithUser = async (mentors, status) =>
        await Promise.all(
          mentors.map(async (mentor) => {
            const userData = await get_data('STREAM User', ['fname', 'email', 'phone'], {
              name: mentor.unique_id,
            })

            return {
              id: mentor.name,
              name: userData[0]?.fname || 'N/A',
              phone: userData[0]?.phone || 'N/A',
              email: userData[0]?.email || 'N/A',
              status,
            }
          })
        )

      const enrichedActive = await enrichWithUser(activeMentors, 'verified')
      const enrichedPending = await enrichWithUser(pendingMentors, 'approval')

      setMentorData([...enrichedPending, ...enrichedActive])
    } catch (error) {
      console.error('Error fetching mentors:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredMentors = mentorData.filter((mentor) => mentor.status === filter)
  const totalPages = Math.ceil(filteredMentors.length / mentorsPerPage)
  const startIndex = (currentPage - 1) * mentorsPerPage
  const currentMentors = filteredMentors.slice(startIndex, startIndex + mentorsPerPage)

  const handleAccept = (id) => {
    setMentorData((prevData) =>
      prevData.map((mentor) =>
        mentor.id === id ? { ...mentor, status: 'verified' } : mentor
      )
    )
  }

  const handleReject = (id) => {
    setMentorData((prevData) => prevData.filter((mentor) => mentor.id !== id))
  }

  const handleDelete = () => {
    if (mentorToDelete) {
      setMentorData((prevData) => prevData.filter((mentor) => mentor.id !== mentorToDelete))
      setShowDeleteModal(false)
      setMentorToDelete(null)
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className="container py-3 rounded bg-white">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Manage Mentors</h4>
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

      {/* Mentor Table */}
      {loading ? (
        <p>Loading...</p>
      ) : currentMentors.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>Mentor ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentMentors.map(({ id, name, phone, email }) => (
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
                            setMentorToDelete(id)
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
        <div className="text-center text-muted">No mentors found.</div>
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
                Are you sure you want to remove this mentor?
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

export default ManageMentor
