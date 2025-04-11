'use client'

import React, { useState } from 'react'

// Sample project data
const projectData = [
  {
    id: 1,
    title: 'Discover Plant Diversity With Flora Incognita',
    image: '/images/project1.jpg',
  },
  {
    id: 2,
    title: 'CanAirIO Low Cost Air Quality Sensor',
    image: '/images/project2.jpg',
  },
  {
    id: 3,
    title: 'The Extremophile Campaign: In Your Home',
    image: '/images/project3.jpg',
  },
  {
    id: 4,
    title: 'ClimatePrediction.Net',
    image: '/images/project4.jpg',
  },
  {
    id: 5,
    title: 'The Omega Cluster',
    image: '/images/project5.jpg',
  },
  {
    id: 6,
    title: 'LingoBoingo',
    image: '/images/project6.jpg',
  },
  {
    id: 7,
    title: 'Citizen Science Galaxy Hunt',
    image: '/images/project7.jpg',
  },
  {
    id: 8,
    title: 'Ocean Clean-up Tracker',
    image: '/images/project8.jpg',
  },
]

const itemsPerPage = 8

const ProjectGallery = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(projectData.length / itemsPerPage)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentProjects = projectData.slice(indexOfFirstItem, indexOfLastItem)

  return (
    <div className="container py-5 bg-white">
      {/* Projects Grid */}
      <div className="row g-3">
        {currentProjects.map(({ id, title, image }) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={id}>
            <div className="card shadow-sm border-0" style={{ fontSize: '0.9rem' }}>
              <img
                src={image}
                alt={title}
                className="card-img-top"
                style={{ height: '130px', objectFit: 'cover' }}
              />
              <div className="card-body py-2 px-3">
                <h6 className="card-title mb-1" style={{ fontSize: '0.85rem' }}>
                  {title}
                </h6>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
        {/* Previous Button */}
        <button
          className="btn text-white px-3"
          style={{
            backgroundColor: '#FFC324',
            border: 'none',
          }}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        >
          Previous
        </button>

        {/* Page Numbers */}
        <nav>
          <ul className="pagination mb-0">
            {[...Array(totalPages)].map((_, i) => (
              <li
                key={i}
                className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Next Button */}
        <button
          className="btn text-white px-3"
          style={{
            backgroundColor: '#FFC324',
            border: 'none',
          }}
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default ProjectGallery
