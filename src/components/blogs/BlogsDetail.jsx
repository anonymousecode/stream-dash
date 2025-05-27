"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { get_data } from "@/api/methods";
import Loading from "@/components/shared/Loading";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const BlogDetail = () => {
  const router = useRouter();
  const { id: blogId } = useParams(); // Extract blog ID from URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      if (!blogId) {
        setLoading(false);
        return;
      }

      try {
        const res = await get_data(
          "Blog", // Assuming your API collection/table is named "Blog"
          [
            "name",
            "title",
            "author",
            "author_name",
            "date",
            "content",
            "attach_image"
           
            
          ],
          [["name", "=", blogId]] // Filter by blog ID
        );

        if (res && res.length > 0) {
          setBlog(res[0]);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching blog details:", err);
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [blogId]);

  const formatDate = (dateString) => {
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', options); // Output: "06 May 2025"
};

  const handleBack = () => {
    router.push("/blogs/view"); // Redirect back to blog listing page
  };

  if (loading) return <Loading />;

  if (!blog) {
    return (
      <div className="container py-5">
        <button className="btn btn-outline-secondary mb-4" onClick={handleBack}>
          <i className="fas fa-arrow-left me-2"></i>Back to Blogs
        </button>
        <div className="alert alert-warning">Blog post not found</div>
      </div>
    );
  }

  return (
    <div className="container py-4 bg-white">
      {/* Back button */}
      <button className="btn btn-outline-secondary mb-4" onClick={handleBack}>
        <i className="fas fa-arrow-left me-2"></i>Back to Blogs
      </button>

      {/* Blog Details */}
      <div className="row">
        {/* Blog Image */}
        <div className="col-lg-6 mb-4">
          <div className="position-relative">
            <img
              src={`${apiBaseUrl}${blog.attach_image}`}
              alt={blog.title}
              className="img-fluid rounded shadow"
              style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
            />
            {/* Date badge removed from here */}
          </div>
        </div>

        {/* Blog Info */}
        <div className="col-lg-6">
          <h2 className="mb-3">{blog.title}</h2>

          <div className="mb-4">
            <p className="mb-0">{blog.author_name}</p>
            
            <p  className="mt-0">{formatDate(blog.date)}</p>
          </div>

         

          {blog.tags && blog.tags.length > 0 && (
            <div className="mb-4">
              <h6 className="text-secondary">Tags</h6>
              <div className="d-flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <span key={tag} className="badge bg-secondary">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Full Content */}
        <div className="col-12 mt-4">
          <div className="p-4 bg-light rounded">
            <p style={{ whiteSpace: "pre-line" }} dangerouslySetInnerHTML={{ __html: blog.content }} />

          </div>
        </div>

        {/* Credit Section */}
        {blog.credit && (
          <div className="col-12 mt-4">
            <h5 className="text-secondary">Credits</h5>
            <p>{blog.credit}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;

