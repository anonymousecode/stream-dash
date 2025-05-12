'use client'

import React, { useState } from 'react'

const initialDpcData = [
  { id: 'DPC001', name: 'Anjali Nair', district: 'Ernakulam', phone: '9876543210', email: 'anjali@example.com', startDate: '2023-01-01', endDate: '', isRemoved: false },
  { id: 'DPC002', name: 'Rajesh Kumar', district: 'Wayanad', phone: '9123456780', email: 'rajesh@example.com', startDate: '2023-02-01', endDate: '', isRemoved: false },
  { id: 'DPC003', name: 'Sreedevi Menon', district: 'Kozhikode', phone: '9876543211', email: 'sree@example.com', startDate: '2023-03-01', endDate: '', isRemoved: false },
  { id: 'DPC004', name: 'Arun Kumar', district: 'Kollam', phone: '9123456781', email: 'arun@example.com', startDate: '2023-04-01', endDate: '', isRemoved: false },
  { id: 'DPC005', name: 'Priya Nair', district: 'Malappuram', phone: '9876543212', email: 'priya@example.com', startDate: '2023-05-01', endDate: '', isRemoved: false },
  { id: 'DPC006', name: 'Kannan Ramesh', district: 'Pathanamthitta', phone: '9123456782', email: 'kannan@example.com', startDate: '2023-06-01', endDate: '', isRemoved: false },
  { id: 'DPC007', name: 'Sanjay Kumar', district: 'Thiruvananthapuram', phone: '9876543213', email: 'sanjay@example.com', startDate: '2023-07-01', endDate: '', isRemoved: false },
  { id: 'DPC008', name: 'Lakshmi Devi', district: 'Thrissur', phone: '9123456783', email: 'lakshmi@example.com', startDate: '2023-08-01', endDate: '', isRemoved: false },
  { id: 'DPC009', name: 'Ravi Shankar', district: 'Kasaragod', phone: '9876543214', email: 'ravi@example.com', startDate: '2023-09-01', endDate: '', isRemoved: false },
  { id: 'DPC010', name: 'Vishnu Raj', district: 'Idukki', phone: '9123456784', email: 'vishnu@example.com', startDate: '2023-10-01', endDate: '', isRemoved: false }
]

const districtsList = ['Ernakulam', 'Wayanad', 'Kozhikode', 'Kollam', 'Malappuram', 'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Kasaragod', 'Idukki', 'Kottayam', 'Alappuzha', 'Kannur']

const ManageDpc = () => {
  const [dpcData, setDpcData] = useState(initialDpcData)
  const [currentPage, setCurrentPage] = useState(1)

  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const [newDpc, setNewDpc] = useState({ uniqueId: '', name: '', district: '', phone: '', email: '', startDate: '', endDate: '' })
  const [editingDpc, setEditingDpc] = useState(null)

  const dpcPerPage = 10
  const totalPages = Math.ceil(dpcData.length / dpcPerPage)
  const startIndex = (currentPage - 1) * dpcPerPage
  const currentDpcs = dpcData.slice(startIndex, startIndex + dpcPerPage)

  const handleInputChange = (e, isEdit = false) => {
    const { name, value } = e.target
    if (isEdit) {
      setEditingDpc({ ...editingDpc, [name]: value })
    } else {
      setNewDpc({ ...newDpc, [name]: value })
    }
  }

  const handleAddDpc = () => {
    const { uniqueId, name, district, phone, email, startDate } = newDpc
    if (uniqueId && name && district && phone && email && startDate) {
      const duplicate = dpcData.find((dpc) => dpc.id === uniqueId)
      if (duplicate) {
        alert('A DPC with this Unique ID already exists.')
        return
      }

      const districtExists = dpcData.some((dpc) => dpc.district === district && !dpc.isRemoved)
      if (districtExists) {
        alert('A DPC already exists for this district.')
        return
      }

      const newEntry = {
        id: uniqueId,
        name,
        district,
        phone,
        email,
        startDate,
        endDate: '',
        isRemoved: false,
      }

      setDpcData([newEntry, ...dpcData])
      setNewDpc({ uniqueId: '', name: '', district: '', phone: '', email: '', startDate: '', endDate: '' })
      setShowAddModal(false)
      setCurrentPage(1)
    } else {
      alert('Please fill in all required fields.')
    }
  }

  const handleEdit = (id) => {
    const dpcToEdit = dpcData.find((dpc) => dpc.id === id)
    if (dpcToEdit) {
      setEditingDpc({ ...dpcToEdit })
      setShowEditModal(true)
    }
  }

  const handleUpdateDpc = () => {
    const updatedList = dpcData.map((dpc) => (dpc.id === editingDpc.id ? editingDpc : dpc))
    setDpcData(updatedList)
    setShowEditModal(false)
    setEditingDpc(null)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this DPC?')) {
      const today = new Date().toISOString().split('T')[0]
      const updatedDpcData = dpcData.map((dpc) =>
        dpc.id === id ? { ...dpc, endDate: today, isRemoved: true } : dpc
      )
      setDpcData(updatedDpcData)
    }
  }

  return (
    <div className="container py-3 rounded bg-white">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Manage DPC</h4>
        <button className="btn btn-sm btn-outline-primary" onClick={() => setShowAddModal(true)}>
          Add DPC
        </button>
      </div>

      {currentDpcs.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>Unique ID</th>
                <th>Name</th>
                <th>District</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentDpcs.map(({ id, name, district, phone, email, startDate, endDate, isRemoved }) => (
                <tr key={id}>
                  <td>{id}</td>
                  <td className="text-start">{name}</td>
                  <td>{district}</td>
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
                <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(page)}>
                    {page}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : (
        <div className="text-center text-muted">No DPCs found.</div>
      )}

      {/* Reusable Modal Component */}
      {(showAddModal || showEditModal) && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{showEditModal ? 'Edit DPC' : 'Add New DPC'}</h5>
                <button type="button" className="btn-close" onClick={() => { setShowAddModal(false); setShowEditModal(false) }} />
              </div>
              <div className="modal-body">
                {(showEditModal ? Object.keys(editingDpc || {}) : Object.keys(newDpc)).map((field) => {
                  if (field === 'isRemoved') return null
                  const value = showEditModal ? editingDpc[field] : newDpc[field]
                  return (
                    <div className="mb-3" key={field}>
                      <label className="form-label">
                        {field === 'uniqueId' || field === 'id' ? 'Unique ID' : field === 'startDate' ? 'Start Date' : field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      {field === 'district' ? (
                        <select
                          className="form-control"
                          name={field}
                          value={value}
                          onChange={(e) => handleInputChange(e, showEditModal)}
                        >
                          <option value="">Select District</option>
                          {districtsList.map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.includes('Date') ? 'date' : field === 'email' ? 'email' : 'text'}
                          className="form-control"
                          name={field}
                          value={value}
                          disabled={(field === 'uniqueId' || field === 'id') && showEditModal}
                          onChange={(e) => handleInputChange(e, showEditModal)}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => { setShowAddModal(false); setShowEditModal(false) }}>
                  Close
                </button>
                <button className="btn btn-primary" onClick={showEditModal ? handleUpdateDpc : handleAddDpc}>
                  {showEditModal ? 'Update DPC' : 'Add DPC'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageDpc