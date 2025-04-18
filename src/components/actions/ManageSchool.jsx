'use client'

import React, { useState } from 'react'

// Dummy School Data
const initialSchoolData = [
  { id: 'SCH001', state: 'Kerala', district: 'Thiruvananthapuram', brc: 'BRC-TVPM', schoolName: 'Govt UPS Vattiyoorkavu', email: 'vattiyoorkavu@gov.ker.in', phone: '9847012345' },
  { id: 'SCH002', state: 'Kerala', district: 'Kozhikode', brc: 'BRC-KKD', schoolName: 'St. Mary\'s High School', email: 'stmaryskkd@edu.ker.in', phone: '9895011122' },
  { id: 'SCH003', state: 'Kerala', district: 'Ernakulam', brc: 'BRC-ERN', schoolName: 'Chinmaya Vidyalaya', email: 'chinmayaernakulam@edu.in', phone: '9744012345' },
  { id: 'SCH004', state: 'Kerala', district: 'Kannur', brc: 'BRC-KNR', schoolName: 'GHSS Thalassery', email: 'ghssthalassery@kerala.gov.in', phone: '9633123456' },
  { id: 'SCH005', state: 'Kerala', district: 'Alappuzha', brc: 'BRC-ALP', schoolName: 'Sanatana Dharma School', email: 'sdschool@alappuzha.in', phone: '9846009876' },
  { id: 'SCH006', state: 'Kerala', district: 'Palakkad', brc: 'BRC-PLKD', schoolName: 'Kendriya Vidyalaya Kanjikode', email: 'kvkanjikode@nic.in', phone: '9447554433' },
  { id: 'SCH007', state: 'Kerala', district: 'Malappuram', brc: 'BRC-MLP', schoolName: 'MES International School', email: 'mesmalappuram@school.in', phone: '9605322890' },
  { id: 'SCH008', state: 'Kerala', district: 'Pathanamthitta', brc: 'BRC-PTA', schoolName: 'Mount Bethany Public School', email: 'mountbethany@ptaschools.in', phone: '9567422188' },
]

const ManageSchools = () => {
  const [schoolData, setSchoolData] = useState(initialSchoolData)
  const [currentPage, setCurrentPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [newSchool, setNewSchool] = useState({
    id: '',
    state: '',
    district: '',
    brc: '',
    schoolName: '',
    email: '',
    phone: '',
  })

  const schoolsPerPage = 6
  const totalPages = Math.ceil(schoolData.length / schoolsPerPage)
  const startIndex = (currentPage - 1) * schoolsPerPage
  const currentSchools = schoolData.slice(startIndex, startIndex + schoolsPerPage)

  const handlePageChange = (page) => setCurrentPage(page)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewSchool({ ...newSchool, [name]: value })
  }

  const handleAddSchool = () => {
    const { id, state, district, brc, schoolName, email, phone } = newSchool
    if (id && state && district && brc && schoolName && email && phone) {
      const duplicate = schoolData.find((school) => school.id === id)
      if (duplicate) {
        alert('A school with this ID already exists.')
        return
      }

      const newEntry = { id, state, district, brc, schoolName, email, phone }

      setSchoolData([newEntry, ...schoolData])
      setNewSchool({ id: '', state: '', district: '', brc: '', schoolName: '', email: '', phone: '' })
      setShowModal(false)
      setCurrentPage(1)
    } else {
      alert('Please fill in all fields.')
    }
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this school?')) {
      setSchoolData(schoolData.filter((school) => school.id !== id))
    }
  }

  const handleEdit = (id) => {
    console.log('Edit School with ID:', id)
    // Implement edit functionality if needed
  }

  return (
    <div className="container py-3 rounded bg-white">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Manage Schools</h4>
        <button className="btn btn-sm btn-outline-primary" onClick={() => setShowModal(true)}>
          Add School
        </button>
      </div>

      {currentSchools.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>State</th>
                <th>District</th>
                <th>BRC</th>
                <th>School Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentSchools.map(({ id, state, district, brc, schoolName, email, phone }) => (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{state}</td>
                  <td>{district}</td>
                  <td>{brc}</td>
                  <td className="text-start">{schoolName}</td>
                  <td>{email}</td>
                  <td>{phone}</td>
                  <td>
                    <div className="d-flex justify-content-center">
                      <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(id)}>
                        Edit
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(id)}>
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
        <div className="text-center text-muted">No schools found.</div>
      )}

      {/* Add School Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New School</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body">
                {['id', 'state', 'district', 'brc', 'schoolName', 'email', 'phone'].map((field) => (
                  <div className="mb-3" key={field}>
                    <label className="form-label text-capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      className="form-control"
                      name={field}
                      value={newSchool[field]}
                      onChange={handleInputChange}
                      placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                    />
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleAddSchool}>
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

export default ManageSchools