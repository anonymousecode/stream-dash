
'use client'

import React, { useState, useEffect } from 'react'
import { get_data, getUser,trash } from '@/api/methods'
import { useRouter } from 'next/navigation'

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const BlogsManage = () => {
  const [blogData, setBlogData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const blogsPerPage = 4
  const router = useRouter()

  

  useEffect(() => {
    const fetchUserAndBlogs = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch current user
        const userData = await getUser()
        if (!userData) {
          throw new Error("Failed to fetch user data")
        }

        console.log("my details "+ userData.name);
        
        // Assuming the user data contains an ID field - adjust based on your API response structure
        const userId = userData.name 
        setCurrentUser(userId)

        // Fetch blogs
        const res = await get_data(
          "Blog",
          ["name", "title", "date", "author","author_name", "content", "attach_image","short_description"],
          "{}"
        )

        let fetchedBlogs = []
        if (res && res.length) {
          fetchedBlogs = res
          }
        

        // Filter blogs for current user
        const userBlogs = fetchedBlogs.filter(blog => blog.author === userId)
        setBlogData(userBlogs)
        
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Failed to load blogs. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchUserAndBlogs()
  }, [])

  const totalPages = Math.ceil(blogData.length / blogsPerPage)
  const startIndex = (currentPage - 1) * blogsPerPage
  const currentBlogs = blogData.slice(startIndex, startIndex + blogsPerPage)

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber)

  const handleEdit = (blogId) => {
    router.push(`/blogs/edit/${blogId}`)
  }

//   const handleRemove = async (blogId) => {
//   try {
//     // Call backend delete API
//     await trash("Blog", blogId);

//     // Remove from local state only after successful deletion
//     setBlogData(prevData => prevData.filter(blog => blog.name !== blogId));

//     // Handle pagination if needed
//     if ((blogData.length - 1) % blogsPerPage === 0 && currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }

//     console.log("Blog deleted:", blogId);
//   } catch (err) {
//     console.error("Failed to delete blog:", err);
//     alert("Failed to delete blog. Please try again.");
//   }
// };

const handleRemove = async (blogId) => {
  const confirmed = window.confirm("Are you sure you want to delete this blog?");

  if (!confirmed) return; // Stop if user cancels

  try {
    // Call backend delete API
    await trash("Blog", blogId);

    // Remove from local state only after successful deletion
    setBlogData(prevData => prevData.filter(blog => blog.name !== blogId));

    // Handle pagination if needed
    if ((blogData.length - 1) % blogsPerPage === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }

    console.log("Blog deleted:", blogId);
  } catch (err) {
    console.error("Failed to delete blog:", err);
    alert("Failed to delete blog. Please try again.");
  }
};


  const handleOpen = (blogId) => {
    router.push(`/blogs/detail/${blogId}`)
  }

  const toggleDropdown = (blogId) => {
    setOpenDropdown(openDropdown === blogId ? null : blogId)
  }

  if (loading) {
    return (
      <div className="container py-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading your blogs...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-4 bg-white p-4 rounded shadow-sm">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="container py-4">
      {/* Blog Cards */}
      <div className="row">
        {currentBlogs.length > 0 ? currentBlogs.map((blog) => (
          <div key={blog.name} className="col-md-6 col-lg-3 mb-4 position-relative">
            <div className="card h-100 shadow-sm">

              {/* Dropdown menu */}
              <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}>
                <button
                  className="btn btn-sm btn-light"
                  onClick={() => toggleDropdown(blog.name)}
                  aria-label="Toggle menu"
                  style={{ border: 'none', background: 'transparent', fontSize: '1.5rem', lineHeight: 1 }}
                >
                  &#8942;
                </button>
                {openDropdown === blog.name && (
                  <div
                    className="shadow bg-white rounded"
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      width: '100px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    }}
                  >
                    <button
                      className="dropdown-item btn btn-link"
                      style={{ color: 'black' }}
                      onClick={() => {
                        handleEdit(blog.name)
                        setOpenDropdown(null)
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="dropdown-item btn btn-link"
                      style={{ color: 'black' }}
                      onClick={() => {
                        handleRemove(blog.name)
                        setOpenDropdown(null)
                      }}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              <img
                src={`${apiBaseUrl}${blog.attach_image}`}
                className="card-img-top"
                alt={blog.title}
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h6 className="card-title fw-bold">
                  {blog.title.length > 40 ? blog.title.slice(0, 40) + "..." : blog.title}
                </h6>
                <p className="text-muted mb-1">By {blog.author_name}</p>
                <p className="text-muted" style={{ fontSize: '0.875rem' }}>
                  {new Date(blog.date).toLocaleDateString('en-GB')}
                </p>
                <p className="card-text flex-grow-1">
                  {blog.short_description?.slice(0, 80)+"..."}
                </p>
                <div className="mt-3">
                  <button
                    className="btn btn-outline-primary btn-sm w-100"
                    onClick={() => handleOpen(blog.name)}
                  >
                    Open
                  </button>
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className="text-center text-muted">
            {currentUser ? "You haven't created any blogs yet." : "No blogs available."}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(page)}>
                  {page}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}

export default BlogsManage