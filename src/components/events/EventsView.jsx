'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { get_data } from '@/api/methods';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const tabs = ['Up-Coming Events', 'Past Events'];

const EventPage = () => {
  const router = useRouter();
  const [eventsData, setEventsData] = useState([]);
  const [activeTab, setActiveTab] = useState('Up-Coming Events');
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 8;

  useEffect(() => {
    get_data(
      "Events",
      [
        "name",
        "place",
        "date",
        "title",
        "short_description",
        "event_image",
        "state",
        "district",
        "brc",
        "lab_type",
        "location",
        "level"
      ],
      ""
    )
      .then((res) => {
        console.log("Event data:", res);
        setEventsData(res);
      })
      .catch((err) => {
        console.log("Error fetching event data:", err);
      });
  }, []);

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
    setCurrentPage(1);
  };

  const handleViewEventDetail = (eventId) => {
    router.push(`/events/detail/${eventId}`);
  };

  return (
    <div className="container py-3 rounded bg-white">
      {/* Tabs */}
      <div className="d-flex gap-3 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`btn fw-bold text-uppercase ${
              tab === activeTab ? 'btn-warning text-white' : 'btn-outline-secondary'
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

                  <button 
                    className="btn btn-warning btn-sm text-white rounded-2"
                    onClick={() => handleViewEventDetail(item.name)}
                  >
                    View
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
            <ul className="pagination mb-0">
              {/* Prev */}
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
              </li>

              {/* Page Numbers (max 5 visible) */}
              {(() => {
                const pages = [];
                const maxVisible = 5;
                let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
                let endPage = startPage + maxVisible - 1;

                if (endPage > totalPages) {
                  endPage = totalPages;
                  startPage = Math.max(1, endPage - maxVisible + 1);
                }

                for (let page = startPage; page <= endPage; page++) {
                  pages.push(
                    <li key={page} className="page-item">
                      <button
                        className={`page-link ${
                          currentPage === page
                            ? 'bg-warning text-white border-warning'
                            : 'text-primary'
                        }`}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    </li>
                  );
                }
                return pages;
              })()}

              {/* Next */}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default EventPage;
