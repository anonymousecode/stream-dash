"use client"

import React, { useState, useEffect } from 'react'
import { get_data } from '@/api/methods'

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

const ProposalDetails = ({ proposal, onBack, onApprove, onRework }) => {



  const [showApproveModal, setShowApproveModal] = useState(false)
  const [showReworkModal, setShowReworkModal] = useState(false)
  const [remarks, setRemarks] = useState('')
  const [coordinator, setCoordinator] = useState('')

  const [coordinatorList, setCoordinatorList] = useState([])


  useEffect(() => {
    get_data("Coordinator", ["name1", "name"], "")
      .then((res) => setCoordinatorList(res))
      .catch((err) => console.error("Error fetching proposal data:", err))
  }, [])

  const handleApproveConfirm = () => {
    onApprove(proposal.name, coordinator, remarks)
    setShowApproveModal(false)
    setRemarks('')
    setCoordinator('')
  }

  const handleReworkConfirm = () => {
    onRework(proposal.name, remarks)
    setShowReworkModal(false)
    setRemarks('')
  }

  return (
    <div className="container p-2">

      <div className="card p-4 shadow-sm">
        <h4>{proposal.title}</h4>
        <p><strong>Description:</strong> <span dangerouslySetInnerHTML={{ __html: proposal.description.replace(/<br\s*\/?>/g, ' ') }} /></p>
        <p><strong>Type:</strong> {proposal.project_type}</p>
        <p><strong>BRC:</strong> {proposal.brc_name}</p>
        <p><strong>Status:</strong> <span className={`badge bg-${proposal.status === 'Approved' ? 'success' : proposal.status === 'Pending' ? 'warning' : 'danger'}`}>{proposal.status}</span></p>

        {proposal.idea_sheet?.endsWith('.pdf') && (
          <div className="mt-3">
            <strong>Idea Sheet:</strong>
            <a href={`${apiBaseUrl}${proposal.idea_sheet}`} target="_blank" rel="noopener noreferrer" className="text-primary text-decoration-underline ms-2">
              View PDF
            </a>

          </div>
        )}

        <div className="mt-4 d-flex gap-3">
          <button className="btn btn-success" onClick={() => setShowApproveModal(true)}>Approve</button>
          <button className="btn btn-warning" onClick={() => setShowReworkModal(true)}>Rework</button>
          <button className="btn btn-secondary ms-auto" onClick={onBack}>Back</button>
        </div>
      </div>

      {/* Approve Modal */}
      {showApproveModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Approve Proposal</h5>
                <button className="btn-close" onClick={() => setShowApproveModal(false)}></button>
                {/* <button className="btn-close" onClick={handleApproveConfirm}></button> */}
              </div>
              <div className="modal-body">
                {/* <div className="mb-3">
                  <label className="form-label">Project Coordinator</label>
                  <input type="text" className="form-control" value={coordinator} onChange={(e) => setCoordinator(e.target.value)} />
                </div> */}
                <div className="mb-3">
                  <label className="form-label">Project Coordinator</label>

                  <select className="form-select" value={coordinator} onChange={(e) => setCoordinator(e.target.value)}>
                    <option value="">Select Coordinator</option>
                    {coordinatorList.map((coordinator) => (
                      <option key={coordinator.name} value={coordinator.name}>
                        {coordinator.name1}
                      </option>
                    ))}
                  </select>
                </div>


                <div className="mb-3">
                  <label className="form-label">Remarks</label>
                  <textarea className="form-control" value={remarks} onChange={(e) => setRemarks(e.target.value)} />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-success" onClick={handleApproveConfirm}>Submit</button>
                <button className="btn btn-secondary" onClick={() => setShowApproveModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rework Modal */}
      {showReworkModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Request Rework</h5>
                <button className="btn-close" onClick={() => setShowReworkModal(false)}></button>
              </div>
              <div className="modal-body">
                <label className="form-label">Remarks</label>
                <textarea className="form-control" value={remarks} onChange={(e) => setRemarks(e.target.value)} />
              </div>
              <div className="modal-footer">
                <button className="btn btn-warning" onClick={handleReworkConfirm}>Submit</button>
                <button className="btn btn-secondary" onClick={() => setShowReworkModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProposalDetails
