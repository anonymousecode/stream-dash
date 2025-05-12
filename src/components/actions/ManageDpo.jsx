'use client'

import React, { useState } from 'react'

// Initial DPO Data
const initialDpoData = [
  { id: 'DPO001', name: 'Anjali Nair', district: 'Ernakulam', phone: '9876543210', email: 'anjali@example.com', startDate: '2023-01-01', endDate: '', isRemoved: false },
  { id: 'DPO002', name: 'Rajesh Kumar', district: 'Wayanad', phone: '9123456780', email: 'rajesh@example.com', startDate: '2023-02-01', endDate: '', isRemoved: false },
  { id: 'DPO003', name: 'Sreedevi Menon', district: 'Kozhikode', phone: '9876543211', email: 'sree@example.com', startDate: '2023-03-01', endDate: '', isRemoved: false },
  { id: 'DPO004', name: 'Arun Kumar', district: 'Kollam', phone: '9123456781', email: 'arun@example.com', startDate: '2023-04-01', endDate: '', isRemoved: false },
  { id: 'DPO005', name: 'Priya Nair', district: 'Malappuram', phone: '9876543212', email: 'priya@example.com', startDate: '2023-05-01', endDate: '', isRemoved: false },
  { id: 'DPO006', name: 'Kannan Ramesh', district: 'Pathanamthitta', phone: '9123456782', email: 'kannan@example.com', startDate: '2023-06-01', endDate: '', isRemoved: false },
  { id: 'DPO007', name: 'Sanjay Kumar', district: 'Thiruvananthapuram', phone: '9876543213', email: 'sanjay@example.com', startDate: '2023-07-01', endDate: '', isRemoved: false },
  { id: 'DPO008', name: 'Lakshmi Devi', district: 'Thrissur', phone: '9123456783', email: 'lakshmi@example.com', startDate: '2023-08-01', endDate: '', isRemoved: false },
  { id: 'DPO009', name: 'Ravi Shankar', district: 'Kasaragod', phone: '9876543214', email: 'ravi@example.com', startDate: '2023-09-01', endDate: '', isRemoved: false },
  { id: 'DPO010', name: 'Vishnu Raj', district: 'Idukki', phone: '9123456784', email: 'vishnu@example.com', startDate: '2023-10-01', endDate: '', isRemoved: false }
]

const ManageDpo = () => {
  const [dpoData, setDpoData] = useState(initialDpoData)
  const [currentPage, setCurrentPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editId, setEditId] = useState(null)

  const [newDpo, setNewDpo] = useState({
    uniqueId: '',
    name: '',
    district: '',
    phone: '',
    email: '',
    startDate: '',
    endDate: '',
  })

  const dpoPerPage = 10
  const totalPages = Math.ceil(dpoData.length / dpoPerPage)
  const startIndex = (currentPage - 1) * dpoPerPage
  const currentDpos = dpoData.slice(startIndex, startIndex + dpoPerPage)

  const handlePageChange = (page) => setCurrentPage(page)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewDpo({ ...newDpo, [name]: value })
  }

  const handleAddDpo = () => {
    const { uniqueId, name, district, phone, email, startDate } = newDpo
    if (!uniqueId || !name || !district || !phone || !email || !startDate) {
      alert('Please fill in all required fields.')
      return
    }

    if (isEditMode) {
      const updatedData = dpoData.map((dpo) =>
        dpo.id === editId ? { ...dpo, ...newDpo, id: editId } : dpo
      )
      setDpoData(updatedData)
    } else {
      const duplicate = dpoData.find((dpo) => dpo.id === uniqueId)
      if (duplicate) {
        alert('A DPO with this Unique ID already exists.')
        return
      }

      const districtExists = dpoData.some((dpo) => dpo.district === district && !dpo.isRemoved)
      if (districtExists) {
        alert('A DPO already exists for this district.')
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

      setDpoData([newEntry, ...dpoData])
    }

    setNewDpo({ uniqueId: '', name: '', district: '', phone: '', email: '', startDate: '', endDate: '' })
    setShowModal(false)
    setIsEditMode(false)
    setEditId(null)
    setCurrentPage(1)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this DPO?')) {
      const today = new Date().toISOString().split('T')[0]
      const updatedDpoData = dpoData.map((dpo) =>
        dpo.id === id ? { ...dpo, endDate: today, isRemoved: true } : dpo
      )
      setDpoData(updatedDpoData)
    }
  }

  const handleEdit = (id) => {
    const dpoToEdit = dpoData.find((dpo) => dpo.id === id)
    setNewDpo({
      uniqueId: dpoToEdit.id,
      name: dpoToEdit.name,
      district: dpoToEdit.district,
      phone: dpoToEdit.phone,
      email: dpoToEdit.email,
      startDate: dpoToEdit.startDate,
      endDate: dpoToEdit.endDate || '',
    })
    setEditId(id)
    setIsEditMode(true)
    setShowModal(true)
  }

  return (
    <div className="container py-3 rounded bg-white">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Manage DPO</h4>
        <button className="btn btn-sm btn-outline-primary" onClick={() => {
          setShowModal(true)
          setIsEditMode(false)
          setNewDpo({ uniqueId: '', name: '', district: '', phone: '', email: '', startDate: '', endDate: '' })
        }}>
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
                <th>District</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentDpos.map(({ id, name, district, phone, email, startDate, endDate, isRemoved }) => (
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

      {/* Add/Edit DPO Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isEditMode ? 'Edit DPO' : 'Add New DPO'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body">
                {['uniqueId', 'name', 'district', 'phone', 'email', 'startDate'].map((field) => (
                  <div className="mb-3" key={field}>
                    <label className="form-label">
                      {field === 'uniqueId'
                        ? 'Unique ID'
                        : field === 'startDate'
                        ? 'Start Date'
                        : field === 'district'
                        ? 'District'
                        : field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    {field === 'district' ? (
                      <select
                        className="form-control"
                        name={field}
                        value={newDpo[field]}
                        onChange={handleInputChange}
                      >
                        <option value="">Select District</option>
                        {['Ernakulam', 'Wayanad', 'Kozhikode', 'Kollam', 'Malappuram', 'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Kasaragod', 'Idukki', 'Kottayam', 'Alappuzha', 'Kannur'].map((district) => (
                          <option key={district} value={district}>{district}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.includes('Date') ? 'date' : field === 'email' ? 'email' : 'text'}
                        className="form-control"
                        name={field}
                        value={newDpo[field]}
                        onChange={handleInputChange}
                        placeholder={`Enter ${field}`}
                        disabled={field === 'uniqueId' && isEditMode}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddDpo}
                >
                  {isEditMode ? 'Update DPO' : 'Add DPO'}
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