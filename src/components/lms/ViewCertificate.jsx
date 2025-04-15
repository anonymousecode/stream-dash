'use client'

import React, { useState } from 'react'

const achievementData = [
    {
      id: 1,
      title: 'Introduction to Artificial Intelligence',
      type: 'Certificate',
      issuer: 'STREAM',
      image: 'https://source.unsplash.com/featured/?artificial-intelligence',
    },
    {
      id: 2,
      title: 'C Programming',
      type: 'Certificate',
      issuer: 'STREAM',
      image: 'https://source.unsplash.com/featured/?c-programming',
    },
    {
      id: 3,
      title: 'Frappe',
      type: 'Certificate',
      issuer: 'STREAM',
      image: 'https://source.unsplash.com/featured/?programming,code',
    },
    {
      id: 4,
      title: '3D Printing',
      type: 'Certificate',
      issuer: 'STREAM',
      image: 'https://source.unsplash.com/featured/?3d-printing',
    },
    {
      id: 5,
      title: 'Clay Modeling',
      type: 'Certificate',
      issuer: 'STREAM',
      image: 'https://source.unsplash.com/featured/?clay,modeling',
    },
    {
      id: 6,
      title: 'C++ Programming',
      type: 'Certificate',
      issuer: 'STREAM',
      image: 'https://source.unsplash.com/featured/?cplusplus',
    },
    {
      id: 7,
      title: 'Python Programming',
      type: 'Certificate',
      issuer: 'STREAM',
      image: 'https://source.unsplash.com/featured/?python,programming',
    },
    {
      id: 8,
      title: 'ML Workshop',
      type: 'Certificate',
      issuer: 'STREAM',
      image: 'https://source.unsplash.com/featured/?machine-learning',
    },
    {
      id: 9,
      title: 'ML Workshop',
      type: 'Badge',
      issuer: 'STREAM',
      image: 'https://source.unsplash.com/featured/?ml,badge',
    },
    {
      id: 10,
      title: 'C++',
      type: 'Badge',
      issuer: 'STREAM',
      image: 'https://source.unsplash.com/featured/?cplusplus,badge',
    },
    {
      id: 11,
      title: 'Robotics',
      type: 'Badge',
      issuer: 'STREAM',
      image: 'https://source.unsplash.com/featured/?robotics',
    },
    {
      id: 12,
      title: 'AI Workshop',
      type: 'Badge',
      issuer: 'STREAM',
      image: 'https://source.unsplash.com/featured/?ai,workshop',
    },
    {
      id: 13,
      title: 'ML Workshop',
      type: 'Badge',
      issuer: 'STREAM',
      image: 'https://source.unsplash.com/featured/?ml,workshop',
    },
    {
      id: 14,
      title: 'ML Workshop',
      type: 'Badge',
      issuer: 'STREAM',
      image: 'https://source.unsplash.com/featured/?machine-learning,badge',
    },
    {
      id: 15,
      title: 'Frappe',
      type: 'Badge',
      issuer: 'STREAM',
      image: 'https://source.unsplash.com/featured/?web-development',
    },
    {
      id: 16,
      title: '3D Printing',
      type: 'Badge',
      issuer: 'STREAM',
      image: 'https://source.unsplash.com/featured/?3d-printer',
    },
    {
      id: 17,
      title: 'Frappe',
      type: 'Badge',
      issuer: 'STREAM',
      image: 'https://source.unsplash.com/featured/?frontend,code',
    },
  ]
  

const tabs = ['Certificates', 'Badges']

const ViewCertificate = () => {
  const [activeTab, setActiveTab] = useState('Certificates')
  const [currentPage, setCurrentPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [selectedCertificate, setSelectedCertificate] = useState(null)

  const itemsPerPage = 8

  const filteredData = achievementData.filter(
    (item) => item.type === activeTab.slice(0, -1)
  )

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber)

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const handleView = (certificate) => {
    setSelectedCertificate(certificate)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedCertificate(null)
  }

  return (
    <div className="container py-3 rounded bg-white">
      {/* Tabs */}
      <div className="d-flex gap-3 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`btn fw-bold text-uppercase ${
              tab === activeTab ? 'btn-warning text-white' : 'btn-outline-secondary'
            }`}
            onClick={() => {
              setActiveTab(tab)
              setCurrentPage(1)
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="row g-4">
        {currentItems.length > 0 ? (
          currentItems.map(({ id, title, type, issuer, image }) => (
            <div className="col-sm-6 col-md-3" key={id}>
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={image}
                  alt={title}
                  className="card-img-top"
                  style={{ height: '180px', objectFit: 'cover' }}
                />
                <div className="card-body pb-1">
                  <h5 className="card-title text-truncate">{title}</h5>
                  <p className="card-text text-muted mb-2">{type}</p>
                  <button
                    className="btn btn-warning btn-sm text-white rounded-2 "
                    onClick={() => handleView({ title, image })}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center text-muted">
            No {activeTab.toLowerCase()} available.
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredData.length > itemsPerPage && (
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              {[...Array(totalPages)].map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {/* Modal */}
      {showModal && selectedCertificate && (
        <div
          className="modal-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1050,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={closeModal}
        >
          <div
            className="modal-content bg-white p-4 rounded shadow"
            style={{ maxWidth: '800px', width: '90%' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">{selectedCertificate.title}</h5>
              <button className="btn btn-sm btn-outline-danger" onClick={closeModal}>
                &times;
              </button>
            </div>
            <img
              src={selectedCertificate.image}
              alt={selectedCertificate.title}
              className="img-fluid rounded"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ViewCertificate