'use client'

import React, { useState } from 'react'

// Sample events data
const eventsData = [
  {
    id: 1,
    title: 'Artificial Intelligence Workshop',
    level: 'BRC',
    host: 'Louis',
    image: '/images/payment/event1.jpg',
    status: 'Past',
  },
  {
    id: 2,
    title: 'Robotics Workshop',
    level: 'BRC',
    host: 'livingstone',
    image: '/images/payment/event2.webp',
    status: 'Past',
  },
  {
    id: 3,
    title: 'AI ML Workshop',
    level: 'BRC',
    host: 'George',
    image: '/images/payment/event3.jpg',
    status: 'Past',
  },
  {
    id: 4,
    title: 'MASS MEDIA WORKSHOP',
    level: 'BRC',
    host: 'Somerset',
    image: '/images/event4.jpg',
    status: 'Upcoming',
  },
  {
    id: 5,
    title: 'Design Thinking Bootcamp',
    level: 'BRC',
    host: 'Harper',
    image: '/images/event5.jpg',
    status: 'Upcoming',
  },
];
const tabs = ['Up-Coming Events', 'Past Events'];

const EventPage = () => {
  const [activeTab, setActiveTab] = useState('Past Events')

  const getStatusFromTab = (tab) => {
    if (tab === 'Up-Coming Events') return 'Upcoming'
    return 'Past'
  }

  const filteredEvents = eventsData.filter(
    (event) => event.status === getStatusFromTab(activeTab)
  )

  return (
    <div className="container py-5 bg-white">
      {/* Tabs */}
      <div className="d-flex gap-3 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`btn fw-bold text-uppercase ${
              tab === activeTab
                ? 'btn-warning text-white'
                : 'btn-outline-secondary'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Event Cards */}
      <div className="row g-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(({ id, title, level, host, image }) => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={id}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-header d-flex justify-content-between align-items-center bg-white border-0">
                  <img src="/logo.svg" alt="logo" style={{ width: '20px', height: '20px' }} />
                  <small className="text-muted">
                    Hosted by <strong>{host}</strong>
                  </small>
                </div>
                <img
                  src={image}
                  alt={title}
                  className="card-img-top"
                  style={{ height: '180px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title text-truncate">{title}</h5>
                  <p className="card-text text-muted mb-2">Level: {level}</p>
                  <button className="btn btn-warning btn-sm text-white rounded-pill">
                    Enrolled
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center text-muted">No events available.</div>
        )}
      </div>
    </div>
  )
}

export default EventPage





