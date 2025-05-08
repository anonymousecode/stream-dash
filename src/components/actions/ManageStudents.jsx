'use client'

import React, { useState } from 'react'

// Dummy Student Data
const initialStudentData = [
  { id: 'STU001', name: 'Aarav Nair', class: '10A', age: 15, email: 'aaravnair@gmail.com', phone: '9876543210' },
  { id: 'STU002', name: 'Ananya Menon', class: '9B', age: 14, email: 'ananyamenon@gmail.com', phone: '9876543211' },
  { id: 'STU003', name: 'Rahul Das', class: '11C', age: 16, email: 'rahuldas@gmail.com', phone: '9876543212' },
  { id: 'STU004', name: 'Sneha Suresh', class: '8A', age: 13, email: 'snehasuresh@gmail.com', phone: '9876543213' },
  { id: 'STU005', name: 'Vishnu Raj', class: '12B', age: 17, email: 'vishnuraj@gmail.com', phone: '9876543214' },
  { id: 'STU006', name: 'Meera Joseph', class: '10B', age: 15, email: 'meerajoseph@gmail.com', phone: '9876543215' },
  { id: 'STU007', name: 'Arjun Kumar', class: '9A', age: 14, email: 'arjunkumar@gmail.com', phone: '9876543216' },
  { id: 'STU008', name: 'Diya Mathew', class: '11A', age: 16, email: 'diyamathew@gmail.com', phone: '9876543217' },
]

const ManageStudents = () => {
  const [studentData, setStudentData] = useState(initialStudentData)
  const [currentPage, setCurrentPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [newStudent, setNewStudent] = useState({
    id: '',
    name: '',
    class: '',
    age: '',
    email: '',
    phone: '',
  })

  const studentsPerPage = 6
  const totalPages = Math.ceil(studentData.length / studentsPerPage)
  const startIndex = (currentPage - 1) * studentsPerPage
  const currentStudents = studentData.slice(startIndex, startIndex + studentsPerPage)

  const handlePageChange = (page) => setCurrentPage(page)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewStudent({ ...newStudent, [name]: value })
  }

  const handleAddStudent = () => {
    const { id, name, class: studentClass, age, email, phone } = newStudent
    if (id && name && studentClass && age && email && phone) {
      const duplicate = studentData.find((student) => student.id === id)
      if (duplicate) {
        alert('A student with this ID already exists.')
        return
      }

      const newEntry = { id, name, class: studentClass, age, email, phone }

      setStudentData([newEntry, ...studentData])
      setNewStudent({ id: '', name: '', class: '', age: '', email: '', phone: '' })
      setShowModal(false)
      setCurrentPage(1)
    } else {
      alert('Please fill in all fields.')
    }
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this student?')) {
      setStudentData(studentData.filter((student) => student.id !== id))
    }
  }

  const handleEdit = (id) => {
    console.log('Edit Student with ID:', id)
    // Implement edit functionality if needed
  }

  return (
    <div className="container py-3 rounded bg-white">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Manage Students</h4>
        <button className="btn btn-sm btn-outline-primary" onClick={() => setShowModal(true)}>
          Add Student
        </button>
      </div>

      {currentStudents.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Class</th>
                <th>Age</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map(({ id, name, class: studentClass, age, email, phone }) => (
                <tr key={id}>
                  <td>{id}</td>
                  <td className="text-start">{name}</td>
                  <td>{studentClass}</td>
                  <td>{age}</td>
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
        <div className="text-center text-muted">No students found.</div>
      )}

      {/* Add Student Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Student</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body">
                {['id', 'name', 'class', 'age', 'email', 'phone'].map((field) => (
                  <div className="mb-3" key={field}>
                    <label className="form-label text-capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                    <input
                      type={field === 'email' ? 'email' : (field === 'age' ? 'number' : 'text')}
                      className="form-control"
                      name={field}
                      value={newStudent[field]}
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
                <button className="btn btn-primary" onClick={handleAddStudent}>
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

export default ManageStudents
