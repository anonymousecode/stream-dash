'use client'

import React, { useState } from 'react'

// Sample project data
const projectData = [
  {
    id: 1,
    title: 'Flood Risk Prediction',
    start_date: '2025-01-05',
    end_date: '2025-03-20',
    lead: 'Akhil Raj',
  },
  {
    id: 2,
    title: 'AI Notes Summarizer',
    start_date: '2025-02-01',
    end_date: '2025-04-10',
    lead: 'Diya Nair',
  },
  {
    id: 3,
    title: 'Yoga Wellness App',
    start_date: '2025-01-15',
    end_date: '2025-04-01',
    lead: 'Jeevan K',
  },
  {
    id: 4,
    title: 'Image Caption Generator',
    start_date: '2025-03-01',
    end_date: '2025-05-10',
    lead: 'Meera V',
  },
  {
    id: 5,
    title: 'Remote Volunteer Portal',
    start_date: '2025-02-10',
    end_date: '2025-05-30',
    lead: 'Ravi S',
  },
  {
    id: 6,
    title: 'Frappe LMS Extension',
    start_date: '2025-01-25',
    end_date: '2025-03-15',
    lead: 'Anjali C',
  },
  {
    id: 7,
    title: 'Community Laundry Service',
    start_date: '2025-03-05',
    end_date: '2025-06-01',
    lead: 'Manu K',
  },
  {
    id: 8,
    title: 'Course & Event Management',
    start_date: '2025-03-15',
    end_date: '2025-06-20',
    lead: 'Sona A',
  },
]

const ViewProject = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 6

  const totalPages = Math.ceil(projectData.length / projectsPerPage)
  const startIndex = (currentPage - 1) * projectsPerPage
  const currentProjects = projectData.slice(startIndex, startIndex + projectsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handleEdit = (id) => {
    console.log('Edit project with id:', id)
    // Add your edit logic here
  }

  const handleDelete = (id) => {
    console.log('Delete project with id:', id)
    // Add your delete logic here
  }

  return (
    <div className="container py-4 bg-white">
      {currentProjects.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Project Title</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Project Lead</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProjects.map(({ id, title, start_date, end_date, lead }, index) => (
                <tr key={id}>
                  <td>{startIndex + index + 1}</td>
                  <td className="text-start">{title}</td>
                  <td>{start_date}</td>
                  <td>{end_date}</td>
                  <td>{lead}</td>
                  <td className="d-flex justify-content-center">
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => handleEdit(id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
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
        <div className="text-center text-muted">No projects found.</div>
      )}
    </div>
  )
}

export default ViewProject
