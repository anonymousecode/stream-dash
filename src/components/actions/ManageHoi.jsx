'use client'

import React, { useState } from 'react'

// Initial HOI Data
const initialHoiData = [
  { id: 'HOI001', name: 'Suresh Menon', district: 'Ernakulam', brc: 'BRC 1', school: 'Govt HSS Kaloor', phone: '9876543211', email: 'suresh@example.com', startDate: '2023-01-01', endDate: '', isRemoved: false },
  { id: 'HOI002', name: 'Meena Paul', district: 'Wayanad', brc: 'BRC 2', school: 'Govt UPS Sultan Bathery', phone: '9123456781', email: 'meena@example.com', startDate: '2023-02-15', endDate: '', isRemoved: false }
]

const ManageHoi = () => {
  const [hoiData, setHoiData] = useState(initialHoiData)
  const [currentPage, setCurrentPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editId, setEditId] = useState(null)

  const [newHoi, setNewHoi] = useState({
    uniqueId: '',
    name: '',
    district: '',
    brc: '',
    school: '',
    phone: '',
    email: '',
    startDate: '',
    endDate: '',
  })

  const hoiPerPage = 10
  const totalPages = Math.ceil(hoiData.length / hoiPerPage)
  const startIndex = (currentPage - 1) * hoiPerPage
  const currentHois = hoiData.slice(startIndex, startIndex + hoiPerPage)

  const handlePageChange = (page) => setCurrentPage(page)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewHoi({ ...newHoi, [name]: value })
  }

  const handleAddHoi = () => {
    const { uniqueId, name, district, brc, school, phone, email, startDate } = newHoi
    if (!uniqueId || !name || !district || !brc || !school || !phone || !email || !startDate) {
      alert('Please fill in all required fields.')
      return
    }

    if (isEditMode) {
      const updatedData = hoiData.map((hoi) =>
        hoi.id === editId ? { ...hoi, ...newHoi, id: editId } : hoi
      )
      setHoiData(updatedData)
    } else {
      const duplicate = hoiData.find((hoi) => hoi.id === uniqueId)
      if (duplicate) {
        alert('A HOI with this Unique ID already exists.')
        return
      }

      const districtExists = hoiData.some((hoi) =>
        hoi.district === district && hoi.brc === brc && hoi.school === school && !hoi.isRemoved
      )
      if (districtExists) {
        alert('A HOI already exists for this district, BRC, and school.')
        return
      }

      const newEntry = {
        id: uniqueId,
        name,
        district,
        brc,
        school,
        phone,
        email,
        startDate,
        endDate: '',
        isRemoved: false,
      }

      setHoiData([newEntry, ...hoiData])
    }

    setNewHoi({ uniqueId: '', name: '', district: '', brc: '', school: '', phone: '', email: '', startDate: '', endDate: '' })
    setShowModal(false)
    setIsEditMode(false)
    setEditId(null)
    setCurrentPage(1)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this HOI?')) {
      const today = new Date().toISOString().split('T')[0]
      const updatedHoiData = hoiData.map((hoi) =>
        hoi.id === id ? { ...hoi, endDate: today, isRemoved: true } : hoi
      )
      setHoiData(updatedHoiData)
    }
  }

  const handleEdit = (id) => {
    const hoiToEdit = hoiData.find((hoi) => hoi.id === id)
    setNewHoi({
      uniqueId: hoiToEdit.id,
      name: hoiToEdit.name,
      district: hoiToEdit.district,
      brc: hoiToEdit.brc,
      school: hoiToEdit.school,
      phone: hoiToEdit.phone,
      email: hoiToEdit.email,
      startDate: hoiToEdit.startDate,
      endDate: hoiToEdit.endDate || '',
    })
    setEditId(id)
    setIsEditMode(true)
    setShowModal(true)
  }

  return (
    <div className="container py-3 rounded bg-white">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Manage HOI</h4>
        <button className="btn btn-sm btn-outline-primary" onClick={() => {
          setShowModal(true)
          setIsEditMode(false)
          setNewHoi({ uniqueId: '', name: '', district: '', brc: '', school: '', phone: '', email: '', startDate: '', endDate: '' })
        }}>
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
                <th>District</th>
                <th>BRC</th>
                <th>School</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentHois.map(({ id, name, district, brc, school, phone, email, startDate, endDate, isRemoved }) => (
                <tr key={id}>
                  <td>{id}</td>
                  <td className="text-start">{name}</td>
                  <td>{district}</td>
                  <td>{brc}</td>
                  <td>{school}</td>
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
        <div className="text-center text-muted">No HOIs found.</div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isEditMode ? 'Edit HOI' : 'Add New HOI'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body">
                {['uniqueId', 'name', 'district', 'brc', 'school', 'phone', 'email', 'startDate'].map((field) => (
                  <div className="mb-3" key={field}>
                    <label className="form-label">
                      {field === 'uniqueId'
                        ? 'Unique ID'
                        : field === 'startDate'
                        ? 'Start Date'
                        : field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    {['district', 'brc'].includes(field) ? (
                      <select
                        className="form-control"
                        name={field}
                        value={newHoi[field]}
                        onChange={handleInputChange}
                      >
                        <option value="">Select {field}</option>
                        {field === 'district' ? (
                          ['Ernakulam', 'Wayanad', 'Kozhikode', 'Kollam', 'Malappuram', 'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Kasaragod', 'Idukki', 'Kottayam', 'Alappuzha', 'Kannur'].map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))
                        ) : (
                          ['BRC 1', 'BRC 2', 'BRC 3', 'BRC 4'].map((brc) => (
                            <option key={brc} value={brc}>{brc}</option>
                          ))
                        )}
                      </select>
                    ) : (
                      <input
                        type={field.includes('Date') ? 'date' : field === 'email' ? 'email' : 'text'}
                        className="form-control"
                        name={field}
                        value={newHoi[field]}
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
                <button type="button" className="btn btn-primary" onClick={handleAddHoi}>
                  {isEditMode ? 'Update HOI' : 'Add HOI'}
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
