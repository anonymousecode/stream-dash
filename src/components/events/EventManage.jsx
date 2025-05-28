'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { get_data, trash } from '@/api/methods';

const EventManage = () => {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [removingId, setRemovingId] = useState(null);
  const [removedEvents, setRemovedEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const eventsPerPage = 6;
  const router = useRouter();

  useEffect(() => {
    get_data(
      'Events',
      [
        'name',
        'venue',
        'place',
        'date',
        'title',
        'short_description',
        'event_image',
        'state_name',
        'district_name',
        'brc',
        'lab_type',
        'location',
        'level',
      ],
      ''
    )
      .then((res) => {
        setEventData(res);
      })
      .catch((err) => {
        console.error('Error fetching event data:', err);
      });
  }, []);

  const totalPages = Math.ceil(eventData.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const currentEvents = eventData.slice(startIndex, startIndex + eventsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (eventID) => {
    router.push(`/events/edit/${eventID}`);
  };

  const handleDelete = async (docId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this event?');
    if (!confirmDelete) return;

    setRemovingId(docId);
    setLoading(true);

    try {
      await trash('Events', docId);
      setRemovedEvents((prev) => [...prev, docId]);
    } catch (error) {
      console.error(error);
      alert('An error occurred while deleting.');
    } finally {
      setLoading(false);
      setRemovingId(null);
    }
  };

  // Format date to dd-mm-yy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return dateString;
    return date
      .toLocaleDateString('en-GB')
      .replace(/(\d+)\/(\d+)\/(\d{4})/, (_, d, m, y) => `${d}-${m}-${y.slice(2)}`);
  };

  return (
    <div className="container py-4 bg-white">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Events</h5>
      </div>

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
                <th>DATE</th>
                <th>LAB TYPE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {currentEvents.map((event, index) => {
                const isRemoved = removedEvents.includes(event.name);

                return (
                  <tr
                    key={event.name}
                    style={{
                      backgroundColor: isRemoved ? '#f0f0f0' : '',
                      opacity: isRemoved ? 0.5 : 1,
                    }}
                  >
                    <td>{startIndex + index + 1}</td>
                    <td className="text-start">{event.title}</td>
                    <td>{event.venue}</td>
                    <td>{event.place}</td>
                    <td>{event.level}</td>
                    <td>{event.district_name}</td>
                    <td>{formatDate(event.date)}</td>
                    <td>{event.lab_type}</td>
                    <td className="d-flex justify-content-center">
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleEdit(event.name)}
                        disabled={isRemoved}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(event.name)}
                        disabled={isRemoved || removingId === event.name}
                      >
                        {isRemoved ? 'Removed' : 'Remove'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <nav>
            <ul className="pagination justify-content-center mt-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
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
  );
};

export default EventManage;
