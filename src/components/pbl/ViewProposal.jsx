'use client'

import React, { useState, useEffect } from 'react'
import { get_data } from '@/api/methods'

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

const ViewProposal = () => {

  const [proposals, setProposals] = useState([])
  const [selectedProposal, setSelectedProposal] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const proposalsPerPage = 6
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    get_data("Project Proposal", ["name", "title", "description", "idea_sheet", "project_type", "brc_name", "status"], "")
      .then((res) => {
        console.log("proposal data:", res);
        setProposals(res);
      })
      .catch((err) => {
        console.log("Error fetching proposal data:", err);
      })
  }, []);

  const totalPages = Math.ceil(proposals.length / proposalsPerPage)
  const startIndex = (currentPage - 1) * proposalsPerPage
  const currentProposals = proposals.slice(startIndex, startIndex + proposalsPerPage)

  const handleView = (proposal) => {
    setSelectedProposal(proposal);
    setShowModal(true);
  }

  const handleApprove = (id) => {
    console.log('Proposal Approved:', id);
    // Add approve logic here
    setShowModal(false);
  }

  const handleResubmit = (id) => {
    console.log('Proposal Resubmitted:', id);
    // Add resubmit logic here
    setShowModal(false);
  }

  return (
    <div className="container py-4">
      <div className="table-responsive bg-white p-3 rounded shadow-sm">
        <h4 className="mb-3">Project Proposals</h4>
        <table className="table table-bordered align-middle text-center">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Type</th>
              <th>BRC</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProposals.map((proposal, index) => (
              <tr key={proposal.id} style={{ cursor: 'pointer' }}>
                <td>{startIndex + index + 1}</td>
                <td className="text-start">{proposal.title}</td>
                <td>{proposal.project_type}</td>
                <td>{proposal.brc_name}</td>
                <td>
                  <span className={`badge bg-${proposal.status === 'Approved' ? 'success' : proposal.status === 'Pending' ? 'warning' : 'danger'}`}>
                    {proposal.status}
                  </span>
                </td>
                <td>
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-sm btn-outline-info me-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleView(proposal);
                      }}
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <nav className="d-flex justify-content-center mt-4">
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(page)}>
                  {page}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* View Proposal Modal */}
      {showModal && selectedProposal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{selectedProposal.title}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p><strong>Title:</strong> {selectedProposal.title}</p>
                <p><strong>Description:</strong> <span className="proposal-description" dangerouslySetInnerHTML={{ __html: selectedProposal.description.replace(/<br\s*\/?>/g, ' ') }} /></p>
                <p><strong>Type:</strong> {selectedProposal.project_type}</p>
                <p><strong>BRC:</strong> {selectedProposal.brc_name}</p>
                <p><strong>Status:</strong> <span className={`badge bg-${selectedProposal.status === 'Approved' ? 'success' : selectedProposal.status === 'Pending' ? 'warning' : 'danger'}`}>{selectedProposal.status}</span></p>

                {/* Idea Sheet Display */}
                {selectedProposal.idea_sheet && (
                  <div className="mt-3">
                    <strong>Idea Sheet:</strong>
                    {/* Check the type of the attachment and display accordingly */}
                    {selectedProposal.idea_sheet.endsWith('.pdf') ? (
                      <a href={`${apiBaseUrl}${selectedProposal.idea_sheet}`} target="_blank" rel="noopener noreferrer">
                        <button className="btn btn-primary btn-sm">View PDF</button>
                      </a>
                    ) : (
                      <p>File type not supported for preview.</p>
                    )}
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-success" onClick={() => handleApprove(selectedProposal.id)}>Approve</button>
                <button type="button" className="btn btn-warning" onClick={() => handleResubmit(selectedProposal.id)}>Rework</button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ViewProposal
