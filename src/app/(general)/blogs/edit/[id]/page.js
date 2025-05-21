"use client";
import React from "react";
import { useParams } from "next/navigation";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import BlogEdit from "@/components/blogs/BlogEdit"; // Replace with your actual component

const BlogEditPage = () => {
  const { id } = useParams(); // ✅ Extract dynamic blog ID from the URL

  console.log(id);

  return (
    <>
      <PageHeader>
        {/* You can optionally include a title or breadcrumbs here */}
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <BlogEdit blogId={id} /> {/* ✅ Pass the blog ID to BlogEdit */}
        </div>
      </div>
    </>
  );
};

export default BlogEditPage;

