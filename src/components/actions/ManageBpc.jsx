'use client'

import React, { useState } from 'react'

// Dummy BPC Data
const initialBpcData = [
  { id: 'BPC001', name: 'Natalie Adams', phone: '9011122233', email: 'natalie@example.com' },
  { id: 'BPC002', name: 'Isaac Murphy', phone: '9122233344', email: 'isaac@example.com' },
  { id: 'BPC003', name: 'Hailey Simmons', phone: '9233344455', email: 'hailey@example.com' },
  { id: 'BPC004', name: 'Mason Hayes', phone: '9344455566', email: 'mason@example.com' },
  { id: 'BPC005', name: 'Aria Foster', phone: '9455566677', email: 'aria@example.com' },
  { id: 'BPC006', name: 'Liam Jenkins', phone: '9566677788', email: 'liam@example.com' },
  { id: 'BPC007', name: 'Scarlett Rivera', phone: '9677788899', email: 'scarlett@example.com' },
]

const ManageBpc = () => {
  const [bpcData, setBpcData] = useState(initialBpcData)
  const [currentPage, setCurrentPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [newBpc, setNewBpc] = useState({
    uniqueId: '',
    name: '',
    phone: '',
    email: '',
  })

  const bpcPerPage = 6
  const totalPages = Math.ceil(bpcData.length / bpcPerPage)
  const startIndex = (currentPage - 1) * bpcPerPage
  const currentBpcs = bpcData.slice(startIndex, startIndex + bpcPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewBpc({ ...newBpc, [name]: value })
  }

  const handleAddBpc = () => {
    const { uniqueId, name, phone, email } = newBpc
    if (uniqueId && name && phone && email) {
      const duplicate = bpcData.find((bpc) => bpc.id === uniqueId)
      if (duplicate) {
        alert('A BPC with this Unique ID already exists.')
        return
      }

      const newEntry = {
        id: uniqueId,
        name,
        phone,
        email,
      }

      setBpcData([newEntry, ...bpcData])
      setNewBpc({ uniqueId: '', name: '', phone: '', email: '' })
      setShowModal(false)
      setCurrentPage(1)
    } else {
      alert('Please fill in all fields.')
    }
  }

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to remove this BPC?')
    if (confirmDelete) {
      setBpcData(bpcData.filter((bpc) => bpc.id !== id))
    }
  }

  const handleEdit = (id) => {
    console.log('Edit BPC with ID:', id)
    // Add your edit logic here
  }

  return (
    <div className="container py-3 rounded bg-white">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Manage BPC</h4>
        <button className="btn btn-sm btn-outline-primary" onClick={() => setShowModal(true)}>
          Add BPC
        </button>
      </div>

      {currentBpcs.length > 0 ? (
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
              {currentBpcs.map(({ id, name, phone, email }) => (
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
        <div className="text-center text-muted">No BPCs found.</div>
      )}

      {/* Add BPC Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New BPC</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Unique ID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="uniqueId"
                    value={newBpc.uniqueId}
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
                    value={newBpc.name}
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
                    value={newBpc.phone}
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
                    value={newBpc.email}
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
                <button type="button" className="btn btn-primary" onClick={handleAddBpc}>
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

export default ManageBpc