'use client'

import React, { useState } from 'react'


const ViewProject = ({ projectData }) => {
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
              {currentProjects && currentProjects.map(({ id, title, starting_date, completed_date, lead }, index) => (
                <tr key={id}>
                  <td>{startIndex + index + 1}</td>
                  <td className="text-start">{title}</td>
                  <td>{starting_date}</td>
                  <td>{completed_date}</td>
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
