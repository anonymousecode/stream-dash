'use client'

import React, { useState, useEffect } from 'react'
import { get_data } from '@/api/methods'

const LeadsEmptyCard = ({ title, description }) => (
  <div className="text-center py-4 text-muted">
    <h5>{title}</h5>
    <p>{description}</p>
  </div>
)

const dummyProposals = [
  {
    id: 1,
    title: 'Smart Irrigation System',
    description: 'IoT-based system to optimize agricultural water usage.',
    projectType: 'Engineering',
    documentUrl: 'https://example.com/docs/irrigation.pdf',
    members: ['Alice', 'Bob'],
    brc: 'Aluva BRC',
    status: 'Pending',
  },
  {
    id: 2,
    title: 'Waste Management Awareness',
    description: 'Campaign for better waste segregation practices.',
    projectType: 'Non-Engineering',
    documentUrl: 'https://example.com/docs/waste.pdf',
    members: ['Charlie', 'David'],
    brc: 'Palakkad BRC',
    status: 'Approved',
  },
  {
    id: 3,
    title: 'Language Learning App',
    description: 'Mobile app for teaching Malayalam to children.',
    projectType: 'Others',
    documentUrl: 'https://example.com/docs/language.pdf',
    members: ['Eva', 'Frank'],
    brc: 'Thrissur BRC',
    status: 'Rework',
  },
]

const ViewProposal = () => {


  const [proposals, setProposals] = useState([])
  const [selectedProposal, setSelectedProposal] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const proposalsPerPage = 6


  useEffect(() => {

    get_data("Project Proposal", ["name", "title", "description", "project_type", "brc_name", "status"], "")
      .then((res) => {
        console.log("proposal data:", res);
        setProposals(res);
      }
      ).catch((err) => {
        console.log("Error fetching blog data:", err);
      })

  }, []);

  // useEffect(() => {
  //   setProposals(dummyProposals)
  // }, [])

  const totalPages = Math.ceil(proposals.length / proposalsPerPage)
  const startIndex = (currentPage - 1) * proposalsPerPage
  const currentProposals = proposals.slice(startIndex, startIndex + proposalsPerPage)

  const handleDownload = (url) => {
    const link = document.createElement('a')
    link.href = url
    link.download = ''
    link.target = '_blank'
    link.click()
  }

  const handleEdit = (id) => {
    console.log('Edit clicked for proposal ID:', id)
    // Add edit logic here
  }

  const handleDelete = (id) => {
    console.log('Delete clicked for proposal ID:', id)
    // Add delete logic here
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
              {/* <th>Document</th> */}
              {/* <th>Members</th> */}
              <th>BRC</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProposals.map((proposal, index) => (
              <tr key={proposal.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedProposal(proposal)}>
                <td>{startIndex + index + 1}</td>
                <td className="text-start">{proposal.title}</td>
                <td>{proposal.project_type}</td>
                {/* <td>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDownload(proposal.documentUrl)
                    }}
                    className="btn btn-sm btn-outline-primary"
                  >
                    View/Download
                  </button>
                </td> */}
                {/* <td>{proposal.members.join(', ')}</td> */}
                <td>{proposal.brc_name}</td>
                <td>
                  <span className={`badge bg-${proposal.status === 'Approved' ? 'success' : proposal.status === 'Pending' ? 'warning' : 'danger'}`}>
                    {proposal.status}
                  </span>
                </td>
                <td>
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEdit(proposal.id)
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(proposal.id)
                      }}
                    >
                      Delete
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

      {/* Detailed View */}
      {/* Detailed View */}
      {selectedProposal && (
        <div className="bg-white p-4 mt-5 rounded shadow-sm">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="text-black">{selectedProposal.title} — Detailed View</h5>
            <button className="btn btn-sm btn-outline-secondary" onClick={() => setSelectedProposal(null)}>Close</button>
          </div>
          <p><strong className="text-warning">Description:</strong> {selectedProposal.description}</p>
          <ul className="nav nav-tabs" id="proposalTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link active text-warning" id="activity-tab" data-bs-toggle="tab" data-bs-target="#activityTab" type="button" role="tab">
                Activity
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link text-warning" id="timesheets-tab" data-bs-toggle="tab" data-bs-target="#timesheetsTab" type="button" role="tab">
                Timesheets
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link text-warning" id="milestones-tab" data-bs-toggle="tab" data-bs-target="#milestonesTab" type="button" role="tab">
                Milestones
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link text-warning" id="discussions-tab" data-bs-toggle="tab" data-bs-target="#discussionsTab" type="button" role="tab">
                Discussions
              </button>
            </li>
          </ul>
          <div className="tab-content pt-4" id="proposalTabContent">
            <div className="tab-pane fade show active" id="activityTab" role="tabpanel">
              <ul>
                <li>Proposal submitted on Jan 10, 2025</li>
                <li>Reviewed by Dr. Suresh on Jan 15, 2025</li>
              </ul>
            </div>
            <div className="tab-pane fade" id="timesheetsTab" role="tabpanel">
              <p>Total Hours Logged: 0</p>
              <LeadsEmptyCard title="No timesheets yet!" description="There are no timesheets logged for this project." />
            </div>
            <div className="tab-pane fade" id="milestonesTab" role="tabpanel">
              <ul>
                <li>Phase 1: Concept Approval (Pending)</li>
                <li>Phase 2: Prototype Submission (Upcoming)</li>
              </ul>
            </div>
            <div className="tab-pane fade" id="discussionsTab" role="tabpanel">
              <LeadsEmptyCard title="No discussions yet!" description="No team discussions have been started." />
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default ViewProposal