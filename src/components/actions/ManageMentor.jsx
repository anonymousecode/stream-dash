'use client'

import React, { useState } from 'react'

// Dummy Mentor Data
const initialMentorData = [
  { id: 'MENTOR001', name: 'Emily Johnson', phone: '9996325871', email: 'emily@example.com' },
  { id: 'MENTOR002', name: 'Jacob Miller', phone: '9888745213', email: 'jake@example.com' },
  { id: 'MENTOR003', name: 'Madison Clark', phone: '9012345668', email: 'maddy@example.com' },
  { id: 'MENTOR004', name: 'Olivia Anderson', phone: '9255678123', email: 'olive@example.com' },
  { id: 'MENTOR005', name: 'Ethan Davis', phone: '9988766655', email: 'ethan@example.com' },
  { id: 'MENTOR006', name: 'Ava Thompson', phone: '9155233445', email: 'ava@example.com' },
  { id: 'MENTOR007', name: 'Sophia White', phone: '9293949090', email: 'sophy@example.com' },
]

const ManageMentor = () => {
  const [mentorData, setMentorData] = useState(initialMentorData)
  const [currentPage, setCurrentPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [newMentor, setNewMentor] = useState({
    mentorId: '',
    name: '',
    phone: '',
    email: '',
  })

  const mentorsPerPage = 6
  const totalPages = Math.ceil(mentorData.length / mentorsPerPage)
  const startIndex = (currentPage - 1) * mentorsPerPage
  const currentMentors = mentorData.slice(startIndex, startIndex + mentorsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewMentor({ ...newMentor, [name]: value })
  }

  const handleAddMentor = () => {
    const { mentorId, name, phone, email } = newMentor
    if (mentorId && name && phone && email) {
      const duplicate = mentorData.find((mentor) => mentor.id === mentorId)
      if (duplicate) {
        alert('A Mentor with this ID already exists.')
        return
      }

      const newEntry = {
        id: mentorId,
        name,
        phone,
        email,
      }

      setMentorData([newEntry, ...mentorData])
      setNewMentor({ mentorId: '', name: '', phone: '', email: '' })
      setShowModal(false)
      setCurrentPage(1)
    } else {
      alert('Please fill in all fields.')
    }
  }

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to remove this mentor?')
    if (confirmDelete) {
      setMentorData(mentorData.filter((mentor) => mentor.id !== id))
    }
  }

  const handleEdit = (id) => {
    console.log('Edit Mentor with ID:', id)
    // Add your edit logic here
  }

  return (
    <div className="container py-3 rounded bg-white">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Manage Mentor</h4>
        <button className="btn btn-sm btn-outline-primary" onClick={() => setShowModal(true)}>
          Add Mentor
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
        <div className="text-center text-muted">No mentors found.</div>
      )}

      {/* Add Mentor Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Mentor</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Mentor ID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="mentorId"
                    value={newMentor.mentorId}
                    onChange={handleInputChange}
                    placeholder="Enter unique Mentor ID"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={newMentor.name}
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
                    value={newMentor.phone}
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
                    value={newMentor.email}
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
                <button type="button" className="btn btn-primary" onClick={handleAddMentor}>
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

export default ManageMentor
