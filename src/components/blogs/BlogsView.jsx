'use client'

import React from 'react'

// Sample blog data
const blogData = [
  {
    id: 1,
    title: 'Top 10 AI Trends in 2025',
    author: 'Navya',
    image: '/images/blog1.jpg',
  },
  {
    id: 2,
    title: 'The Rise of Ethical Hacking',
    author: 'Rahul',
    image: '/images/blog2.jpg',
  },
  {
    id: 3,
    title: 'How Blockchain is Changing Finance',
    author: 'Ananya',
    image: '/images/blog3.jpg',
  },
  {
    id: 4,
    title: 'Introduction to Deep Learning',
    author: 'George',
    image: '/images/blog4.jpg',
  },
]

const BlogsView = () => {
  return (
    <div className="container py-5 bg-white">
      <h2 className="mb-4">All Blogs</h2>

      <div className="row g-4">
        {blogData.length > 0 ? (
          blogData.map(({ id, title, author, image }) => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={id}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-header d-flex justify-content-between align-items-center bg-white border-0">
                  <img
                    src="/logo.svg"
                    alt="logo"
                    style={{ width: '20px', height: '20px' }}
                  />
                  <small className="text-muted">
                    By <strong>{author}</strong>
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
                  <button className="btn btn-warning btn-sm text-white rounded-pill">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center text-muted">No blogs available.</div>
        )}
      </div>
    </div>
  )
}

export default BlogsView