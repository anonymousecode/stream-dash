'use client'

import React, { useState } from 'react'

// Sample blog data with dates
// const blogData = [
//   {
//     id: 1,
//     title: 'Top 10 AI Trends in 2025',
//     author: 'Navya',
//     date: '2025-01-10',
//   },
//   {
//     id: 2,
//     title: 'The Rise of Ethical Hacking',
//     author: 'Rahul',
//     date: '2025-01-14',
//   },
//   {
//     id: 3,
//     title: 'How Blockchain is Changing Finance',
//     author: 'Ananya',
//     date: '2025-02-01',
//   },
//   {
//     id: 4,
//     title: 'Introduction to Deep Learning',
//     author: 'George',
//     date: '2025-02-20',
//   },
//   {
//     id: 5,
//     title: 'Exploring Quantum Computing',
//     author: 'Meera',
//     date: '2025-03-01',
//   },
//   {
//     id: 6,
//     title: 'Cybersecurity Essentials',
//     author: 'Arjun',
//     date: '2025-03-18',
//   },
//   {
//     id: 7,
//     title: 'Cloud Computing Demystified',
//     author: 'Kiran',
//     date: '2025-04-01',
//   },
//   {
//     id: 8,
//     title: 'The Future of Remote Work',
//     author: 'Sara',
//     date: '2025-04-10',
//   },
// ]

const BlogsView = ({ blogData }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const blogsPerPage = 6

  const totalPages = Math.ceil(blogData.length / blogsPerPage)
  const startIndex = (currentPage - 1) * blogsPerPage
  const currentBlogs = blogData.slice(startIndex, startIndex + blogsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handleEdit = (id) => {
    console.log('Edit blog with id:', id)
    // Add your edit logic here
  }

  const handleDelete = (id) => {
    console.log('Delete blog with id:', id)
    // Add your delete logic here
  }

  return (
    <div className="container py-4 bg-white">

      {currentBlogs.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Author</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>

              {currentBlogs && currentBlogs.map(({ id, name, title, date, author }, index) => (

                <tr key={name}>
                  {/* <td>{startIndex + 1}</td> */}
                  <td>{startIndex + index + 1}</td>
                  <td className="text-start">{title}</td>
                  <td>{author}</td>
                  <td>{date}</td>
                  <td className="d-flex justify-content-center">
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => handleEdit(id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(id)}
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
        <div className="text-center text-muted">No blogs available.</div>
      )}
    </div>
  )
}

export default BlogsView
