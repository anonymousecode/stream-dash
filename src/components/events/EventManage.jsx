'use client'

import React, { useState } from 'react'

// Sample event data
const eventData = [
  {
    id: 1,
    title: 'STEM Workshop',
    venue: 'Govt HSS Aluva',
    place: 'Aluva',
    level: 'State',
    district: 'Ernakulam',
    time: '10:00 AM',
    date: '2025-04-20',
    partner: 'SSK',
    brc: 'Aluva BRC',
    labType: 'ICT Lab',
  },
  {
    id: 2,
    title: 'AI Awareness Program',
    venue: 'Model School',
    place: 'Palakkad',
    level: 'District',
    district: 'Palakkad',
    time: '11:00 AM',
    date: '2025-04-22',
    partner: 'KDISC',
    brc: 'Palakkad North BRC',
    labType: 'Science Lab',
  },
]

const EventManage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const eventsPerPage = 6

  const totalPages = Math.ceil(eventData.length / eventsPerPage)
  const startIndex = (currentPage - 1) * eventsPerPage
  const currentEvents = eventData.slice(startIndex, startIndex + eventsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handleEdit = (id) => {
    console.log('Edit event with id:', id)
  }

  const handleDelete = (id) => {
    console.log('Delete event with id:', id)
  }

  return (
    <div className="container py-4 bg-white">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Events</h5>
      </div>

      {/* Event Table */}
      {currentEvents.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>TITLE</th>
                <th>VENUE</th>
                <th>PLACE</th>
                <th>LEVEL</th>
                <th>DISTRICT</th>
                <th>TIME</th>
                <th>DATE</th>
                <th>PARTNER NAME</th>
                <th>BRC</th>
                <th>LAB TYPE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {currentEvents.map((event, index) => (
                <tr key={event.id}>
                  <td>{startIndex + index + 1}</td>
                  <td className="text-start">{event.title}</td>
                  <td>{event.venue}</td>
                  <td>{event.place}</td>
                  <td>{event.level}</td>
                  <td>{event.district}</td>
                  <td>{event.time}</td>
                  <td>{event.date}</td>
                  <td>{event.partner}</td>
                  <td>{event.brc}</td>
                  <td>{event.labType}</td>
                  <td className="d-flex justify-content-center">
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => handleEdit(event.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(event.id)}
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
        <div className="text-center text-muted">No events found.</div>
      )}
    </div>
  )
}

export default EventManage
