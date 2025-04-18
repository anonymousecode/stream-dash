'use client'
import React, { useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import useImageUpload from '@/hooks/useImageUpload'

const ProfileView = () => {
  const { handleImageUpload, uploadedImage } = useImageUpload()
  const [showModal, setShowModal] = useState(false)
  const [profileData, setProfileData] = useState({
    name: 'Navya K R',
    role: 'SPD',
    email: 'navya@example.com',
    phone: '9876543210',
    address: '123, ABC Road',
    city: 'Kannur',
    brc: 'BRC North Zone',
    district: 'Kannur',
    state: 'Kerala',
    badges: ['Top Performer', 'Course Star'],
    courses: ['Java Development', 'Spring Boot Essentials'],
    projects: ['Autism Detection ML Model', 'Twitter API Integration']
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = () => {
    // Here, you'd usually send the updated profileData to the backend
    console.log('Saved Profile:', profileData)
    setShowModal(false)
  }

  return (
    <div className="content-area">
      <PerfectScrollbar>
        <div className="container m-4 bg-white p-4 rounded shadow-sm" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3>Profile</h3>
            <button className="btn btn-primary me-4 rounded-2" onClick={() => setShowModal(true)}>
              Edit Profile
            </button>
          </div>

          {/* Profile details */}
          <div className="row">
            <div className="col-md-3 d-flex flex-column align-items-center">
              <img
                src={uploadedImage || '/images/logo-abbr.png'}
                className="img-fluid rounded-circle border"
                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                alt="Profile"
              />
              <input
                type="file"
                accept="image/*"
                hidden
                id="img"
                onChange={handleImageUpload}
              />
              <label htmlFor="img" className="btn mt-2" style={{
                fontSize: '0.85rem',
                padding: '4px 16px',
                borderRadius: '20px',
                border: '1px solid #6c757d',
                color: '#495057',
                backgroundColor: '#f8f9fa',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                width: '130px',
                textAlign: 'center'
              }}>
                Upload
              </label>
            </div>

            <div className="col-md-9">
              {Object.entries({
                Name: profileData.name,
                Role: profileData.role,
                Email: profileData.email,
                Phone: profileData.phone,
                Address: profileData.address,
                City: profileData.city,
                BRC: profileData.brc,
                District: profileData.district,
                State: profileData.state
              }).map(([label, value]) => (
                <div className="mb-2 row" key={label}>
                  <label className="col-sm-3 col-form-label fw-bold">{label}</label>
                  <div className="col-sm-9">
                    <p className="form-control-plaintext">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr className="my-4" />

          {/* Badges */}
          <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="fw-bold">Badges</h5>
              <a href="#" className="text-decoration-none fw-semibold me-3">view all</a>
            </div>
            <div className="d-flex overflow-auto">
              {profileData.badges.map((badge, index) => (
                <div className="card me-3 text-center" style={{ minWidth: '150px' }} key={index}>
                  <img src="https://via.placeholder.com/150x100.png?text=Badge" className="card-img-top" alt={badge} />
                  <div className="card-body p-2">
                    <div className="fw-semibold">{badge}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Courses */}
          <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="fw-bold">Courses Completed</h5>
              <a href="#" className="text-decoration-none fw-semibold me-3">view all</a>
            </div>
            <div className="d-flex overflow-auto">
              {profileData.courses.map((course, index) => (
                <div className="card me-3 text-center" style={{ minWidth: '150px' }} key={index}>
                  <img src="https://via.placeholder.com/150x100.png?text=Course" className="card-img-top" alt={course} />
                  <div className="card-body p-2">
                    <div className="fw-semibold">{course}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="container mt-4 mb-5">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="fw-bold">Projects</h5>
              <a href="#" className="text-decoration-none fw-semibold me-3">view all</a>
            </div>
            <div className="d-flex overflow-auto">
              {profileData.projects.map((project, index) => (
                <div className="card me-3 text-center" style={{ minWidth: '150px' }} key={index}>
                  <img src="https://via.placeholder.com/150x100.png?text=Project" className="card-img-top" alt={project} />
                  <div className="card-body p-2">
                    <div className="fw-semibold">{project}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Edit Modal */}
          {showModal && (
            <div className="modal d-block" tabIndex="-1" role="dialog" style={{ background: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Edit Profile</h5>
                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                  </div>
                  <div className="modal-body">
                    {Object.entries(profileData).map(([key, value]) => {
                      if (Array.isArray(value)) return null // skip badges/courses/projects
                      return (
                        <div className="mb-3" key={key}>
                          <label className="form-label text-capitalize">{key}</label>
                          <input
                            type="text"
                            name={key}
                            value={value}
                            onChange={handleInputChange}
                            className="form-control"
                          />
                        </div>
                      )
                    })}
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                    <button type="button" className="btn btn-primary" onClick={handleSave}>Save changes</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </PerfectScrollbar>
    </div>
  )
}

export default ProfileView
