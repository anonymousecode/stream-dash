'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { get_data, uploadFile, update } from '@/api/methods'
import useDatePicker from '@/hooks/useDatePicker'
import useLocationData from '@/hooks/useLocationData'
import Loading from '@/components/shared/Loading'
import "trix"
import "trix/dist/trix.css"

const EventEdit = () => {
  const { id } = useParams()
  const router = useRouter()

  const [form, setForm] = useState({
    title: '',
    short_description: '',
    description: '',
    event_image: '',
    venue: '',
    place: '',
    level: '',
    host: '',
    time: '',
    date: '',
    partner_name: '',
    credit: '',
    brc: '',
    district: '',
    lab_type: '',
    state: ''
  })

  const [states, setStates] = useState([])
  const [districts, setDistricts] = useState([])
  const [brcs, setBrcs] = useState([])
  const [labs, setLabs] = useState([])
  const [eventImages, setEventImages] = useState(null)
  const [errors, setErrors] = useState({})
  const [loadingData, setLoadingData] = useState(true)
  const [imagePreview, setImagePreview] = useState('')
  const [imageError, setImageError] = useState(false)
  const [apiBaseUrl, setApiBaseUrl] = useState('')

  const { loading } = useLocationData()
  const { startDate, setStartDate } = useDatePicker()

  // Fetch Event data by id (name)
  const fetchEventData = useCallback(async () => {
    try {
      const res = await get_data('Events', '*', [['name', '=', id]])
      if (res?.length) {
        console.log('Fetched event data:', res[0])
        setForm(res[0])
        setStartDate(new Date(res[0].date))
        if (res[0].event_image) {
          setImagePreview(res[0].event_image) // relative URL or full URL handled later
        }
      } else {
        console.error('Event not found.')
      }
    } catch (err) {
      console.error('Failed to fetch event data', err)
    } finally {
      setLoadingData(false)
    }
  }, [id, setStartDate])

  // Fetch dropdown data helpers
  const fetchDropdownData = async (tableName, setStateCallback) => {
    try {
      const data = await get_data(tableName, 'name')
      if (Array.isArray(data)) {
        setStateCallback(data.map(item => item.name))
      }
    } catch (err) {
      console.error(`Failed to fetch ${tableName}`, err)
    }
  }

  useEffect(() => {
    fetchEventData()
    fetchDropdownData('State', setStates)
    fetchDropdownData('District', setDistricts)
    fetchDropdownData('BRC', setBrcs)
    fetchDropdownData('Lab', setLabs)

    setApiBaseUrl(process.env.NEXT_PUBLIC_API_BASE_URL || '')
  }, [fetchEventData])

  // Handle trix editor changes
  useEffect(() => {
    const handleTrixChange = (event) => {
      const editor = event.target
      // Get the name attribute from associated input field (hidden input)
      const inputId = editor.getAttribute('input')
      const inputElement = document.getElementById(inputId)
      if (!inputElement) return
      const name = inputElement.getAttribute('name')
      const value = editor.innerHTML || ''
      setForm(prevForm => ({
        ...prevForm,
        [name]: value
      }))
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: null }))
      }
    }
    document.addEventListener('trix-change', handleTrixChange)

    return () => {
      document.removeEventListener('trix-change', handleTrixChange)
    }
  }, [errors])

  // Handle input changes (non-trix)
  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  // Handle image file selection
  const handleImageChange = e => {
    const file = e.target.files[0]
    if (file) {
      if (imagePreview && eventImages) {
        URL.revokeObjectURL(imagePreview)
      }
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)
      setEventImages(file)
      setImageError(false)
      if (errors.event_image) {
        setErrors(prev => ({ ...prev, event_image: null }))
      }
    }
  }

  const validateForm = () => {
    const requiredFields = [
      'title',
      'short_description',
      'description',
      'venue',
      'place',
      'level',
      'date',
      'state',
      'district',
      'brc',
      'lab_type'
    ]

    const newErrors = {}
    requiredFields.forEach(field => {
      if (!form[field] || (typeof form[field] === 'string' && form[field].trim() === '')) {
        newErrors[field] = 'This field is required'
      }
    })

    if (!form.event_image && !eventImages) {
      newErrors.event_image = 'Event image is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      let imageUrl = form.event_image

      if (eventImages) {
        imageUrl = await uploadFile(eventImages, 0)
        if (!imageUrl) throw new Error('Failed to upload image')
      }

      const updatedForm = {
        ...form,
        event_image: imageUrl,
        date: startDate.toISOString().split('T')[0]
      }

      await update('Events', updatedForm.name, updatedForm)
      alert('Event updated successfully.')
      router.push('/events/manage')
    } catch (err) {
      console.error('Update failed:', err)
      alert(`Update failed: ${err.message || 'Unknown error'}`)
    }
  }

  const getCompleteImageUrl = (imagePath) => {
    if (!imagePath) return ''

    if (imagePath.startsWith('http')) {
      return imagePath
    }

    const formattedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`
    return `${apiBaseUrl}${formattedPath}`
  }

  const handleImageError = () => {
    console.error('Failed to load image:', form.event_image)
    setImageError(true)
  }

  if (loadingData || loading) return <Loading />

  return (
    <div className="container my-4">
      <h3>Edit Event</h3>
      <form onSubmit={handleSubmit}>

        {/* Title */}
        <div className="mb-3">
          <label className="form-label">
            Title <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            name="title"
            value={form.title}
            onChange={handleChange}
          />
          {errors.title && <div className="invalid-feedback">{errors.title}</div>}
        </div>

        {/* Short Description */}
        <div className="mb-3">
          <label className="form-label">
            Short Description <span className="text-danger">*</span>
          </label>
          <input
            type="hidden"
            id="short_description"
            name="short_description"
            value={form.short_description}
          />
          <trix-editor
            input="short_description"
            className={errors.short_description ? 'trix-content is-invalid' : 'trix-content'}
          />
          {errors.short_description && (
            <div className="invalid-feedback d-block">{errors.short_description}</div>
          )}
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">
            Description <span className="text-danger">*</span>
          </label>
          <input
            type="hidden"
            id="description"
            name="description"
            value={form.description}
          />
          <trix-editor
            input="description"
            className={errors.description ? 'trix-content is-invalid' : 'trix-content'}
          />
          {errors.description && (
            <div className="invalid-feedback d-block">{errors.description}</div>
          )}
        </div>

        {/* Date */}
        <div className="mb-3">
          <label className="form-label">
            Date <span className="text-danger">*</span>
          </label>
          <input
            type="date"
            className={`form-control ${errors.date ? 'is-invalid' : ''}`}
            value={startDate ? startDate.toISOString().split('T')[0] : ''}
            onChange={e => setStartDate(new Date(e.target.value))}
          />
          {errors.date && <div className="invalid-feedback">{errors.date}</div>}
        </div>

        {/* Venue */}
        <div className="mb-3">
          <label className="form-label">
            Venue <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${errors.venue ? 'is-invalid' : ''}`}
            name="venue"
            value={form.venue}
            onChange={handleChange}
          />
          {errors.venue && <div className="invalid-feedback">{errors.venue}</div>}
        </div>

        {/* Place */}
        <div className="mb-3">
          <label className="form-label">
            Place <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${errors.place ? 'is-invalid' : ''}`}
            name="place"
            value={form.place}
            onChange={handleChange}
          />
          {errors.place && <div className="invalid-feedback">{errors.place}</div>}
        </div>

        {/* Level */}
        <div className="mb-3">
          <label className="form-label">
            Level <span className="text-danger">*</span>
          </label>
          <select
            className={`form-select ${errors.level ? 'is-invalid' : ''}`}
            name="level"
            value={form.level}
            onChange={handleChange}
          >
            <option value="">Select Level</option>
            <option value="BRC">BRC</option>
            <option value="District">District</option>
            <option value="State">State</option>
          </select>
          {errors.level && <div className="invalid-feedback">{errors.level}</div>}
        </div>

        {/* Event Image Upload with Error Handling */}
        <div className="mb-3">
          <label className="form-label">
            Event Image <span className="text-danger">*</span>
          </label>
          <input
            type="file"
            accept="image/*"
            className={`form-control ${errors.event_image ? 'is-invalid' : ''}`}
            onChange={handleImageChange}
          />
          {errors.event_image && <div className="invalid-feedback">{errors.event_image}</div>}
          {imagePreview && !imageError && (
            <img
              src={getCompleteImageUrl(imagePreview)}
              alt="Event Preview"
              style={{ maxWidth: '200px', marginTop: '10px' }}
              onError={handleImageError}
            />
          )}
          {imageError && <div className="text-danger mt-2">Failed to load event image.</div>}
        </div>

        {/* State */}
        <div className="mb-3">
          <label className="form-label">
            State <span className="text-danger">*</span>
          </label>
          <select
            className={`form-select ${errors.state ? 'is-invalid' : ''}`}
            name="state"
            value={form.state}
            onChange={handleChange}
          >
            <option value="">Select State</option>
            {states.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.state && <div className="invalid-feedback">{errors.state}</div>}
        </div>

        {/* District */}
        <div className="mb-3">
          <label className="form-label">
            District <span className="text-danger">*</span>
          </label>
          <select
            className={`form-select ${errors.district ? 'is-invalid' : ''}`}
            name="district"
            value={form.district}
            onChange={handleChange}
          >
            <option value="">Select District</option>
            {districts.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          {errors.district && <div className="invalid-feedback">{errors.district}</div>}
        </div>

        {/* BRC */}
        <div className="mb-3">
          <label className="form-label">
            BRC <span className="text-danger">*</span>
          </label>
          <select
            className={`form-select ${errors.brc ? 'is-invalid' : ''}`}
            name="brc"
            value={form.brc}
            onChange={handleChange}
          >
            <option value="">Select BRC</option>
            {brcs.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          {errors.brc && <div className="invalid-feedback">{errors.brc}</div>}
        </div>

        {/* Lab Type */}
        <div className="mb-3">
          <label className="form-label">
            Lab Type <span className="text-danger">*</span>
          </label>
          <select
            className={`form-select ${errors.lab_type ? 'is-invalid' : ''}`}
            name="lab_type"
            value={form.lab_type}
            onChange={handleChange}
          >
            <option value="">Select Lab Type</option>
            {labs.map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
          {errors.lab_type && <div className="invalid-feedback">{errors.lab_type}</div>}
        </div>

        {/* Host */}
        <div className="mb-3">
          <label className="form-label">
            Host
          </label>
          <input
            type="text"
            className="form-control"
            name="host"
            value={form.host}
            onChange={handleChange}
          />
        </div>

        {/* Time */}
        <div className="mb-3">
          <label className="form-label">
            Time
          </label>
          <input
            type="time"
            className="form-control"
            name="time"
            value={form.time}
            onChange={handleChange}
          />
        </div>

        {/* Partner Name */}
        <div className="mb-3">
          <label className="form-label">
            Partner Name
          </label>
          <input
            type="text"
            className="form-control"
            name="partner_name"
            value={form.partner_name}
            onChange={handleChange}
          />
        </div>

        {/* Credit */}
        <div className="mb-3">
          <label className="form-label">
            Credit
          </label>
          <input
            type="text"
            className="form-control"
            name="credit"
            value={form.credit}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">Update Event</button>
      </form>
    </div>
  )
}

export default EventEdit

// 'use client'
// import React, { useEffect, useState } from 'react'
// import { useParams, useRouter } from 'next/navigation'
// import { get_data, uploadFile, update } from '@/api/methods'
// import useDatePicker from '@/hooks/useDatePicker'
// import useLocationData from '@/hooks/useLocationData'
// import Loading from '@/components/shared/Loading'
// import "trix"
// import "trix/dist/trix.css"

// const EventEdit = () => {
//   const { id } = useParams()
//   const router = useRouter()

//   const [form, setForm] = useState({
//     title: '',
//     short_description: '',
//     description: '',
//     event_image: '',
//     venue: '',
//     place: '',
//     level: '',
//     host: '',
//     time: '',
//     date: '',
//     partner_name: '',
//     credit: '',
//     brc: '',
//     district: '',
//     lab_type: '',
//     state: ''
//   })

//   const [states, setStates] = useState([])
//   const [districts, setDistricts] = useState([])
//   const [brcs, setBrcs] = useState([])
//   const [labs, setLabs] = useState([])
//   const [eventImages, setEventImages] = useState(null)
//   const [errors, setErrors] = useState({})
//   const [loadingData, setLoadingData] = useState(true)
//   const [imagePreview, setImagePreview] = useState('')
//   const [imageError, setImageError] = useState(false)
//   const [apiBaseUrl, setApiBaseUrl] = useState('')

//   const { loading } = useLocationData()
//   const { startDate, setStartDate } = useDatePicker()

//   // Fetch Event data by id (name)
//   const fetchEventData = async () => {
//     try {
//       const res = await get_data('Events', '*', [['name', '=', id]])
//       if (res?.length) {
//         setForm(res[0])
//         setStartDate(new Date(res[0].date))
//         // Set the image preview from the existing event_image
//         if (res[0].event_image) {
//           setImagePreview(res[0].event_image) // The actual URL will be constructed when rendering
//         }
//       } else {
//         console.error('Event not found.')
//       }
//     } catch (err) {
//       console.error('Failed to fetch event data', err)
//     } finally {
//       setLoadingData(false)
//     }
//   }

//   // Fetch dropdown data helpers
//   const fetchDropdownData = async (tableName, setStateCallback) => {
//     try {
//       const data = await get_data(tableName, 'name')
//       if (Array.isArray(data)) {
//         setStateCallback(data.map(item => item.name))
//       }
//     } catch (err) {
//       console.error(`Failed to fetch ${tableName}`, err)
//     }
//   }

//   useEffect(() => {
//     fetchEventData()
//     fetchDropdownData('State', setStates)
//     fetchDropdownData('District', setDistricts)
//     fetchDropdownData('BRC', setBrcs)
//     fetchDropdownData('Lab', setLabs)
    
//     // Get the API base URL from environment variables
//     setApiBaseUrl(process.env.NEXT_PUBLIC_API_BASE_URL || '')
//   }, [id])

//   const handleChange = e => {
//     const { name, value } = e.target
//     setForm(prev => ({ ...prev, [name]: value }))
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: null }))
//     }
//     useEffect(() => {
//   const handleTrixChange = (event) => {
//     const { name, value } = event.target;
//     setForm((prevForm) => ({
//       ...prevForm,
//       [name]: value
//     }));
//   };

//   document.addEventListener('trix-change', handleTrixChange);

//   return () => {
//     document.removeEventListener('trix-change', handleTrixChange);
//   };
// }, []);

//   }

//   const handleImageChange = e => {
//     const file = e.target.files[0]
//     if (file) {
//       // Create a preview URL for the selected file
//       const previewUrl = URL.createObjectURL(file)
//       setImagePreview(previewUrl)
//       setEventImages(file)
//       setImageError(false)
      
//       // Clear any existing error for the event_image field
//       if (errors.event_image) {
//         setErrors(prev => ({ ...prev, event_image: null }))
//       }
//     }
//   }

//   const validateForm = () => {
//     const requiredFields = [
//       'title',
//       'short_description',
//       'description',
//       'venue',
//       'place',
//       'level',
//       'date',
//       'state_name',
//       'district_name',
//       'brc_name',
//       'lab_type'
//     ]

//     const newErrors = {}
//     requiredFields.forEach(field => {
//       if (!form[field]) {
//         newErrors[field] = 'This field is required'
//       }
//     })

//     // Special validation for image - either existing or new must be present
//     if (!form.event_image && !eventImages) {
//       newErrors.event_image = 'Event image is required'
//     }

//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleSubmit = async e => {
//     e.preventDefault()
//     if (!validateForm()) return

//     try {
//       let imageUrl = form.event_image

//       if (eventImages) {
//         // Upload the new image and get its URL
//         imageUrl = await uploadFile(eventImages, 0)
//         if (!imageUrl) {
//           throw new Error('Failed to upload image')
//         }
//       }

//       const updatedForm = {
//         ...form,
//         event_image: imageUrl, // Store the relative path returned by the API
//         date: startDate.toISOString().split('T')[0]
//       }

//       await update('Events', updatedForm.name, updatedForm)
//       alert('Event updated successfully.')
//       router.push('/events/manage')
//     } catch (err) {
//       console.error('Update failed:', err)
//       alert(`Update failed: ${err.message || 'Unknown error'}`)
//     }
//   }

//   // Get complete image URL by combining the base URL with the relative path
//   const getCompleteImageUrl = (imagePath) => {
//     if (!imagePath) return '';
    
//     // If the image path already includes http or https, return it as is
//     if (imagePath.startsWith('http')) {
//       return imagePath;
//     }
    
//     // Make sure the image path starts with a slash
//     const formattedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    
//     // Combine the base URL with the image path
//     return `${apiBaseUrl}${formattedPath}`;
//   }

//   // Handle image load error
//   const handleImageError = () => {
//     console.error('Failed to load image:', form.event_image);
//     setImageError(true);
//   }

//   return (
//     <div className="container my-4">
//       <h3>Edit Event</h3>
//       <form onSubmit={handleSubmit}>

//         {/* Title */}
//         <div className="mb-3">
//           <label className="form-label">
//             Title <span className="text-danger">*</span>
//           </label>
//           <input
//             type="text"
//             className={`form-control ${errors.title ? 'is-invalid' : ''}`}
//             name="title"
//             value={form.title}
//             onChange={handleChange}
//           />
//           {errors.title && <div className="invalid-feedback">{errors.title}</div>}
//         </div>

//         {/* Short Description */}
//         {/* <div className="mb-3">
//           <label className="form-label">
//             Short Description <span className="text-danger">*</span>
//           </label>
//           <textarea
//             className={`form-control ${errors.short_description ? 'is-invalid' : ''}`}
//             name="short_description"
//             value={form.short_description}
//             onChange={handleChange}
//           />
//           {errors.short_description && (
//             <div className="invalid-feedback">{errors.short_description}</div>
//           )}
//         </div> */}

//         {/* Description */}
//         {/* <div className="mb-3">
//           <label className="form-label">
//             Description <span className="text-danger">*</span>
//           </label>
//           <textarea
//             className={`form-control ${errors.description ? 'is-invalid' : ''}`}
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//           />
//           {errors.description && <div className="invalid-feedback">{errors.description}</div>}
//         </div> */}
//         {/* Short Description */}
// <div className="mb-3">
//   <label className="form-label">
//     Short Description <span className="text-danger">*</span>
//   </label>
//   <input
//     type="hidden"
//     name="short_description"
//     value={form.short_description}
//     onChange={handleChange}
//   />
//   <trix-editor
//     input="short_description"
//     class={errors.short_description ? 'trix-content is-invalid' : 'trix-content'}
//   ></trix-editor>
//   {errors.short_description && (
//     <div className="invalid-feedback d-block">{errors.short_description}</div>
//   )}
// </div>

// {/* Description */}
// <div className="mb-3">
//   <label className="form-label">
//     Description <span className="text-danger">*</span>
//   </label>
//   <input
//     type="hidden"
//     name="description"
//     value={form.description}
//     onChange={handleChange}
//   />
//   <trix-editor
//     input="description"
//     class={errors.description ? 'trix-content is-invalid' : 'trix-content'}
//   ></trix-editor>
//   {errors.description && (
//     <div className="invalid-feedback d-block">{errors.description}</div>
//   )}
// </div>

//         {/* Date */}
//         <div className="mb-3">
//           <label className="form-label">
//             Date <span className="text-danger">*</span>
//           </label>
//           <input
//             type="date"
//             className={`form-control ${errors.date ? 'is-invalid' : ''}`}
//             value={startDate ? startDate.toISOString().split('T')[0] : ''}
//             onChange={e => setStartDate(new Date(e.target.value))}
//           />
//           {errors.date && <div className="invalid-feedback">{errors.date}</div>}
//         </div>

//         {/* Venue */}
//         <div className="mb-3">
//           <label className="form-label">
//             Venue <span className="text-danger">*</span>
//           </label>
//           <input
//             type="text"
//             className={`form-control ${errors.venue ? 'is-invalid' : ''}`}
//             name="venue"
//             value={form.venue}
//             onChange={handleChange}
//           />
//           {errors.venue && <div className="invalid-feedback">{errors.venue}</div>}
//         </div>

//         {/* Place */}
//         <div className="mb-3">
//           <label className="form-label">
//             Place <span className="text-danger">*</span>
//           </label>
//           <input
//             type="text"
//             className={`form-control ${errors.place ? 'is-invalid' : ''}`}
//             name="place"
//             value={form.place}
//             onChange={handleChange}
//           />
//           {errors.place && <div className="invalid-feedback">{errors.place}</div>}
//         </div>

//         {/* Level */}
//         <div className="mb-3">
//           <label className="form-label">
//             Level <span className="text-danger">*</span>
//           </label>
//           <select
//             className={`form-select ${errors.level ? 'is-invalid' : ''}`}
//             name="level"
//             value={form.level}
//             onChange={handleChange}
//           >
//             <option value="">Select Level</option>
//             <option value="School">School</option>
//             <option value="District">District</option>
//             <option value="State">State</option>
//           </select>
//           {errors.level && <div className="invalid-feedback">{errors.level}</div>}
//         </div>

//         {/* Event Image Upload with Error Handling */}
//         <div className="mb-3">
//           <label className="form-label">Event Image <span className="text-danger">*</span></label>
          
//           {form.event_image && !imageError ? (
//             <div className="position-relative mb-2">
//               <img
//                 src={getCompleteImageUrl(form.event_image)}
//                 alt="Event Preview"
//                 className="img-thumbnail"
//                 style={{ maxHeight: '150px' }}
//                 onError={handleImageError}
//               />
//               <div className="small text-muted mt-1">
//                 Current image: {form.event_image.split('/').pop()}
//               </div>
//             </div>
//           ) : eventImages ? (
//             <div className="position-relative mb-2">
//               <img
//                 src={imagePreview}
//                 alt="New Image Preview"
//                 className="img-thumbnail"
//                 style={{ maxHeight: '150px' }}
//               />
//               <div className="small text-muted mt-1">
//                 New image selected: {eventImages.name}
//               </div>
//             </div>
//           ) : (
//             <div className="alert alert-warning">
//               {imageError ? 
//                 "Current image couldn't be displayed. Please upload a new image." : 
//                 "No image available. Please upload an event image."}
//             </div>
//           )}

//           <input 
//             type="file" 
//             className={`form-control ${errors.event_image ? 'is-invalid' : ''}`} 
//             accept="image/*" 
//             onChange={handleImageChange} 
//           />
//           {errors.event_image && <div className="invalid-feedback">{errors.event_image}</div>}
//         </div>

//         {/* Dropdowns: State, District, BRC, Lab Type */}
//         <div className="row">
//           <div className="col-md-6 mb-3">
//             <label className="form-label">
//               State <span className="text-danger">*</span>
//             </label>
//             <select
//               className={`form-select ${errors.state ? 'is-invalid' : ''}`}
//               name="state"
//               value={form.state}
//               onChange={handleChange}
//             >
//               <option value="">Select State</option>
//               {states.map((s, i) => (
//                 <option key={i} value={s}>
//                   {s}
//                 </option>
//               ))}
//             </select>
//             {errors.state && <div className="invalid-feedback">{errors.state}</div>}
//           </div>

//           <div className="col-md-6 mb-3">
//             <label className="form-label">
//               District <span className="text-danger">*</span>
//             </label>
//             <select
//               className={`form-select ${errors.district ? 'is-invalid' : ''}`}
//               name="district"
//               value={form.district}
//               onChange={handleChange}
//             >
//               <option value="">Select District</option>
//               {districts.map((d, i) => (
//                 <option key={i} value={d}>
//                   {d}
//                 </option>
//               ))}
//             </select>
//             {errors.district && <div className="invalid-feedback">{errors.district}</div>}
//           </div>

//           <div className="col-md-6 mb-3">
//             <label className="form-label">
//               BRC <span className="text-danger">*</span>
//             </label>
//             <select
//               className={`form-select ${errors.brc ? 'is-invalid' : ''}`}
//               name="brc"
//               value={form.brc}
//               onChange={handleChange}
//             >
//               <option value="">Select BRC</option>
//               {brcs.map((b, i) => (
//                 <option key={i} value={b}>
//                   {b}
//                 </option>
//               ))}
//             </select>
//             {errors.brc && <div className="invalid-feedback">{errors.brc}</div>}
//           </div>

//           <div className="col-md-6 mb-3">
//             <label className="form-label">
//               Lab Type <span className="text-danger">*</span>
//             </label>
//             <select
//               className={`form-select ${errors.lab_type ? 'is-invalid' : ''}`}
//               name="lab_type"
//               value={form.lab_type}
//               onChange={handleChange}
//             >
//               <option value="">Select Lab Type</option>
//               {labs.map((l, i) => (
//                 <option key={i} value={l}>
//                   {l}
//                 </option>
//               ))}
//             </select>
//             {errors.lab_type && <div className="invalid-feedback">{errors.lab_type}</div>}
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="text-center">
//           <button type="submit" className="btn btn-primary">
//             Update Event
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default EventEdit

// 'use client'
// import React, { useEffect, useState } from 'react'
// import { useParams, useRouter } from 'next/navigation'
// import { get_data, uploadFile, update } from '@/api/methods'
// import useDatePicker from '@/hooks/useDatePicker'
// import useLocationData from '@/hooks/useLocationData'
// import Loading from '@/components/shared/Loading'

// const EventEdit = () => {
//   const { id } = useParams()
//   const router = useRouter()

//   const [form, setForm] = useState({
//     title: '',
//     short_description: '',
//     description: '',
//     event_image: '',
//     venue: '',
//     place: '',
//     level: '',
//     host: '',
//     time: '',
//     date: '',
//     partner_name: '',
//     credit: '',
//     brc: '',
//     district: '',
//     lab_type: '',
//     state: '',
//     state_id: '',
//     district_id: '',
//     brc_id: ''
//   })

//   // State for dropdowns
//   const [states, setStates] = useState([])
//   const [districts, setDistricts] = useState([])
//   const [brcs, setBrcs] = useState([])
//   const [labs, setLabs] = useState([])
  
//   // Selected values for cascade filtering
//   const [selectedState, setSelectedState] = useState('')
//   const [selectedDistrict, setSelectedDistrict] = useState('')
//   const [selectedBrc, setSelectedBrc] = useState('')
  
//   const [eventImages, setEventImages] = useState(null)
//   const [errors, setErrors] = useState({})
//   const [loadingData, setLoadingData] = useState(true)
//   const [imagePreview, setImagePreview] = useState('')
//   const [imageError, setImageError] = useState(false)
//   const [apiBaseUrl, setApiBaseUrl] = useState('')

//   const { loading } = useLocationData()
//   const { startDate, setStartDate } = useDatePicker()

//   // Fetch Event data by id (name)
//   const fetchEventData = async () => {
//     try {
//       const res = await get_data('Events', '*', [['name', '=', id]])
//       if (res?.length) {
//         const eventData = res[0]
//         setForm(eventData)
//         console.log(form)
//         // Set selected values for cascade filtering - important for dependent dropdown loading
//         // We need to do this sequentially to ensure they're loaded in the right order
        
//         if (eventData.state_id) {
//           console.log("Setting state ID:", eventData.state_id);
//           setSelectedState(eventData.state_id);
          
//           // Immediately load districts for this state
//           try {
//             const districtRes = await get_data(
//               "District", 
//               ["district_name", "name"], 
//               [["state_id", "=", eventData.state_id]]
//             );
            
//             if (!districtRes.error) {
//               setDistricts(districtRes);
//               console.log("Preloaded districts:", districtRes.length);
              
//               if (eventData.district_id) {
//                 console.log("Setting district ID:", eventData.district_id);
//                 setSelectedDistrict(eventData.district_id);
                
//                 // Immediately load BRCs for this district
//                 try {
//                   const brcRes = await get_data(
//                     "BRC", 
//                     ["brc_name", "name"], 
//                     [["district_id", "=", eventData.district_id]]
//                   );
                  
//                   if (!brcRes.error) {
//                     setBrcs(brcRes);
//                     console.log("Preloaded BRCs:", brcRes.length);
                    
//                     if (eventData.brc_id) {
//                       console.log("Setting BRC ID:", eventData.brc_id);
//                       setSelectedBrc(eventData.brc_id);
//                     }
//                   }
//                 } catch (brcErr) {
//                   console.error("Failed to preload BRCs", brcErr);
//                 }
//               }
//             }
//           } catch (distErr) {
//             console.error("Failed to preload districts", distErr);
//           }
//         }
        
//         // Set the date from the existing event data
//         if (eventData.date) {
//           setStartDate(new Date(eventData.date))
//         }
        
//         // Set the image preview from the existing event_image
//         if (eventData.event_image) {
//           setImagePreview(eventData.event_image)
//         }
//       } else {
//         console.error('Event not found.')
//       }
//     } catch (err) {
//       console.error('Failed to fetch event data', err)
//     } finally {
//       setLoadingData(false)
//     }
//   }

//   // Fetch States
//   useEffect(() => {
//     const fetchStates = async () => {
//       try {
//         const res = await get_data("State", ["state", "name"], "{}")
//         if (!res.error) {
//           setStates(res)
//           console.log(states)
//         } else {
//           console.error("Error fetching states:", res.error)
//         }
//       } catch (err) {
//         console.error("Failed to fetch states", err)
//       }
//     }

//     fetchStates()
//     fetchEventData()  // Only call this once, as it will handle the dependent data loading
//     fetchLabTypes()
    
//     // Get the API base URL from environment variables
//     setApiBaseUrl(process.env.NEXT_PUBLIC_API_BASE_URL || '')
//   }, [id])

//   // Fetch Districts based on selected State
//   useEffect(() => {
//     const fetchDistricts = async () => {
//       if (!selectedState) {
//         setDistricts([])
//         return
//       }
      
//       try {
//         const res = await get_data(
//           "District", 
//           ["district_name", "name"], 
//           [["state_id", "=", selectedState]]
//         )

//         if (!res.error) {
//           setDistricts(res)
//         } else {
//           console.error("Error fetching districts:", res.error)
//         }
//       } catch (err) {
//         console.error("Failed to fetch districts", err)
//       }
//     }

//     if (selectedState) {
//       fetchDistricts()
//     }
//   }, [selectedState])

//   // Fetch BRCs based on selected District
//   useEffect(() => {
//     const fetchBRCs = async () => {
//       if (!selectedDistrict) {
//         setBrcs([])
//         return
//       }
      
//       try {
//         const res = await get_data(
//           "BRC", 
//           ["brc_name", "name"], 
//           [["district_id", "=", selectedDistrict]]
//         )

//         if (!res.error) {
//           setBrcs(res)
//         } else {
//           console.error("Error fetching BRCs:", res.error)
//         }
//       } catch (err) {
//         console.error("Failed to fetch BRCs", err)
//       }
//     }

//     if (selectedDistrict) {
//       fetchBRCs()
//     }
//   }, [selectedDistrict])

//   // Fetch Lab Types
//   const fetchLabTypes = async () => {
//     try {
//       const res = await get_data("Lab Type", ["title", "name"], "{}")
//       if (!res.error) {
//         setLabs(res)
//       } else {
//         console.error("Error fetching lab types:", res.error)
//       }
//     } catch (err) {
//       console.error("Failed to fetch lab types", err)
//     }
//   }

//   const handleChange = e => {
//     const { name, value } = e.target
    
//     // Handle cascading dropdowns
//     if (name === 'state_id') {
//       // Only reset if the state actually changed
//       if (value !== selectedState) {
//         setSelectedState(value)
//         setSelectedDistrict('')
//         setSelectedBrc('')
        
//         // Reset child values in form
//         setForm(prev => ({ 
//           ...prev, 
//           [name]: value,
//           district_id: '', 
//           brc_id: '' 
//         }))
//       } else {
//         // Just update the form without resetting children
//         setForm(prev => ({ ...prev, [name]: value }))
//       }
//     } else if (name === 'district_id') {
//       // Only reset if the district actually changed
//       if (value !== selectedDistrict) {
//         setSelectedDistrict(value)
//         setSelectedBrc('')
        
//         // Reset child values in form
//         setForm(prev => ({ 
//           ...prev, 
//           [name]: value,
//           brc_id: '' 
//         }))
//       } else {
//         // Just update the form without resetting children
//         setForm(prev => ({ ...prev, [name]: value }))
//       }
//     } else if (name === 'brc_id') {
//       setSelectedBrc(value)
//       setForm(prev => ({ ...prev, [name]: value }))
//     } else {
//       // For all other fields, simply update the form state
//       setForm(prev => ({ ...prev, [name]: value }))
//     }
    
//     // Clear any errors for this field
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: null }))
//     }
//   }

//   const handleImageChange = e => {
//     const file = e.target.files[0]
//     if (file) {
//       // Create a preview URL for the selected file
//       const previewUrl = URL.createObjectURL(file)
//       setImagePreview(previewUrl)
//       setEventImages(file)
//       setImageError(false)
      
//       // Clear any existing error for the event_image field
//       if (errors.event_image) {
//         setErrors(prev => ({ ...prev, event_image: null }))
//       }
//     }
//   }

//   const validateForm = () => {
//     const requiredFields = [
//       'title',
//       'short_description',
//       'description',
//       'venue',
//       'place',
//       'level',
//       'date',
//       'state_id',
//       'district_id',
//       'brc_id',
//       'lab_type'
//     ]

//     const newErrors = {}
//     requiredFields.forEach(field => {
//       if (!form[field]) {
//         newErrors[field] = 'This field is required'
//       }
//     })

//     // Special validation for image - either existing or new must be present
//     if (!form.event_image && !eventImages) {
//       newErrors.event_image = 'Event image is required'
//     }

//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleSubmit = async e => {
//     e.preventDefault()
//     if (!validateForm()) return

//     try {
//       let imageUrl = form.event_image

//       if (eventImages) {
//         // Upload the new image and get its URL
//         imageUrl = await uploadFile(eventImages, 0)
//         if (!imageUrl) {
//           throw new Error('Failed to upload image')
//         }
//       }

//       const updatedForm = {
//         ...form,
//         event_image: imageUrl, // Store the relative path returned by the API
//         date: startDate.toISOString().split('T')[0]
//       }

//       await update('Events', updatedForm.name, updatedForm)
//       alert('Event updated successfully.')
//       router.push('/events/view')
//     } catch (err) {
//       console.error('Update failed:', err)
//       alert(`Update failed: ${err.message || 'Unknown error'}`)
//     }
//   }

//   // Get complete image URL by combining the base URL with the relative path
//   const getCompleteImageUrl = (imagePath) => {
//     if (!imagePath) return '';
    
//     // If the image path already includes http or https, return it as is
//     if (imagePath.startsWith('http')) {
//       return imagePath;
//     }
    
//     // Make sure the image path starts with a slash
//     const formattedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    
//     // Combine the base URL with the image path
//     return `${apiBaseUrl}${formattedPath}`;
//   }

//   // Handle image load error
//   const handleImageError = () => {
//     console.error('Failed to load image:', form.event_image);
//     setImageError(true);
//   }

//   if (loadingData) {
//     return <Loading />
//   }

//   return (
//     <div className="container my-4">
//       <h3>Edit Event</h3>
//       <form onSubmit={handleSubmit}>

//         {/* Title */}
//         <div className="mb-3">
//           <label className="form-label">
//             Title <span className="text-danger">*</span>
//           </label>
//           <input
//             type="text"
//             className={`form-control ${errors.title ? 'is-invalid' : ''}`}
//             name="title"
//             value={form.title}
//             onChange={handleChange}
//           />
//           {errors.title && <div className="invalid-feedback">{errors.title}</div>}
//         </div>

//         {/* Short Description */}
//         <div className="mb-3">
//           <label className="form-label">
//             Short Description <span className="text-danger">*</span>
//           </label>
//           <textarea
//             className={`form-control ${errors.short_description ? 'is-invalid' : ''}`}
//             name="short_description"
//             value={form.short_description}
//             onChange={handleChange}
//           />
//           {errors.short_description && (
//             <div className="invalid-feedback">{errors.short_description}</div>
//           )}
//         </div>

//         {/* Description */}
//         <div className="mb-3">
//           <label className="form-label">
//             Description <span className="text-danger">*</span>
//           </label>
//           <textarea
//             className={`form-control ${errors.description ? 'is-invalid' : ''}`}
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//           />
//           {errors.description && <div className="invalid-feedback">{errors.description}</div>}
//         </div>

//         {/* Date */}
//         <div className="mb-3">
//           <label className="form-label">
//             Date <span className="text-danger">*</span>
//           </label>
//           <input
//             type="date"
//             className={`form-control ${errors.date ? 'is-invalid' : ''}`}
//             value={startDate ? startDate.toISOString().split('T')[0] : ''}
//             onChange={e => setStartDate(new Date(e.target.value))}
//           />
//           {errors.date && <div className="invalid-feedback">{errors.date}</div>}
//         </div>

//         {/* Venue */}
//         <div className="mb-3">
//           <label className="form-label">
//             Venue <span className="text-danger">*</span>
//           </label>
//           <input
//             type="text"
//             className={`form-control ${errors.venue ? 'is-invalid' : ''}`}
//             name="venue"
//             value={form.venue}
//             onChange={handleChange}
//           />
//           {errors.venue && <div className="invalid-feedback">{errors.venue}</div>}
//         </div>

//         {/* Place */}
//         <div className="mb-3">
//           <label className="form-label">
//             Place <span className="text-danger">*</span>
//           </label>
//           <input
//             type="text"
//             className={`form-control ${errors.place ? 'is-invalid' : ''}`}
//             name="place"
//             value={form.place}
//             onChange={handleChange}
//           />
//           {errors.place && <div className="invalid-feedback">{errors.place}</div>}
//         </div>

//         {/* Level */}
//         <div className="mb-3">
//           <label className="form-label">
//             Level <span className="text-danger">*</span>
//           </label>
//           <select
//             className={`form-select ${errors.level ? 'is-invalid' : ''}`}
//             name="level"
//             value={form.level}
//             onChange={handleChange}
//           >
//             <option value="">Select Level</option>
//             <option value="School">School</option>
//             <option value="District">District</option>
//             <option value="State">State</option>
//           </select>
//           {errors.level && <div className="invalid-feedback">{errors.level}</div>}
//         </div>

//         {/* Event Image Upload with Error Handling */}
//         <div className="mb-3">
//           <label className="form-label">Event Image <span className="text-danger">*</span></label>
          
//           {form.event_image && !imageError ? (
//             <div className="position-relative mb-2">
//               <img
//                 src={getCompleteImageUrl(form.event_image)}
//                 alt="Event Preview"
//                 className="img-thumbnail"
//                 style={{ maxHeight: '150px' }}
//                 onError={handleImageError}
//               />
//               <div className="small text-muted mt-1">
//                 Current image: {form.event_image.split('/').pop()}
//               </div>
//             </div>
//           ) : eventImages ? (
//             <div className="position-relative mb-2">
//               <img
//                 src={imagePreview}
//                 alt="New Image Preview"
//                 className="img-thumbnail"
//                 style={{ maxHeight: '150px' }}
//               />
//               <div className="small text-muted mt-1">
//                 New image selected: {eventImages.name}
//               </div>
//             </div>
//           ) : (
//             <div className="alert alert-warning">
//               {imageError ? 
//                 "Current image couldn't be displayed. Please upload a new image." : 
//                 "No image available. Please upload an event image."}
//             </div>
//           )}

//           <input 
//             type="file" 
//             className={`form-control ${errors.event_image ? 'is-invalid' : ''}`} 
//             accept="image/*" 
//             onChange={handleImageChange} 
//           />
//           {errors.event_image && <div className="invalid-feedback">{errors.event_image}</div>}
//         </div>

//         {/* Dropdowns: State, District, BRC, Lab Type */}
//         <div className="row">
//           <div className="col-md-6 mb-3">
//             <label className="form-label">
//               State <span className="text-danger">*</span>
//             </label>
//             <select
//               className={`form-select ${errors.state_id ? 'is-invalid' : ''}`}
//               name="state_id"
//               value={form.state_name}
//               onChange={handleChange}
//             >
//               <option value="">Select State</option>
//               {states.map((state) => (
//                 <option key={state.name} value={state.name}>
//                   {state.state}
//                 </option>
//               ))}
//             </select>
//             {errors.state_id && <div className="invalid-feedback">{errors.state_id}</div>}
//           </div>

//           <div className="col-md-6 mb-3">
//             <label className="form-label">
//               District <span className="text-danger">*</span>
//             </label>
//             <select
//               className={`form-select ${errors.district_id ? 'is-invalid' : ''}`}
//               name="district_id"
//               value={form.district}
//               onChange={handleChange}
//               disabled={!selectedState}
//             >
//               <option value="">Select District</option>
//               {districts.map((district) => (
//                 <option key={district.name} value={district.name}>
//                   {district.district_name}
//                 </option>
//               ))}
//             </select>
//             {errors.district_id && <div className="invalid-feedback">{errors.district_id}</div>}
//             {selectedState && districts.length === 0 && (
//               <div className="text-muted small mt-1">Loading districts...</div>
//             )}
//           </div>

//           <div className="col-md-6 mb-3">
//             <label className="form-label">
//               BRC <span className="text-danger">*</span>
//             </label>
//             <select
//               className={`form-select ${errors.brc_id ? 'is-invalid' : ''}`}
//               name="brc_id"
//               value={form.brc_name}
//               onChange={handleChange}
//               disabled={!selectedDistrict}
//             >
//               <option value="">Select BRC</option>
//               {brcs.map((brc) => (
//                 <option key={brc.name} value={brc.name}>
//                   {brc.brc_name}
//                 </option>
//               ))}
//             </select>
//             {errors.brc_id && <div className="invalid-feedback">{errors.brc_id}</div>}
//             {selectedDistrict && brcs.length === 0 && (
//               <div className="text-muted small mt-1">Loading BRCs...</div>
//             )}
//           </div>

//           <div className="col-md-6 mb-3">
//             <label className="form-label">
//               Lab Type <span className="text-danger">*</span>
//             </label>
//             <select
//               className={`form-select ${errors.lab_type ? 'is-invalid' : ''}`}
//               name="lab_type"
//               value={form.lab_type}
//               onChange={handleChange}
//             >
//               <option value="">Select Lab Type</option>
//               {labs.map((lab) => (
//                 <option key={lab.name} value={lab.name}>
//                   {lab.title}
//                 </option>
//               ))}
//             </select>
//             {errors.lab_type && <div className="invalid-feedback">{errors.lab_type}</div>}
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="text-center mt-4">
//           <button type="submit" className="btn btn-primary">
//             Update Event
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default EventEdit