// 
'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { get_data, uploadFile, update } from '@/api/methods'
import Loading from '@/components/shared/Loading'

const BlogEdit = () => {
  const { id } = useParams()
  const router = useRouter()

  const [form, setForm] = useState({
    title: '',
    content: '',
    attach_image: '',
    author: '',
    date: ''
  })

  const [blogImageFile, setBlogImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [imageError, setImageError] = useState(false)
  const [errors, setErrors] = useState({})
  const [loadingData, setLoadingData] = useState(true)
  const [apiBaseUrl, setApiBaseUrl] = useState('')

  const fetchBlogData = async () => {
    try {
      const res = await get_data('Blog', '*', [['name', '=', id]])
      if (res?.length) {
        setForm(res[0])
        if (res[0].attach_image) {
          setImagePreview(res[0].attach_image)
        }
      }
    } catch (err) {
      console.error('Failed to fetch blog data', err)
    } finally {
      setLoadingData(false)
    }
  }

  useEffect(() => {
    fetchBlogData()
    setApiBaseUrl(process.env.NEXT_PUBLIC_API_BASE_URL || '')
  }, [id])

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const handleImageChange = e => {
    const file = e.target.files[0]
    if (file) {
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)
      setBlogImageFile(file)
      setImageError(false)
      
      if (errors.attach_image) {
        setErrors(prev => ({ ...prev, attach_image: null }))
      }
    }
  }

  const validateForm = () => {
    const requiredFields = ['title', 'content', 'author', 'date']
    const newErrors = {}

    requiredFields.forEach(field => {
      if (!form[field]) {
        newErrors[field] = 'This field is required'
      }
    })

    if (!form.attach_image && !blogImageFile) {
      newErrors.attach_image = 'Blog image is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      let imageUrl = form.attach_image

      if (blogImageFile) {
        imageUrl = await uploadFile(blogImageFile, 0)
        if (!imageUrl) throw new Error('Failed to upload image')
      }

      const updatedForm = {
        ...form,
        attach_image: imageUrl
      }

      await update('Blog', updatedForm.name, updatedForm)
      alert('Blog updated successfully.')
      router.push('/blogs/myblog')
    } catch (err) {
      console.error('Update failed:', err)
      alert(`Update failed: ${err.message || 'Unknown error'}`)
    }
  }

  const getCompleteImageUrl = (imagePath) => {
    if (!imagePath) return ''
    if (imagePath.startsWith('http')) return imagePath
    const formattedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`
    return `${apiBaseUrl}${formattedPath}`
  }

  const handleImageError = () => {
    console.error('Failed to load image:', form.attach_image)
    setImageError(true)
  }

  if (loadingData) return <Loading />

  return (
    <div className="container my-4">
      <h3>Edit Blog</h3>
      <form onSubmit={handleSubmit}>

        {/* Title */}
        <div className="mb-3">
          <label className="form-label">Title <span className="text-danger">*</span></label>
          <input
            type="text"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            name="title"
            value={form.title}
            onChange={handleChange}
          />
          {errors.title && <div className="invalid-feedback">{errors.title}</div>}
        </div>

        {/* Content */}
        <div className="mb-3">
          <label className="form-label">Content <span className="text-danger">*</span></label>
          <textarea
            className={`form-control ${errors.content ? 'is-invalid' : ''}`}
            name="content"
            value={form.content}
            onChange={handleChange}
          />
          {errors.content && <div className="invalid-feedback">{errors.content}</div>}
        </div>

        {/* Author */}
        <div className="mb-3">
          <label className="form-label">Author <span className="text-danger">*</span></label>
          <input
            type="text"
            className={`form-control ${errors.author ? 'is-invalid' : ''}`}
            name="author"
            value={form.author}
            onChange={handleChange}
          />
          {errors.author && <div className="invalid-feedback">{errors.author}</div>}
        </div>

        {/* Published Date */}
        <div className="mb-3">
          <label className="form-label">Published Date <span className="text-danger">*</span></label>
          <input
            type="date"
            className={`form-control ${errors.date ? 'is-invalid' : ''}`}
            name="date"
            value={form.date}
            onChange={handleChange}
          />
          {errors.date && <div className="invalid-feedback">{errors.date}</div>}
        </div>

        {/* Blog Image Upload with Error Handling */}
        <div className="mb-3">
          <label className="form-label">Blog Image <span className="text-danger">*</span></label>
          
          {form.attach_image && !imageError ? (
            <div className="position-relative mb-2">
              <img
                src={getCompleteImageUrl(form.attach_image)}
                alt="Blog Preview"
                className="img-thumbnail"
                style={{ maxHeight: '150px' }}
                onError={handleImageError}
              />
              <div className="small text-muted mt-1">
                Current image: {form.attach_image.split('/').pop()}
              </div>
            </div>
          ) : blogImageFile ? (
            <div className="position-relative mb-2">
              <img
                src={imagePreview}
                alt="New Image Preview"
                className="img-thumbnail"
                style={{ maxHeight: '150px' }}
              />
              <div className="small text-muted mt-1">
                New image selected: {blogImageFile.name}
              </div>
            </div>
          ) : (
            <div className="alert alert-warning">
              {imageError ? 
                "Current image couldn't be displayed. Please upload a new image." : 
                "No image available. Please upload a blog image."}
            </div>
          )}

          <input 
            type="file" 
            className={`form-control ${errors.attach_image ? 'is-invalid' : ''}`} 
            accept="image/*" 
            onChange={handleImageChange} 
          />
          {errors.attach_image && <div className="invalid-feedback">{errors.attach_image}</div>}
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary">Update Blog</button>
      </form>
    </div>
  )
}

export default BlogEdit