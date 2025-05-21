"use client";
import React from "react";
import { useParams } from "next/navigation";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
//import BlogsHeader from "@/components/blogs/BlogsHeader";
import BlogDetail from "@/components/blogs/BlogsDetail";

const BlogDetailPage = () => {
  const { id } = useParams(); // ✅ Extract dynamic blog ID from the URL


  console.log(id)

  return (
    <>
      <PageHeader>
        
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <BlogDetail blogId={id} /> {/* ✅ Pass the blog ID to BlogDetail */}
        </div>
      </div>
    </>
  );
};

export default BlogDetailPage;


