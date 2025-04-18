'use client';

import React, { useState } from 'react';

// Sample data for demonstration (remove if you pass props)
const sampleCoursesData = [
  {
    title: 'Intro to AI',
    level: 'Beginner',
    status: 'Ongoing',
    thumbnail: '/uploads/ai-intro.jpg'
  },
  {
    title: 'Web Development Bootcamp',
    level: 'Intermediate',
    status: 'Ongoing',
    thumbnail: '/uploads/web-dev.jpg'
  },
  {
    title: 'Advanced Data Science',
    level: 'Advanced',
    status: 'Completed',
    thumbnail: '/uploads/ds-advanced.jpg'
  },
  {
    title: 'Machine Learning Crash Course',
    level: 'Intermediate',
    status: 'Completed',
    thumbnail: '/uploads/ml.jpg'
  }
];

// Replace with your actual base URL in .env
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

const ViewCourse = () => {
  const tabs = ['Ongoing Courses', 'Completed Courses'];
  const [activeTab, setActiveTab] = useState('Ongoing Courses');
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 8;

  const filteredCourses = sampleCoursesData.filter((course) =>
    activeTab === 'Ongoing Courses'
      ? course.status === 'Ongoing'
      : course.status === 'Completed'
  );

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to first page
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

      {/* Course Cards */}
      <div className="row g-4">
        {currentCourses.length > 0 ? (
          currentCourses.map((course, index) => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={index}>
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={`${apiBaseUrl}${course.thumbnail}`}
                  alt={course.title}
                  className="card-img-top"
                  style={{ height: '180px', objectFit: 'cover' }}
                />
                <div className="card-body pb-1">
                  <h5 className="card-title text-truncate">{course.title}</h5>
                  <p className="card-text text-muted mb-2">Level: {course.level}</p>
                  <p className="card-text text-muted">Status: {course.status}</p>
                  <button className="btn btn-warning btn-sm text-white rounded-2">
                    View Course
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center text-muted">
            No {activeTab === 'Ongoing Courses' ? 'ongoing' : 'completed'} courses available.
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

export default ViewCourse;