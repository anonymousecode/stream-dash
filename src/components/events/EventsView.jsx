
'use client';

import React, { useState } from 'react';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const tabs = ['Up-Coming Events', 'Past Events'];

const EventPage = ({ eventsData }) => {
  const [activeTab, setActiveTab] = useState('Up-Coming Events');
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 8;

  // Get today's date (without time)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isUpcoming = (eventDate) => {
    const date = new Date(eventDate);
    date.setHours(0, 0, 0, 0);
    return date >= today;
  };

  const isPast = (eventDate) => {
    const date = new Date(eventDate);
    date.setHours(0, 0, 0, 0);
    return date < today;
  };

  // Filter events based on selected tab
  const filteredEvents = eventsData.filter((event) =>
    activeTab === 'Up-Coming Events' ? isUpcoming(event.date) : isPast(event.date)
  );

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1); // reset page on tab change
  };

  return (
    <div className="container py-3  rounded bg-white">
      {/* Tabs */}
      <div className="d-flex gap-3 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`btn fw-bold text-uppercase ${tab === activeTab ? 'btn-warning text-white' : 'btn-outline-secondary'
              }`}
            onClick={() => handleTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Event Cards */}
      <div className="row g-4">
        {currentEvents.length > 0 ? (
          currentEvents.map((item) => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={item.name}>
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={`${apiBaseUrl}${item.event_image}`}
                  alt={item.title}
                  className="card-img-top"
                  style={{ height: '180px', objectFit: 'cover' }}
                />
                <div className="card-body pb-1">
                  <h5 className="card-title text-truncate">{item.title}</h5>
                  <p className="card-text text-muted mb-2">Level: {item.level}</p>
                  <p className="card-text text-muted">
                    {new Date(item.date).toLocaleDateString('en-GB')}
                  </p>

                  <button className="btn btn-warning btn-sm text-white rounded-2">
                    Enrolled
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center text-muted">
            No {activeTab === 'Up-Coming Events' ? 'upcoming' : 'past'} events available.
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, idx) => (
                <li
                  key={idx + 1}
                  className={`page-item ${currentPage === idx + 1 ? 'active' : ''}`}
                >
                  <button className="page-link" onClick={() => handlePageChange(idx + 1)}>
                    {idx + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default EventPage;
