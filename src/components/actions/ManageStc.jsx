'use client'

import React, { useState } from 'react'

// Initial STC Data
const initialStcData = [
  { id: 'STC001', name: 'Anjali Nair', district: 'Ernakulam', block: 'Block A', phone: '9876543210', email: 'anjali@example.com', startDate: '2023-01-01', endDate: '', isRemoved: false },
  { id: 'STC002', name: 'Rajesh Kumar', district: 'Wayanad', block: 'Block B', phone: '9123456780', email: 'rajesh@example.com', startDate: '2023-02-01', endDate: '', isRemoved: false },
  { id: 'STC003', name: 'Manoj Varma', district: 'Kollam', block: 'Block D', phone: '9098765432', email: 'manoj@example.com', startDate: '2023-04-10', endDate: '', isRemoved: false },
  { id: 'STC005', name: 'Deepa Rani', district: 'Malappuram', block: 'Block E', phone: '9812345678', email: 'deepa@example.com', startDate: '2023-05-15', endDate: '', isRemoved: false },
]

const ManageStc = () => {
  const [stcData, setStcData] = useState(initialStcData)
  const [currentPage, setCurrentPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editId, setEditId] = useState(null)

  const [newStc, setNewStc] = useState({
    uniqueId: '',
    name: '',
    district: '',
    block: '',
    phone: '',
    email: '',
    startDate: '',
    endDate: '',
  })

  const stcPerPage = 10
  const totalPages = Math.ceil(stcData.length / stcPerPage)
  const startIndex = (currentPage - 1) * stcPerPage
  const currentStcs = stcData.slice(startIndex, startIndex + stcPerPage)

  const handlePageChange = (page) => setCurrentPage(page)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewStc({ ...newStc, [name]: value })
  }

  const handleAddStc = () => {
    const { uniqueId, name, district, block, phone, email, startDate } = newStc
    if (!uniqueId || !name || !district || !block || !phone || !email || !startDate) {
      alert('Please fill in all required fields.')
      return
    }

    if (isEditMode) {
      const updatedData = stcData.map((stc) =>
        stc.id === editId ? { ...stc, ...newStc, id: editId } : stc
      )
      setStcData(updatedData)
    } else {
      const duplicate = stcData.find((stc) => stc.id === uniqueId)
      if (duplicate) {
        alert('An STC with this Unique ID already exists.')
        return
      }

      const districtExists = stcData.some((stc) => stc.district === district && stc.block === block && !stc.isRemoved)
      if (districtExists) {
        alert('An STC already exists for this district and block.')
        return
      }

      const newEntry = {
        id: uniqueId,
        name,
        district,
        block,
        phone,
        email,
        startDate,
        endDate: '',
        isRemoved: false,
      }

      setStcData([newEntry, ...stcData])
    }

    setNewStc({ uniqueId: '', name: '', district: '', block: '', phone: '', email: '', startDate: '', endDate: '' })
    setShowModal(false)
    setIsEditMode(false)
    setEditId(null)
    setCurrentPage(1)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this STC?')) {
      const today = new Date().toISOString().split('T')[0]
      const updatedStcData = stcData.map((stc) =>
        stc.id === id ? { ...stc, endDate: today, isRemoved: true } : stc
      )
      setStcData(updatedStcData)
    }
  }

  const handleEdit = (id) => {
    const stcToEdit = stcData.find((stc) => stc.id === id)
    setNewStc({
      uniqueId: stcToEdit.id,
      name: stcToEdit.name,
      district: stcToEdit.district,
      block: stcToEdit.block,
      phone: stcToEdit.phone,
      email: stcToEdit.email,
      startDate: stcToEdit.startDate,
      endDate: stcToEdit.endDate || '',
    })
    setEditId(id)
    setIsEditMode(true)
    setShowModal(true)
  }

  return (
    <div className="container py-3 rounded bg-white">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Manage STC</h4>
        <button className="btn btn-sm btn-outline-primary" onClick={() => {
          setShowModal(true)
          setIsEditMode(false)
          setNewStc({ uniqueId: '', name: '', district: '', block: '', phone: '', email: '', startDate: '', endDate: '' })
        }}>
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
                <th>District</th>
                <th>Block</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentStcs.map(({ id, name, district, block, phone, email, startDate, endDate, isRemoved }) => (
                <tr key={id}>
                  <td>{id}</td>
                  <td className="text-start">{name}</td>
                  <td>{district}</td>
                  <td>{block}</td>
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
        <div className="text-center text-muted">No STCs found.</div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isEditMode ? 'Edit STC' : 'Add New STC'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body">
                {['uniqueId', 'name', 'district', 'block', 'phone', 'email', 'startDate'].map((field) => (
                  <div className="mb-3" key={field}>
                    <label className="form-label">
                      {field === 'uniqueId'
                        ? 'Unique ID'
                        : field === 'startDate'
                        ? 'Start Date'
                        : field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    {['district', 'block'].includes(field) ? (
                      <select
                        className="form-control"
                        name={field}
                        value={newStc[field]}
                        onChange={handleInputChange}
                      >
                        <option value="">Select {field}</option>
                        {field === 'district' ? (
                          ['Ernakulam', 'Wayanad', 'Kozhikode', 'Kollam', 'Malappuram', 'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Kasaragod', 'Idukki', 'Kottayam', 'Alappuzha', 'Kannur'].map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))
                        ) : (
                          ['Block A', 'Block B', 'Block C', 'Block D', 'Block E'].map((block) => (
                            <option key={block} value={block}>{block}</option>
                          ))
                        )}
                      </select>
                    ) : (
                      <input
                        type={field.includes('Date') ? 'date' : field === 'email' ? 'email' : 'text'}
                        className="form-control"
                        name={field}
                        value={newStc[field]}
                        onChange={handleInputChange}
                        placeholder={`Enter ${field}`}
                        disabled={field === 'uniqueId' && isEditMode}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleAddStc}>
                  {isEditMode ? 'Update STC' : 'Add STC'}
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