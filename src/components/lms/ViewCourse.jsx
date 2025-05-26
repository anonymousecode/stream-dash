'use client';

import React, { useEffect, useState } from 'react';
import { get_data,getUser } from '@/api/methods';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

const ViewCourse = ({ user, onCompletedCountChange, onEnrolledCountChange }) => {
  const tabs = ['Ongoing Courses', 'Completed Courses'];
  const [activeTab, setActiveTab] = useState('Ongoing Courses');
  const [currentPage, setCurrentPage] = useState(1);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const coursesPerPage = 8;

  // Fetch enrollments and course details
  useEffect(() => {
  const fetchCourses = async () => {
    const currUser=await getUser()
    console.log("Current User:", currUser); // ✅ Debug log to check user data


    try {
      const userEmail = currUser?.email;
      console.log("user email:",userEmail)
      if (userEmail) {
        const enrollments = await get_data(
           "LMS Enrollment",
           ["course", "progress"],
           [["member","=", userEmail]] ,
        );

        console.log("Enrolls", enrollments); // ✅ Moved inside after definition

        const cleanedEnrollments = enrollments.map((e) => ({
          ...e,
          progress: Math.round(e.progress),
        }));

        setEnrolledCourses(cleanedEnrollments);

        const completedCoursesCount = cleanedEnrollments.filter(
          (e) => e.progress === 100
        ).length;
        if (onCompletedCountChange) onCompletedCountChange(completedCoursesCount);
        if (onEnrolledCountChange) onEnrolledCountChange(enrollments.length);

        const courseIds = cleanedEnrollments.map((e) => e.course);
        if (courseIds.length > 0) {
          const courseDetails = await get_data(
            "LMS Course", // ✅ FIXED doctype (was incorrectly LMS Enrollment)
           ["name", "title", "image", "subject","difficulty"],
             [[ "name", "in", courseIds] ]
          );
          setCourseData(courseDetails);
        }
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setIsLoadingCourses(false);
    }
  };

  fetchCourses(); // ✅ Call the function inside useEffect scope
}, [user]);


  const getCourseFromEnrollment = (courseName) =>
    courseData.find((c) => c.name === courseName);

  const filteredEnrollments = enrolledCourses.filter((enroll) => {
    const isCompleted = enroll.progress === 100;
    return activeTab === 'Ongoing Courses' ? !isCompleted : isCompleted;
  });

  const totalPages = Math.ceil(filteredEnrollments.length / coursesPerPage);
  const indexOfLast = currentPage * coursesPerPage;
  const indexOfFirst = indexOfLast - coursesPerPage;
  const currentEnrollments = filteredEnrollments.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => setCurrentPage(page);
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const buildImageUrl = (path) => {
    if (!path) return '';
    return `${apiBaseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
  };

  return (
    <div className="container py-4 bg-white p-4 rounded shadow-sm">
      {/* Tabs */}
      <div className="d-flex gap-2 mb-4">
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
        {isLoadingCourses ? (
          <div className="col-12 text-center text-muted">Loading courses...</div>
        ) : currentEnrollments.length > 0 ? (
          currentEnrollments.map((enroll, idx) => {
            const course = getCourseFromEnrollment(enroll.course);
            if (!course) return null;

            return (
              <div className="col-sm-6 col-md-4 col-lg-3" key={idx}>
                <div className="card h-100 shadow-sm border-0">
                  {course.image ? (
                    <img
                      src={buildImageUrl(course.image)}
                      alt={course.title}
                      className="card-img-top"
                      style={{ height: '180px', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/default-thumbnail.jpg';
                      }}
                    />
                  ) : (
                    <div
                      className="card-img-top d-flex align-items-center justify-content-center bg-secondary text-white"
                      style={{ height: '180px' }}
                    >
                      No Image
                    </div>
                  )}
                  <div className="card-body pb-1">
                    <h5 className="card-title text-truncate">{course.title}</h5>
                    <p className="card-text text-muted mb-2">Level: {course.level || 'N/A'}</p>
                    <p className="card-text text-muted">Progress: {enroll.progress}%</p>
                    <button className="btn btn-warning btn-sm text-white rounded-2">
                      View Course
                    </button>
                  </div>
                </div>
              </div>
            );
          })
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
