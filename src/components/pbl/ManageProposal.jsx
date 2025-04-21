'use client'

import React, { useState } from 'react'

// Sample proposal data (10 entries)
const proposalData = [
  {
    id: 1,
    title: 'AI-powered Soil Analysis',
    projectType: 'Science',
    ideaSheet: '/downloads/idea-sheet-1.pdf',
    document: '/downloads/project-doc-1.pdf',
    members: 'Anu, Ravi, Kiran',
    brcId: 'AluvaBRC123',
    status: 'Approved',
  },
  {
    id: 2,
    title: 'IoT Weather Monitor',
    projectType: 'Technology',
    ideaSheet: '/downloads/idea-sheet-2.pdf',
    document: '/downloads/project-doc-2.pdf',
    members: 'Deepa, Manu',
    brcId: 'PalakkadBRC456',
    status: 'Pending',
  },
  {
    id: 3,
    title: 'Water Purifier Prototype',
    projectType: 'Innovation',
    ideaSheet: '/downloads/idea-sheet-3.pdf',
    document: '/downloads/project-doc-3.pdf',
    members: 'Hari, Meera',
    brcId: 'KozhikodeBRC789',
    status: 'Rejected',
  },
  {
    id: 4,
    title: 'Biodegradable Packaging',
    projectType: 'Environment',
    ideaSheet: '/downloads/idea-sheet-4.pdf',
    document: '/downloads/project-doc-4.pdf',
    members: 'Liya, Akhil',
    brcId: 'ThrissurBRC101',
    status: 'Approved',
  },
  {
    id: 5,
    title: 'Smart Dustbin System',
    projectType: 'Technology',
    ideaSheet: '/downloads/idea-sheet-5.pdf',
    document: '/downloads/project-doc-5.pdf',
    members: 'Vivek, Rani',
    brcId: 'KollamBRC202',
    status: 'Pending',
  },
  {
    id: 6,
    title: 'Eco-Brick Construction',
    projectType: 'Environment',
    ideaSheet: '/downloads/idea-sheet-6.pdf',
    document: '/downloads/project-doc-6.pdf',
    members: 'Sabu, Neha',
    brcId: 'IdukkiBRC303',
    status: 'Approved',
  },
  {
    id: 7,
    title: 'Emergency Alert Watch',
    projectType: 'Innovation',
    ideaSheet: '/downloads/idea-sheet-7.pdf',
    document: '/downloads/project-doc-7.pdf',
    members: 'Ajay, Bindu',
    brcId: 'KannurBRC404',
    status: 'Pending',
  },
  {
    id: 8,
    title: 'Renewable Energy Charger',
    projectType: 'Science',
    ideaSheet: '/downloads/idea-sheet-8.pdf',
    document: '/downloads/project-doc-8.pdf',
    members: 'Faisal, Diya',
    brcId: 'KasargodBRC505',
    status: 'Approved',
  },
  {
    id: 9,
    title: 'Smart Farming App',
    projectType: 'Technology',
    ideaSheet: '/downloads/idea-sheet-9.pdf',
    document: '/downloads/project-doc-9.pdf',
    members: 'Rakesh, Arya',
    brcId: 'PathanamthittaBRC606',
    status: 'Pending',
  },
  {
    id: 10,
    title: 'Disaster Management Drone',
    projectType: 'Innovation',
    ideaSheet: '/downloads/idea-sheet-10.pdf',
    document: '/downloads/project-doc-10.pdf',
    members: 'Sneha, George',
    brcId: 'MalappuramBRC707',
    status: 'Approved',
  },
]

const ManageProposal = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const proposalsPerPage = 6

  const totalPages = Math.ceil(proposalData.length / proposalsPerPage)
  const startIndex = (currentPage - 1) * proposalsPerPage
  const currentProposals = proposalData.slice(startIndex, startIndex + proposalsPerPage)

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
    <div className="container py-4 bg-white">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Manage Proposals</h5>
      </div>

      {/* Proposal Table */}
      {currentProposals.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>TITLE</th>
                <th>PROJECT TYPE</th>
                <th>IDEA SHEET</th>
                <th>DOCUMENT</th>
                <th>MEMBERS</th>
                <th>BRC ID</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {currentProposals.map((proposal, index) => (
                <tr key={proposal.id}>
                  <td>{startIndex + index + 1}</td>
                  <td className="text-start">{proposal.title}</td>
                  <td>{proposal.projectType}</td>
                  <td>
                    <a href={proposal.ideaSheet} target="_blank" rel="noopener noreferrer">
                      Open
                    </a>
                  </td>
                  <td>
                    <a href={proposal.document} target="_blank" rel="noopener noreferrer">
                      Open
                    </a>
                  </td>
                  <td>{proposal.members}</td>
                  <td>{proposal.brcId}</td>
                  <td>{proposal.status}</td>
                  <td className="d-flex justify-content-center">
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => handleEdit(proposal.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(proposal.id)}
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
        <div className="text-center text-muted">No proposals found.</div>
      )}
    </div>
  )
}

export default ManageProposal