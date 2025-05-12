

'use client'

import React, { useState } from 'react'

// Dummy Data
const initialMentorData = [
  { id: 'MENTOR001', name: 'Emily Johnson', phone: '9996325871', email: 'emily@example.com', status: 'approval' },
  { id: 'MENTOR002', name: 'Jacob Miller', phone: '9888745213', email: 'jake@example.com', status: 'verified' },
  { id: 'MENTOR003', name: 'Madison Clark', phone: '9012345668', email: 'maddy@example.com', status: 'approval' },
  { id: 'MENTOR004', name: 'Olivia Anderson', phone: '9255678123', email: 'olive@example.com', status: 'verified' },
  { id: 'MENTOR005', name: 'Ethan Davis', phone: '9988766655', email: 'ethan@example.com', status: 'verified' },
]

const ManageMentor = () => {
  const [mentorData, setMentorData] = useState(initialMentorData)
  const [filter, setFilter] = useState('approval')
  const [currentPage, setCurrentPage] = useState(1)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [mentorToDelete, setMentorToDelete] = useState(null)

  const mentorsPerPage = 6
  const filteredMentors = mentorData.filter((mentor) => mentor.status === filter)
  const totalPages = Math.ceil(filteredMentors.length / mentorsPerPage)
  const startIndex = (currentPage - 1) * mentorsPerPage
  const currentMentors = filteredMentors.slice(startIndex, startIndex + mentorsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

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

      {currentMentors.length > 0 ? (
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
