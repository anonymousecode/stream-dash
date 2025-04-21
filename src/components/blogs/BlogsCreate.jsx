"use client"

import { useEffect, useState } from "react"
import "trix"
import "trix/dist/trix.css"
import { insertDoc, uploadFile, get_data } from '@/api/methods'

const BlogsCreate = () => {

  const [blogImage, setBlogImage] = useState(null)
  const [form, setForm] = useState({
    title: "",
    date: "",
    author: "",
    attach_image: null,
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
    const { name, value } = e.target

    setForm((prev) => ({ ...prev, [name]: value }))

  }

  const handleSubmit = async (e) => {
    console.log("Form data:", form);
    console.log("Image:", blogImage);

    e.preventDefault()

    const imageUrl = await uploadFile(blogImage, 0)
    console.log("Image URL:", imageUrl);
    const updatedForm = {
      ...form,
      attach_image: imageUrl,
    };

    console.log("Form data:", updatedForm);



    const result = await insertDoc("Blog", updatedForm);
  }

  return (
    <div className="container mt-3">
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
          <input type="file" name="attach_image" className="form-control" onChange={(e) => { setBlogImage(e.target.files[0]) }} />
          <div className="mt-3 d-flex gap-2 flex-wrap">
            {blogImage &&
              <img

                src={URL.createObjectURL(blogImage)}
                alt="event"
                className="rounded"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
            }
          </div>
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

        <button type="submit" className="btn btn-primary">save</button>
      </form>
    </div>
  )
}

export default BlogsCreate
