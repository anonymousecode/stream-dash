"use client"

import { useEffect, useState } from "react"
import "trix"
import "trix/dist/trix.css"

const BlogsCreate = () => {
  const [form, setForm] = useState({
    title: "",
    date: "",
    author: "",
    attach_image: null,
    blog_image: null,
    content: "",
    short_description: "",
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const editor = document.querySelector("trix-editor")
      if (editor) {
        editor.addEventListener("trix-change", (e) => {
          setForm((prev) => ({
            ...prev,
            content: e.target.innerHTML,
          }))
        })
      }
    }
  }, [])

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (files) {
      setForm((prev) => ({ ...prev, [name]: files[0] }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form Data", form)
  }

  return (
    <div className="container mt-5">
      <h3>Create Blog</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input name="title" className="form-control" onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Date</label>
          <input type="date" name="date" className="form-control" onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Author</label>
          <input name="author" className="form-control" onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Attach Image</label>
          <input type="file" name="attach_image" className="form-control" onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Content</label>
          <input type="hidden" id="content" />
          <trix-editor input="content"></trix-editor>
        </div>

        <div className="mb-3">
          <label className="form-label">Short Description</label>
          <textarea
            name="short_description"
            className="form-control"
            rows="4"
            onChange={handleChange}
            placeholder="Write a short description..."
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">Submit Blog</button>
      </form>
    </div>
  )
}

export default BlogsCreate
