'use client'

import React, { useState } from 'react'

// Dummy HOI Data
const initialHoiData = [
  { id: 'HOI001', name: 'Logan Perry', phone: '9001123456', email: 'logan@example.com' },
  { id: 'HOI002', name: 'Chloe Martinez', phone: '9112233445', email: 'chloe@example.com' },
  { id: 'HOI003', name: 'Aiden Brooks', phone: '9223344556', email: 'aiden@example.com' },
  { id: 'HOI004', name: 'Lily Bryant', phone: '9334455667', email: 'lily@example.com' },
  { id: 'HOI005', name: 'Caleb Reynolds', phone: '9445566778', email: 'caleb@example.com' },
  { id: 'HOI006', name: 'Zoe Carter', phone: '9556677889', email: 'zoe@example.com' },
  { id: 'HOI007', name: 'Elijah Morgan', phone: '9667788990', email: 'elijah@example.com' },
]

const ManageHoi = () => {
  const [hoiData, setHoiData] = useState(initialHoiData)
  const [currentPage, setCurrentPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [newHoi, setNewHoi] = useState({
    uniqueId: '',
    name: '',
    phone: '',
    email: '',
  })

  const hoiPerPage = 6
  const totalPages = Math.ceil(hoiData.length / hoiPerPage)
  const startIndex = (currentPage - 1) * hoiPerPage
  const currentHois = hoiData.slice(startIndex, startIndex + hoiPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewHoi({ ...newHoi, [name]: value })
  }

  const handleAddHoi = () => {
    const { uniqueId, name, phone, email } = newHoi
    if (uniqueId && name && phone && email) {
      const duplicate = hoiData.find((hoi) => hoi.id === uniqueId)
      if (duplicate) {
        alert('An HOI with this Unique ID already exists.')
        return
      }

      const newEntry = {
        id: uniqueId,
        name,
        phone,
        email,
      }

      setHoiData([newEntry, ...hoiData])
      setNewHoi({ uniqueId: '', name: '', phone: '', email: '' })
      setShowModal(false)
      setCurrentPage(1)
    } else {
      alert('Please fill in all fields.')
    }
  }

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to remove this HOI?')
    if (confirmDelete) {
      setHoiData(hoiData.filter((hoi) => hoi.id !== id))
    }
  }

  const handleEdit = (id) => {
    console.log('Edit HOI with ID:', id)
    // Add your edit logic here
  }

  return (
    <div className="container py-3 rounded bg-white">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Manage HOI</h4>
        <button className="btn btn-sm btn-outline-primary" onClick={() => setShowModal(true)}>
          Add HOI
        </button>
      </div>

      {currentHois.length > 0 ? (
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
              {currentHois.map(({ id, name, phone, email }) => (
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
        <div className="text-center text-muted">No HOIs found.</div>
      )}

      {/* Add HOI Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New HOI</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Unique ID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="uniqueId"
                    value={newHoi.uniqueId}
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
                    value={newHoi.name}
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
                    value={newHoi.phone}
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
                    value={newHoi.email}
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
                <button type="button" className="btn btn-primary" onClick={handleAddHoi}>
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

export default ManageHoi