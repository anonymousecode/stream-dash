'use client'

import React, { useState, useEffect } from 'react'
import { get_data } from '@/api/methods'

const MyProposal = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const proposalsPerPage = 6
  const [proposalData, setProposalData] = useState([])
  const [filterStatus, setFilterStatus] = useState('All')

  useEffect(() => {
    get_data("Project Proposal", ["name", "title", "description", "project_type", "brc_name","coordinator","remark", "status"], "")
      .then((res) => {
        setProposalData(res)
      }).catch((err) => {
        console.log("Error fetching proposal data:", err)
      })
  }, [])

  const filteredProposals = filterStatus === 'All'
    ? proposalData
    : proposalData.filter(p => p.status === filterStatus)

  const totalPages = Math.ceil(filteredProposals.length / proposalsPerPage)
  const startIndex = (currentPage - 1) * proposalsPerPage
  const currentProposals = filteredProposals.slice(startIndex, startIndex + proposalsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handleEdit = (id) => {
    console.log('Edit proposal with id:', id)
  }

  const handleDelete = (id) => {
    console.log('Delete proposal with id:', id)
  }

  return (
    <div className="container py-2">
      {/* Filter Buttons */}
      <div className="mb-3 d-flex flex-wrap gap-2">
        {['All', 'Pending', 'Approved', 'Rework'].map(status => (
          <button
            key={status}
            className={`btn btn-sm ${filterStatus === status ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => {
              setFilterStatus(status)
              setCurrentPage(1)
            }}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Proposal Table */}
      <div className="table-responsive bg-white p-3 rounded shadow-sm">
        {currentProposals.length > 0 ? (
          <table className="table table-bordered align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Project Type</th>
                <th>BRC</th>
                <th>Status</th>
                <th>Coordinator</th>
                <th>Remarks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProposals.map((proposal, index) => (
                <tr key={proposal.name}>
                  <td>{startIndex + index + 1}</td>
                  <td className="text-start">{proposal.title}</td>
                  <td>{proposal.project_type}</td>
                  <td>{proposal.brc_name}</td>
                  <td>
                    <span className={`badge bg-${proposal.status === 'Approved' ? 'success' : proposal.status === 'Pending' ? 'warning' : 'danger'}`}>
                      {proposal.status}
                    </span>
                  </td>
                  <td>{proposal.coordinator}</td>
                  <td>{proposal.remark}</td>
                  <td className="d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleEdit(proposal.name)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(proposal.name)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-muted p-4">No proposals found.</div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="d-flex justify-content-center mt-4">
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(page)}>
                    {page}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </div>
  )
}

export default MyProposal
