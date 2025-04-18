'use client'

import React, { useState } from 'react'

// Dummy DPO Data
const initialDpoData = [
  { id: 'DPO001', name: 'Liam Parker', phone: '9123456789', email: 'liam@example.com' },
  { id: 'DPO002', name: 'Harper Lee', phone: '9345678123', email: 'harper@example.com' },
  { id: 'DPO003', name: 'Noah Scott', phone: '9988776655', email: 'noah@example.com' },
  { id: 'DPO004', name: 'Amelia Green', phone: '9234567890', email: 'amelia@example.com' },
  { id: 'DPO005', name: 'Mason Turner', phone: '9876543210', email: 'mason@example.com' },
  { id: 'DPO006', name: 'Ella Martinez', phone: '9456123789', email: 'ella@example.com' },
  { id: 'DPO007', name: 'Logan Harris', phone: '9561234789', email: 'logan@example.com' },
]

const ManageDpo = () => {
  const [dpoData, setDpoData] = useState(initialDpoData)
  const [currentPage, setCurrentPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [newDpo, setNewDpo] = useState({
    uniqueId: '',
    name: '',
    phone: '',
    email: '',
  })

  const dpoPerPage = 6
  const totalPages = Math.ceil(dpoData.length / dpoPerPage)
  const startIndex = (currentPage - 1) * dpoPerPage
  const currentDpos = dpoData.slice(startIndex, startIndex + dpoPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewDpo({ ...newDpo, [name]: value })
  }

  const handleAddDpo = () => {
    const { uniqueId, name, phone, email } = newDpo
    if (uniqueId && name && phone && email) {
      const duplicate = dpoData.find((dpo) => dpo.id === uniqueId)
      if (duplicate) {
        alert('A DPO with this Unique ID already exists.')
        return
      }

      const newEntry = {
        id: uniqueId,
        name,
        phone,
        email,
      }

      setDpoData([newEntry, ...dpoData])
      setNewDpo({ uniqueId: '', name: '', phone: '', email: '' })
      setShowModal(false)
      setCurrentPage(1)
    } else {
      alert('Please fill in all fields.')
    }
  }

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to remove this DPO?')
    if (confirmDelete) {
      setDpoData(dpoData.filter((dpo) => dpo.id !== id))
    }
  }

  const handleEdit = (id) => {
    console.log('Edit DPO with ID:', id)
    // Add your edit logic here
  }

  return (
    <div className="container py-3 rounded bg-white">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Manage DPO</h4>
        <button className="btn btn-sm btn-outline-primary" onClick={() => setShowModal(true)}>
          Add DPO
        </button>
      </div>

      {currentDpos.length > 0 ? (
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
              {currentDpos.map(({ id, name, phone, email }) => (
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
        <div className="text-center text-muted">No DPOs found.</div>
      )}

      {/* Add DPO Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New DPO</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Unique ID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="uniqueId"
                    value={newDpo.uniqueId}
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
                    value={newDpo.name}
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
                    value={newDpo.phone}
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
                    value={newDpo.email}
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
                <button type="button" className="btn btn-primary" onClick={handleAddDpo}>
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

export default ManageDpo