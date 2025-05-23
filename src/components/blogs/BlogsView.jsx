'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { get_data } from '@/api/methods';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const tabs = ['Latest Blogs', 'Old Blogs'];

const BlogView = () => {
  const router = useRouter();
  const [blogsData, setBlogsData] = useState([]);

  useEffect(() => {
    get_data(
      "Blog",
      [
        "name",
        "title",
        "date",
        "author",
        "short_description",
        "attach_image",
        "content"
      ],
      ""
    )
      .then((res) => {
        console.log("Blog data:", res);
        setBlogsData(res);
      })
      .catch((err) => {
        console.log("Error fetching blog data:", err);
      });
  }, []);

  const [activeTab, setActiveTab] = useState('Latest Blogs');
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 8;

  // Get today's date (without time)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Determine if blog is recent (last 1 year) or archived (older than 1 year)
  const isLatest = (blogDate) => {
    const date = new Date(blogDate);
    return date >= new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
  };

  const isArchived = (blogDate) => {
    const date = new Date(blogDate);
    return date < new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
  };

  // Filter blogs based on active tab
  const filteredBlogs = blogsData.filter((blog) =>
    activeTab === 'Latest Blogs' ? isLatest(blog.date) : isArchived(blog.date)
  );

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1); // reset page on tab change
  };

  const handleViewBlogDetail = (blogId) => {
    router.push(`/blogs/detail/${blogId}`);
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

      {/*Blog Cards*/}
<div className="row g-4">
  {currentBlogs.length > 0 ? (
    currentBlogs.map((item) => (
      <div className="col-sm-6 col-md-4 col-lg-3" key={item.name}>
        <div className="card h-100 shadow-sm border-0">
          {item.attach_image && (
            <img
              src={item.attach_image.startsWith('http') ? item.attach_image : `${apiBaseUrl}${item.attach_image}`}
              alt={item.title}
              className="card-img-top"
              style={{ height: '180px', objectFit: 'cover' }}
            />
          )}
          <div className="card-body d-flex flex-column">
            <h5 className="card-title text-truncate">{item.title}</h5>
            <p className="card-text text-muted mb-1 small">By {item.author}</p>
            <p className="card-text text-muted mb-2 small">
              {new Date(item.date).toLocaleDateString('en-GB')}
            </p>
            <p className="card-text small flex-grow-1">
              {item.short_description?.slice(0, 80)}...
            </p>
            <div className="mt-auto pt-3 pb-2">
              <button
                className="btn btn-warning btn-sm text-white rounded-2"
                onClick={() => handleViewBlogDetail(item.name)}
              >
                Open
              </button>
            </div>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className="col-12 text-center text-muted">
      No {activeTab === 'Latest Blogs' ? 'latest' : 'archived'} blogs available.
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

export default BlogView;
