'use client'

import React, { useState } from 'react'

// Dummy STC Data
const initialStcData = [
  { id: 'STC001', name: 'Grace Bennett', phone: '9112233445', email: 'grace@example.com' },
  { id: 'STC002', name: 'Carter Brooks', phone: '9223344556', email: 'carter@example.com' },
  { id: 'STC003', name: 'Zoe Ross', phone: '9334455667', email: 'zoe@example.com' },
  { id: 'STC004', name: 'Lucas Reed', phone: '9445566778', email: 'lucas@example.com' },
  { id: 'STC005', name: 'Lily Hughes', phone: '9556677889', email: 'lily@example.com' },
  { id: 'STC006', name: 'Henry Cooper', phone: '9667788990', email: 'henry@example.com' },
  { id: 'STC007', name: 'Avery Ward', phone: '9778899001', email: 'avery@example.com' },
]

const ManageStc = () => {
  const [stcData, setStcData] = useState(initialStcData)
  const [currentPage, setCurrentPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [newStc, setNewStc] = useState({
    uniqueId: '',
    name: '',
    phone: '',
    email: '',
  })

  const stcPerPage = 6
  const totalPages = Math.ceil(stcData.length / stcPerPage)
  const startIndex = (currentPage - 1) * stcPerPage
  const currentStcs = stcData.slice(startIndex, startIndex + stcPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewStc({ ...newStc, [name]: value })
  }

  const handleAddStc = () => {
    const { uniqueId, name, phone, email } = newStc
    if (uniqueId && name && phone && email) {
      const duplicate = stcData.find((stc) => stc.id === uniqueId)
      if (duplicate) {
        alert('An STC with this Unique ID already exists.')
        return
      }

      const newEntry = {
        id: uniqueId,
        name,
        phone,
        email,
      }

      setStcData([newEntry, ...stcData])
      setNewStc({ uniqueId: '', name: '', phone: '', email: '' })
      setShowModal(false)
      setCurrentPage(1)
    } else {
      alert('Please fill in all fields.')
    }
  }

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to remove this STC?')
    if (confirmDelete) {
      setStcData(stcData.filter((stc) => stc.id !== id))
    }
  }

  const handleEdit = (id) => {
    console.log('Edit STC with ID:', id)
    // Add your edit logic here
  }

  return (
    <div className="container py-3 rounded bg-white">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Manage STC</h4>
        <button className="btn btn-sm btn-outline-primary" onClick={() => setShowModal(true)}>
          Add STC
        </button>
      </div>

      {currentStcs.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>Unique ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentStcs.map(({ id, name, phone, email }) => (
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
        <div className="text-center text-muted">No STCs found.</div>
      )}

      {/* Add STC Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New STC</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Unique ID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="uniqueId"
                    value={newStc.uniqueId}
                    onChange={handleInputChange}
                    placeholder="Enter registered Unique ID"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={newStc.name}
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
                    value={newStc.phone}
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
                    value={newStc.email}
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
                <button type="button" className="btn btn-primary" onClick={handleAddStc}>
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

export default ManageStc