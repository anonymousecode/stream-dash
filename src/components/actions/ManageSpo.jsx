'use client'

import React, { useState } from 'react'

// Dummy SPO Data
const initialSpoData = [
  { id: 'SPO001', name: 'Anjali Nair', phone: '9876543210', email: 'anjali@example.com' },
  { id: 'SPO002', name: 'Rajesh Kumar', phone: '9123456780', email: 'rajesh@example.com' },
  { id: 'SPO003', name: 'Divya Menon', phone: '9012345678', email: 'divya@example.com' },
  { id: 'SPO004', name: 'Arjun R', phone: '9345678123', email: 'arjun@example.com' },
  { id: 'SPO005', name: 'Lekshmi R', phone: '9988776655', email: 'lekshmi@example.com' },
  { id: 'SPO006', name: 'Vivek B', phone: '9112233445', email: 'vivek@example.com' },
  { id: 'SPO007', name: 'Meera K', phone: '9090909090', email: 'meera@example.com' },
]

const ManageSpo = () => {
  const [spoData, setSpoData] = useState(initialSpoData)
  const [currentPage, setCurrentPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [newSpo, setNewSpo] = useState({
    uniqueId: '',
    name: '',
    phone: '',
    email: '',
  })

  const spoPerPage = 6
  const totalPages = Math.ceil(spoData.length / spoPerPage)
  const startIndex = (currentPage - 1) * spoPerPage
  const currentSpos = spoData.slice(startIndex, startIndex + spoPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewSpo({ ...newSpo, [name]: value })
  }

  const handleAddSpo = () => {
    const { uniqueId, name, phone, email } = newSpo
    if (uniqueId && name && phone && email) {
      const duplicate = spoData.find((spo) => spo.id === uniqueId)
      if (duplicate) {
        alert('A SPO with this Unique ID already exists.')
        return
      }

      const newEntry = {
        id: uniqueId,
        name,
        phone,
        email,
      }

      setSpoData([newEntry, ...spoData])
      setNewSpo({ uniqueId: '', name: '', phone: '', email: '' })
      setShowModal(false)
      setCurrentPage(1)
    } else {
      alert('Please fill in all fields.')
    }
  }

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to remove this SPO?')
    if (confirmDelete) {
      setSpoData(spoData.filter((spo) => spo.id !== id))
    }
  }

  const handleEdit = (id) => {
    console.log('Edit SPO with ID:', id)
    // Add your edit logic here
  }

  return (
    <div className="container py-3 rounded bg-white">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Manage SPO</h4>
        <button className="btn btn-sm btn-outline-primary" onClick={() => setShowModal(true)}>
          Add SPO
        </button>
      </div>

      {currentSpos.length > 0 ? (
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
              {currentSpos.map(({ id, name, phone, email }) => (
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
        <div className="text-center text-muted">No SPOs found.</div>
      )}

      {/* Add SPO Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New SPO</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Unique ID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="uniqueId"
                    value={newSpo.uniqueId}
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
                    value={newSpo.name}
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
                    value={newSpo.phone}
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
                    value={newSpo.email}
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
                <button type="button" className="btn btn-primary" onClick={handleAddSpo}>
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

export default ManageSpo
