'use client'

import React, { useState } from 'react'

// Dummy Data
const initialTeacherData = [
  { id: 'TEACHER001', name: 'John Doe', phone: '9996325871', email: 'john@example.com', status: 'approval' },
  { id: 'TEACHER002', name: 'Sarah Smith', phone: '9888745213', email: 'sarah@example.com', status: 'verified' },
  { id: 'TEACHER003', name: 'Michael Brown', phone: '9012345668', email: 'michael@example.com', status: 'approval' },
  { id: 'TEACHER004', name: 'Jessica Lee', phone: '9255678123', email: 'jessica@example.com', status: 'verified' },
  { id: 'TEACHER005', name: 'David Williams', phone: '9988766655', email: 'david@example.com', status: 'verified' },
]

const ManageTeacher = () => {
  const [teacherData, setTeacherData] = useState(initialTeacherData)
  const [filter, setFilter] = useState('approval')
  const [currentPage, setCurrentPage] = useState(1)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [teacherToDelete, setTeacherToDelete] = useState(null)

  const teachersPerPage = 6
  const filteredTeachers = teacherData.filter((teacher) => teacher.status === filter)
  const totalPages = Math.ceil(filteredTeachers.length / teachersPerPage)
  const startIndex = (currentPage - 1) * teachersPerPage
  const currentTeachers = filteredTeachers.slice(startIndex, startIndex + teachersPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleAccept = (id) => {
    setTeacherData((prevData) =>
      prevData.map((teacher) =>
        teacher.id === id ? { ...teacher, status: 'verified' } : teacher
      )
    )
  }

  const handleReject = (id) => {
    setTeacherData((prevData) => prevData.filter((teacher) => teacher.id !== id))
  }

  const handleDelete = () => {
    if (teacherToDelete) {
      setTeacherData((prevData) => prevData.filter((teacher) => teacher.id !== teacherToDelete))
      setShowDeleteModal(false)
      setTeacherToDelete(null)
    }
  }

  return (
    <div className="container py-3 rounded bg-white">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Manage Teachers</h4>
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

      {currentTeachers.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>Teacher ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentTeachers.map(({ id, name, phone, email }) => (
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
                            setTeacherToDelete(id)
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
        <div className="text-center text-muted">No teachers found.</div>
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
                Are you sure you want to remove this teacher?
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

export default ManageTeacher
