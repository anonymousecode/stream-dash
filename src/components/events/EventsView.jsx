// 'use client'


// Sample events data
// const eventsData = [
//   {
//     id: 1,
//     title: 'Artificial Intelligence Workshop',
//     level: 'BRC',
//     host: 'Louis',
//     image: '/images/payment/event1.jpg',
//     status: 'Past',
//   },
//   {
//     id: 2,
//     title: 'Robotics Workshop',
//     level: 'BRC',
//     host: 'livingstone',
//     image: '/images/payment/event2.webp',
//     status: 'Past',
//   },
//   {
//     id: 3,
//     title: 'AI ML Workshop',
//     level: 'BRC',
//     host: 'George',
//     image: '/images/payment/event3.jpg',
//     status: 'Past',
//   },
//   {
//     id: 4,
//     title: 'MASS MEDIA WORKSHOP',
//     level: 'BRC',
//     host: 'Somerset',
//     image: '/images/event4.jpg',
//     status: 'Upcoming',
//   },
//   {
//     id: 5,
//     title: 'Design Thinking Bootcamp',
//     level: 'BRC',
//     host: 'Harper',
//     image: '/images/event5.jpg',
//     status: 'Upcoming',
//   },
// ];

import React from 'react'

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const tabs = ['Up-Coming Events', 'Past Events'];

const EventPage = ({ eventsData }) => {
  // const [activeTab, setActiveTab] = useState('Past Events')

  // const getStatusFromTab = (tab) => {
  //   if (tab === 'Up-Coming Events') return 'Upcoming'
  //   return 'Past'
  // }

  // const filteredEvents = eventsData.filter(
  //   (event) => event.status === getStatusFromTab(activeTab)
  // )

  return (
    <div className="container py-3 bg-white">
      {/* Tabs */}
      <div className="d-flex gap-3 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
          // className={`btn fw-bold text-uppercase ${tab === activeTab
          //   ? 'btn-warning text-white'
          //   : 'btn-outline-secondary'
          //   }`}
          // onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>




      {/* Event Cards */}
      <div className="row g-4">
        {eventsData.length > 0 ? (
          eventsData.map((item) => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={item.name}>
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={`${apiBaseUrl}${item.event_image}`}
                  alt={item.title}
                  className="card-img-top"
                  style={{ height: '180px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title text-truncate">{item.title}</h5>
                  <p className="card-text text-muted mb-2">Level: {item.level}</p>
                  <button className="btn btn-warning btn-sm text-white rounded-2">
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





