'use client'

import React, { useState } from 'react'

// SPO data
const initialSpoData = [
  { id: 'SPO001', name: 'Anjali Nair', phone: '9876543210', email: 'anjali@example.com', startDate: '2023-01-01', endDate: '', isRemoved: false },
  { id: 'SPO002', name: 'Rajesh Kumar', phone: '9123456780', email: 'rajesh@example.com', startDate: '2023-02-01', endDate: '', isRemoved: false },
  { id: 'SPO003', name: 'Divya Menon', phone: '9012345678', email: 'divya@example.com', startDate: '2023-03-15', endDate: '', isRemoved: false },
  { id: 'SPO004', name: 'Arjun R', phone: '9345678123', email: 'arjun@example.com', startDate: '2023-05-01', endDate: '', isRemoved: false },
  { id: 'SPO005', name: 'Lekshmi R', phone: '9988776655', email: 'lekshmi@example.com', startDate: '2023-06-10', endDate: '', isRemoved: false },
  { id: 'SPO006', name: 'Vivek B', phone: '9112233445', email: 'vivek@example.com', startDate: '2023-07-01', endDate: '', isRemoved: false },
  { id: 'SPO007', name: 'Meera K', phone: '9090909090', email: 'meera@example.com', startDate: '2023-08-01', endDate: '', isRemoved: false },
  { id: 'SPO008', name: 'Neha Joseph', phone: '9876512345', email: 'neha@example.com', startDate: '2023-09-01', endDate: '', isRemoved: false },
  { id: 'SPO009', name: 'Ajay Dev', phone: '9123467890', email: 'ajay@example.com', startDate: '2023-10-01', endDate: '', isRemoved: false },
  { id: 'SPO010', name: 'Fathima B', phone: '9000011111', email: 'fathima@example.com', startDate: '2023-11-01', endDate: '', isRemoved: false },
]

const ManageSpo = () => {
  const [spoData, setSpoData] = useState(initialSpoData)
  const [currentPage, setCurrentPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingSpo, setEditingSpo] = useState(null)

  const [newSpo, setNewSpo] = useState({
    uniqueId: '',
    name: '',
    phone: '',
    email: '',
    startDate: '',
    endDate: '',
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
    const { uniqueId, name, phone, email, startDate } = newSpo
    if (uniqueId && name && phone && email && startDate) {
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
        startDate,
        endDate: '',
        isRemoved: false,
      }

      setSpoData([newEntry, ...spoData])
      setNewSpo({ uniqueId: '', name: '', phone: '', email: '', startDate: '', endDate: '' })
      setShowModal(false)
      setCurrentPage(1)
    } else {
      alert('Please fill in all required fields.')
    }
  }

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to remove this SPO?')
    if (confirmDelete) {
      const today = new Date().toISOString().split('T')[0]
      const updatedSpoData = spoData.map((spo) =>
        spo.id === id
          ? { ...spo, endDate: today, isRemoved: true }
          : spo
      )
      setSpoData(updatedSpoData)
    }
  }

  const handleEdit = (id) => {
    const selectedSpo = spoData.find((spo) => spo.id === id)
    if (selectedSpo) {
      setEditingSpo(selectedSpo)
      setEditModalOpen(true)
    }
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditingSpo({ ...editingSpo, [name]: value })
  }

  const handleUpdateSpo = () => {
    const updatedData = spoData.map((spo) =>
      spo.id === editingSpo.id ? { ...editingSpo } : spo
    )
    setSpoData(updatedData)
    setEditModalOpen(false)
    setEditingSpo(null)
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
                <th>Start Date</th>
                <th>End Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentSpos.map(({ id, name, phone, email, startDate, endDate, isRemoved }) => (
                <tr key={id}>
                  <td>{id}</td>
                  <td className="text-start">{name}</td>
                  <td>{phone}</td>
                  <td>{email}</td>
                  <td>{startDate}</td>
                  <td>{endDate || '-'}</td>
                  <td>
                    <div className="d-flex justify-content-center">
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleEdit(id)}
                        disabled={isRemoved}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(id)}
                        disabled={isRemoved}
                      >
                        {isRemoved ? 'Removed' : 'Remove'}
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
                {['uniqueId', 'name', 'phone', 'email', 'startDate'].map((field) => (
                  <div className="mb-3" key={field}>
                    <label className="form-label">
                      {field === 'uniqueId'
                        ? 'Unique ID'
                        : field === 'startDate'
                        ? 'Start Date'
                        : field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      type={field.includes('Date') ? 'date' : field === 'email' ? 'email' : 'text'}
                      className="form-control"
                      name={field}
                      value={newSpo[field]}
                      onChange={handleInputChange}
                      placeholder={`Enter ${field}`}
                    />
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
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

      {/* Edit SPO Modal */}
      {editModalOpen && editingSpo && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit SPO</h5>
                <button type="button" className="btn-close" onClick={() => setEditModalOpen(false)} />
              </div>
              <div className="modal-body">
                {['name', 'phone', 'email', 'startDate', 'endDate'].map((field) => (
                  <div className="mb-3" key={field}>
                    <label className="form-label">
                      {field === 'startDate'
                        ? 'Start Date'
                        : field === 'endDate'
                        ? 'End Date'
                        : field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      type={field.includes('Date') ? 'date' : field === 'email' ? 'email' : 'text'}
                      className="form-control"
                      name={field}
                      value={editingSpo[field] || ''}
                      onChange={handleEditChange}
                    />
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setEditModalOpen(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={handleUpdateSpo}>
                  Update
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
