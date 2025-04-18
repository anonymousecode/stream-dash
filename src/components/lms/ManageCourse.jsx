'use client'

import React, { useState } from 'react'

const initialCourses = [
  { id: 'COURSE001', title: 'Intro to AI', level: 'Beginner', hashtag: '#AI', shortDescription: 'A beginner-friendly course.', chapters: [] },
  { id: 'COURSE002', title: 'Data Structures', level: 'Intermediate', hashtag: '#DSA', shortDescription: 'In-depth DSA learning.', chapters: [] },
]

const ManageCourse = () => {
  const [courseData, setCourseData] = useState(initialCourses)
  const [currentPage, setCurrentPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [newCourse, setNewCourse] = useState({
    title: '',
    level: '',
    hashtag: '',
    shortDescription: '',
  })
  const [chapters, setChapters] = useState([])
  const [currentChapter, setCurrentChapter] = useState({
    title: '',
    content: '',
    attachment: null,
  })

  const coursesPerPage = 6
  const totalPages = Math.ceil(courseData.length / coursesPerPage)
  const startIndex = (currentPage - 1) * coursesPerPage
  const currentCourses = courseData.slice(startIndex, startIndex + coursesPerPage)

  const handlePageChange = (page) => setCurrentPage(page)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewCourse({ ...newCourse, [name]: value })
  }

  const handleChapterInput = (e) => {
    const { name, value } = e.target
    setCurrentChapter({ ...currentChapter, [name]: value })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setCurrentChapter({ ...currentChapter, attachment: file })
  }

  const addChapter = () => {
    const { title, content, attachment } = currentChapter
    if (title && content) {
      setChapters([...chapters, currentChapter])
      setCurrentChapter({ title: '', content: '', attachment: null })
    } else {
      alert('Please fill in chapter title and content.')
    }
  }

  const generateCourseId = () => {
    const ids = courseData.map(course => parseInt(course.id.replace('COURSE', '')))
    const maxId = ids.length > 0 ? Math.max(...ids) : 0
    return `COURSE${(maxId + 1).toString().padStart(3, '0')}`
  }

  const handleAddCourse = () => {
    const { title, level, hashtag, shortDescription } = newCourse
    if (title && level && hashtag && shortDescription) {
      const newEntry = {
        id: generateCourseId(),
        title,
        level,
        hashtag,
        shortDescription,
        chapters,
      }
      setCourseData([newEntry, ...courseData])
      setNewCourse({ title: '', level: '', hashtag: '', shortDescription: '' })
      setChapters([])
      setShowModal(false)
      setCurrentPage(1)
    } else {
      alert('Please fill in all course details.')
    }
  }

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this course?')
    if (confirmDelete) {
      setCourseData(courseData.filter((course) => course.id !== id))
    }
  }

  const handleEdit = (id) => {
    console.log('Edit Course with ID:', id)
  }

  return (
    <div className="container py-3 rounded bg-white">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Manage Courses</h4>
        <button className="btn btn-sm btn-outline-primary" onClick={() => setShowModal(true)}>
          Add Course
        </button>
      </div>

      {currentCourses.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>Course ID</th>
                <th>Title</th>
                <th>Level</th>
                <th>Hashtag</th>
                <th>Description</th>
                <th>Chapters</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCourses.map(({ id, title, level, hashtag, shortDescription, chapters }) => (
                <tr key={id}>
                  <td>{id}</td>
                  <td className="text-start">{title}</td>
                  <td>{level}</td>
                  <td>{hashtag}</td>
                  <td className="text-start">{shortDescription}</td>
                  <td>{chapters.length}</td>
                  <td>
                    <div className="d-flex justify-content-center">
                      <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(id)}>Edit</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(id)}>Remove</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <nav>
            <ul className="pagination justify-content-center mt-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(page)}>{page}</button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : (
        <div className="text-center text-muted">No courses found.</div>
      )}

      {/* Add Course Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Course</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body">
                {/* Course Fields */}
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input className="form-control" name="title" value={newCourse.title} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
  <label className="form-label">Level</label>
  <select
    className="form-select"
    name="level"
    value={newCourse.level}
    onChange={handleInputChange}
  >
    <option value="">Select Level</option>
    <option value="Beginner">Beginner</option>
    <option value="Intermediate">Intermediate</option>
    <option value="Expert">Expert</option>
  </select>
</div>
                
<div className="mb-3">
  <label className="form-label">Hashtag</label>
  <input
    className="form-control"
    name="hashtag"
    placeholder="e.g. #ReactJS"
    value={newCourse.hashtag}
    onChange={handleInputChange}
  />
</div>

                <div className="mb-3">
                  <label className="form-label">Short Description</label>
                  <textarea className="form-control" name="shortDescription" rows="3" value={newCourse.shortDescription} onChange={handleInputChange}></textarea>
                </div>

                {/* Chapter Section */}
                <hr />
                <h6>Add Chapters</h6>
                <div className="mb-2">
                  <input className="form-control mb-2" name="title" placeholder="Chapter Title" value={currentChapter.title} onChange={handleChapterInput} />
                  <textarea className="form-control mb-2" name="content" placeholder="Chapter Content" rows="2" value={currentChapter.content} onChange={handleChapterInput}></textarea>
                  <input className="form-control mb-2" type="file" onChange={handleFileChange} />
                  <button className="btn btn-sm btn-outline-success" onClick={addChapter}>Add Chapter</button>
                </div>

                {/* Show Added Chapters */}
                {chapters.length > 0 && (
                  <ul className="list-group mt-3">
                    {chapters.map((chapter, index) => (
                      <li key={index} className="list-group-item">
                        <strong>{chapter.title}</strong> - {chapter.content.substring(0, 50)}...
                        {chapter.attachment && <span className="text-muted ms-2">({chapter.attachment.name})</span>}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleAddCourse}>Save Course</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageCourse