"use client"

import React, { useState, useEffect } from 'react'
import { get_data, update } from '@/api/methods'
import ProposalDetails from './ProposalDetails'

const ViewProposal = () => {
  const [proposals, setProposals] = useState([])
  const [selectedProposal, setSelectedProposal] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [filterStatus, setFilterStatus] = useState('All') // <- NEW
  const proposalsPerPage = 6

  useEffect(() => {
    get_data("Project Proposal", ["name", "title", "description", "idea_sheet", "project_type", "brc_name", "status", "coordinator", "remark"], "")
      .then((res) => setProposals(res))
      .catch((err) => console.error("Error fetching proposal data:", err))
  }, [])

  const filteredProposals = filterStatus === 'All'
    ? proposals
    : proposals.filter(p => p.status === filterStatus)

  const totalPages = Math.ceil(filteredProposals.length / proposalsPerPage)
  const startIndex = (currentPage - 1) * proposalsPerPage
  const currentProposals = filteredProposals.slice(startIndex, startIndex + proposalsPerPage)

  const handleApprove = (id, coordinator, remark) => {
    update("Project Proposal", id, { status: "Approved", coordinator: coordinator, remark: remark })
  }

  const handleRework = (id, remark) => {
    update("Project Proposal", id, { status: "Rework", remark: remark })
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return selectedProposal ? (
    <ProposalDetails
      proposal={selectedProposal}
      onBack={() => setSelectedProposal(null)}
      onApprove={handleApprove}
      onRework={handleRework}
    />
  ) : (
    <div className="container p-2 ">
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
        <table className="table table-bordered align-middle text-center">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Type</th>
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
                <td>
                  <button
                    className="btn btn-sm btn-outline-info"
                    onClick={() => setSelectedProposal(proposal)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {currentProposals.length === 0 && (
              <tr><td colSpan="6">No proposals found.</td></tr>
            )}
          </tbody>
        </table>


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

export default ViewProposal
