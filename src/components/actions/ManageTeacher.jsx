'use client'

import React, { useState } from 'react'

// Dummy Teacher Data
const initialTeacherData = [
  { id: 'TEACHER001', name: 'John Smith', phone: '9876543210', email: 'johnsmith@example.com' },
  { id: 'TEACHER002', name: 'Emma Brown', phone: '9123456789', email: 'emmabrown@example.com' },
  { id: 'TEACHER003', name: 'Michael Lee', phone: '9988776655', email: 'michaellee@example.com' },
  { id: 'TEACHER004', name: 'Sarah Wilson', phone: '9871234567', email: 'sarahwilson@example.com' },
  { id: 'TEACHER005', name: 'David Clark', phone: '9234567890', email: 'davidclark@example.com' },
  { id: 'TEACHER006', name: 'Laura Martinez', phone: '9456781234', email: 'lauramartinez@example.com' },
  { id: 'TEACHER007', name: 'James Anderson', phone: '9345678901', email: 'jamesanderson@example.com' },
]

const ManageTeacher = () => {
  const [teacherData, setTeacherData] = useState(initialTeacherData)
  const [currentPage, setCurrentPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [newTeacher, setNewTeacher] = useState({
    teacherId: '',
    name: '',
    phone: '',
    email: '',
  })

  const teachersPerPage = 6
  const totalPages = Math.ceil(teacherData.length / teachersPerPage)
  const startIndex = (currentPage - 1) * teachersPerPage
  const currentTeachers = teacherData.slice(startIndex, startIndex + teachersPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewTeacher({ ...newTeacher, [name]: value })
  }

  const handleAddTeacher = () => {
    const { teacherId, name, phone, email } = newTeacher
    if (teacherId && name && phone && email) {
      const duplicate = teacherData.find((teacher) => teacher.id === teacherId)
      if (duplicate) {
        alert('A Teacher with this ID already exists.')
        return
      }

      const newEntry = {
        id: teacherId,
        name,
        phone,
        email,
      }

      setTeacherData([newEntry, ...teacherData])
      setNewTeacher({ teacherId: '', name: '', phone: '', email: '' })
      setShowModal(false)
      setCurrentPage(1)
    } else {
      alert('Please fill in all fields.')
    }
  }

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to remove this teacher?')
    if (confirmDelete) {
      setTeacherData(teacherData.filter((teacher) => teacher.id !== id))
    }
  }

  const handleEdit = (id) => {
    console.log('Edit Teacher with ID:', id)
    // Add your edit logic here
  }

  return (
    <div className="container py-3 rounded bg-white">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Manage Teacher</h4>
        <button className="btn btn-sm btn-outline-primary" onClick={() => setShowModal(true)}>
          Add Teacher
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
                    <div className="d-flex justify-content-center">
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
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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

      {/* Add Teacher Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Teacher</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Teacher ID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="teacherId"
                    value={newTeacher.teacherId}
                    onChange={handleInputChange}
                    placeholder="Enter unique Teacher ID"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={newTeacher.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={newTeacher.phone}
                    onChange={handleInputChange}
                    placeholder="Enter contact number"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={newTeacher.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={handleAddTeacher}>
                  Save
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
