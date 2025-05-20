// 'use client'

// import React, { useEffect, useState, useCallback } from 'react'
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
//   const fetchEventData = useCallback(async () => {
//     try {
//       const res = await get_data('Events', '*', [['name', '=', id]])
//       if (res?.length) {
//         console.log('Fetched event data:', res[0])
//         setForm(res[0])
//         setStartDate(new Date(res[0].date))
//         if (res[0].event_image) {
//           setImagePreview(res[0].event_image) // relative URL or full URL handled later
//         }
//       } else {
//         console.error('Event not found.')
//       }
//     } catch (err) {
//       console.error('Failed to fetch event data', err)
//     } finally {
//       setLoadingData(false)
//     }
//   }, [id, setStartDate])

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

//     setApiBaseUrl(process.env.NEXT_PUBLIC_API_BASE_URL || '')
//   }, [fetchEventData])

//   // Handle trix editor changes
//   useEffect(() => {
//     const handleTrixChange = (event) => {
//       const editor = event.target
//       // Get the name attribute from associated input field (hidden input)
//       const inputId = editor.getAttribute('input')
//       const inputElement = document.getElementById(inputId)
//       if (!inputElement) return
//       const name = inputElement.getAttribute('name')
//       const value = editor.innerHTML || ''
//       setForm(prevForm => ({
//         ...prevForm,
//         [name]: value
//       }))
//       if (errors[name]) {
//         setErrors(prev => ({ ...prev, [name]: null }))
//       }
//     }
//     document.addEventListener('trix-change', handleTrixChange)

//     return () => {
//       document.removeEventListener('trix-change', handleTrixChange)
//     }
//   }, [errors])

//   // Handle input changes (non-trix)
//   const handleChange = e => {
//     const { name, value } = e.target
//     setForm(prev => ({ ...prev, [name]: value }))
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: null }))
//     }
//   }

//   // Handle image file selection
//   const handleImageChange = e => {
//     const file = e.target.files[0]
//     if (file) {
//       if (imagePreview && eventImages) {
//         URL.revokeObjectURL(imagePreview)
//       }
//       const previewUrl = URL.createObjectURL(file)
//       setImagePreview(previewUrl)
//       setEventImages(file)
//       setImageError(false)
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
//       'state',
//       'district',
//       'brc',
//       'lab_type'
//     ]

//     const newErrors = {}
//     requiredFields.forEach(field => {
//       if (!form[field] || (typeof form[field] === 'string' && form[field].trim() === '')) {
//         newErrors[field] = 'This field is required'
//       }
//     })

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
//         imageUrl = await uploadFile(eventImages, 0)
//         if (!imageUrl) throw new Error('Failed to upload image')
//       }

//       const updatedForm = {
//         ...form,
//         event_image: imageUrl,
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

//   const getCompleteImageUrl = (imagePath) => {
//     if (!imagePath) return ''

//     if (imagePath.startsWith('http')) {
//       return imagePath
//     }

//     const formattedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`
//     return `${apiBaseUrl}${formattedPath}`
//   }

//   const handleImageError = () => {
//     console.error('Failed to load image:', form.event_image)
//     setImageError(true)
//   }

//   if (loadingData || loading) return <Loading />

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
//           <input
//             type="hidden"
//             id="short_description"
//             name="short_description"
//             value={form.short_description}
//           />
//           <trix-editor
//             input="short_description"
//             className={errors.short_description ? 'trix-content is-invalid' : 'trix-content'}
//           />
//           {errors.short_description && (
//             <div className="invalid-feedback d-block">{errors.short_description}</div>
//           )}
//         </div>

//         {/* Description */}
//         <div className="mb-3">
//           <label className="form-label">
//             Description <span className="text-danger">*</span>
//           </label>
//           <input
//             type="hidden"
//             id="description"
//             name="description"
//             value={form.description}
//           />
//           <trix-editor
//             input="description"
//             className={errors.description ? 'trix-content is-invalid' : 'trix-content'}
//           />
//           {errors.description && (
//             <div className="invalid-feedback d-block">{errors.description}</div>
//           )}
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
//             <option value="BRC">BRC</option>
//             <option value="District">District</option>
//             <option value="State">State</option>
//           </select>
//           {errors.level && <div className="invalid-feedback">{errors.level}</div>}
//         </div>

//         {/* Event Image Upload with Error Handling */}
//         <div className="mb-3">
//           <label className="form-label">
//             Event Image <span className="text-danger">*</span>
//           </label>
//           <input
//             type="file"
//             accept="image/*"
//             className={`form-control ${errors.event_image ? 'is-invalid' : ''}`}
//             onChange={handleImageChange}
//           />
//           {errors.event_image && <div className="invalid-feedback">{errors.event_image}</div>}
//           {imagePreview && !imageError && (
//             <img
//               src={getCompleteImageUrl(imagePreview)}
//               alt="Event Preview"
//               style={{ maxWidth: '200px', marginTop: '10px' }}
//               onError={handleImageError}
//             />
//           )}
//           {imageError && <div className="text-danger mt-2">Failed to load event image.</div>}
//         </div>

//         {/* State */}
//         <div className="mb-3">
//           <label className="form-label">
//             State <span className="text-danger">*</span>
//           </label>
//           <select
//             className={`form-select ${errors.state ? 'is-invalid' : ''}`}
//             name="state"
//             value={form.state}
//             onChange={handleChange}
//           >
//             <option value="">Select State</option>
//             {states.map(s => (
//               <option key={s} value={s}>{s}</option>
//             ))}
//           </select>
//           {errors.state && <div className="invalid-feedback">{errors.state}</div>}
//         </div>

//         {/* District */}
//         <div className="mb-3">
//           <label className="form-label">
//             District <span className="text-danger">*</span>
//           </label>
//           <select
//             className={`form-select ${errors.district ? 'is-invalid' : ''}`}
//             name="district"
//             value={form.district}
//             onChange={handleChange}
//           >
//             <option value="">Select District</option>
//             {districts.map(d => (
//               <option key={d} value={d}>{d}</option>
//             ))}
//           </select>
//           {errors.district && <div className="invalid-feedback">{errors.district}</div>}
//         </div>

//         {/* BRC */}
//         <div className="mb-3">
//           <label className="form-label">
//             BRC <span className="text-danger">*</span>
//           </label>
//           <select
//             className={`form-select ${errors.brc ? 'is-invalid' : ''}`}
//             name="brc"
//             value={form.brc}
//             onChange={handleChange}
//           >
//             <option value="">Select BRC</option>
//             {brcs.map(b => (
//               <option key={b} value={b}>{b}</option>
//             ))}
//           </select>
//           {errors.brc && <div className="invalid-feedback">{errors.brc}</div>}
//         </div>

//         {/* Lab Type */}
//         <div className="mb-3">
//           <label className="form-label">
//             Lab Type <span className="text-danger">*</span>
//           </label>
//           <select
//             className={`form-select ${errors.lab_type ? 'is-invalid' : ''}`}
//             name="lab_type"
//             value={form.lab_type}
//             onChange={handleChange}
//           >
//             <option value="">Select Lab Type</option>
//             {labs.map(l => (
//               <option key={l} value={l}>{l}</option>
//             ))}
//           </select>
//           {errors.lab_type && <div className="invalid-feedback">{errors.lab_type}</div>}
//         </div>

//         {/* Host */}
//         <div className="mb-3">
//           <label className="form-label">
//             Host
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             name="host"
//             value={form.host}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Time */}
//         <div className="mb-3">
//           <label className="form-label">
//             Time
//           </label>
//           <input
//             type="time"
//             className="form-control"
//             name="time"
//             value={form.time}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Partner Name */}
//         <div className="mb-3">
//           <label className="form-label">
//             Partner Name
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             name="partner_name"
//             value={form.partner_name}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Credit */}
//         <div className="mb-3">
//           <label className="form-label">
//             Credit
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             name="credit"
//             value={form.credit}
//             onChange={handleChange}
//           />
//         </div>

//         <button type="submit" className="btn btn-primary">Update Event</button>
//       </form>
//     </div>
//   )
// }

// export default EventEdit

'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { get_data, uploadFile, update } from '@/api/methods'
import useDatePicker from '@/hooks/useDatePicker'
import useLocationData from '@/hooks/useLocationData'
import Loading from '@/components/shared/Loading'
import dynamic from 'next/dynamic'
// Import CSS only on the client side
import "trix/dist/trix.css"

// Dynamically import Trix editor without SSR
const TrixEditor = dynamic(
  async () => {
    if (typeof window !== 'undefined') {
      await import('trix')
      return ({ input, value, onChange, className }) => (
        <>
          <input
            type="hidden"
            id={input}
            name={input}
            value={value || ''}
          />
          <trix-editor
            input={input}
            className={className || 'trix-content'}
          />
        </>
      )
    }
    return () => null
  },
  { ssr: false }
)

// Field definition for form rendering optimization
const FORM_FIELDS = {
  required: [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'venue', label: 'Venue', type: 'text' },
    { name: 'place', label: 'Place', type: 'text' },
    { name: 'level', label: 'Level', type: 'select', options: ['BRC', 'District', 'State'] },
    { name: 'state', label: 'State', type: 'select', optionsKey: 'states' },
    { name: 'district', label: 'District', type: 'select', optionsKey: 'districts' },
    { name: 'brc', label: 'BRC', type: 'select', optionsKey: 'brcs' },
    { name: 'lab_type', label: 'Lab Type', type: 'select', optionsKey: 'labs' },
  ],
  optional: [
    { name: 'host', label: 'Host', type: 'text' },
    { name: 'time', label: 'Time', type: 'time' },
    { name: 'partner_name', label: 'Partner Name', type: 'text' },
    { name: 'credit', label: 'Credit', type: 'text' },
  ]
}

// Initial form state - defined outside component to avoid recreating on each render
const INITIAL_FORM = {
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
}

const EventEdit = () => {
  const { id } = useParams()
  const router = useRouter()
  const [form, setForm] = useState(INITIAL_FORM)
  const [dropdownData, setDropdownData] = useState({
    states: [],
    districts: [],
    brcs: [],
    labs: []
  })
  const [eventImages, setEventImages] = useState(null)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(true)
  const [imagePreview, setImagePreview] = useState('')
  const [imageError, setImageError] = useState(false)
  const [apiBaseUrl, setApiBaseUrl] = useState('')

  const { loading: locationLoading } = useLocationData()
  const { startDate, setStartDate } = useDatePicker()

  // Single fetch for all dropdowns to reduce API calls
  const fetchAllDropdowns = useCallback(async () => {
    try {
      const [states, districts, brcs, labs] = await Promise.all([
        get_data('State', 'name'),
        get_data('District', 'name'),
        get_data('BRC', 'name'),
        get_data('Lab', 'name')
      ])
      
      setDropdownData({
        states: Array.isArray(states) ? states.map(item => item.name) : [],
        districts: Array.isArray(districts) ? districts.map(item => item.name) : [],
        brcs: Array.isArray(brcs) ? brcs.map(item => item.name) : [],
        labs: Array.isArray(labs) ? labs.map(item => item.name) : []
      })
    } catch (err) {
      console.error('Failed to fetch dropdown data', err)
    }
  }, [])

  // Fetch Event data by id
  const fetchEventData = useCallback(async () => {
    try {
      const res = await get_data('Events', '*', [['name', '=', id]])
      if (res?.length) {
        setForm(res[0])
        setStartDate(new Date(res[0].date))
        if (res[0].event_image) {
          setImagePreview(res[0].event_image)
        }
      }
    } catch (err) {
      console.error('Failed to fetch event data', err)
    } finally {
      setLoading(false)
    }
  }, [id, setStartDate])

  // Fetch data once on component mount
  useEffect(() => {
    const initData = async () => {
      await Promise.all([
        fetchEventData(),
        fetchAllDropdowns()
      ])
    }
    
    initData()
    setApiBaseUrl(process.env.NEXT_PUBLIC_API_BASE_URL || '')
  }, [fetchEventData, fetchAllDropdowns])

  // Attach Trix editor event listener only once
  useEffect(() => {
    const handleTrixChange = (event) => {
      const editor = event.target
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
    return () => document.removeEventListener('trix-change', handleTrixChange)
  }, [errors])

  // Optimized change handler to reduce rerenders
  const handleChange = useCallback(e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }, [errors])

  // Optimized image change handler
  const handleImageChange = useCallback(e => {
    const file = e.target.files[0]
    if (file) {
      if (imagePreview && typeof URL !== 'undefined') {
        URL.revokeObjectURL(imagePreview)
      }
      
      const previewUrl = typeof URL !== 'undefined' ? URL.createObjectURL(file) : ''
      setImagePreview(previewUrl)
      setEventImages(file)
      setImageError(false)
      
      if (errors.event_image) {
        setErrors(prev => ({ ...prev, event_image: null }))
      }
    }
  }, [imagePreview, errors])

  // Validate only required fields
  const validateForm = useCallback(() => {
    const requiredFields = [
      'title', 'short_description', 'description', 'venue', 'place', 
      'level', 'date', 'state', 'district', 'brc', 'lab_type'
    ]

    const newErrors = {}
    
    for (const field of requiredFields) {
      if (!form[field] || (typeof form[field] === 'string' && form[field].trim() === '')) {
        newErrors[field] = 'This field is required'
      }
    }

    if (!form.event_image && !eventImages) {
      newErrors.event_image = 'Event image is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [form, eventImages])

  // Handle form submission
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

  // Helper for image URL (memoized to avoid recalculating)
  const getCompleteImageUrl = useCallback((imagePath) => {
    if (!imagePath) return ''
    if (imagePath.startsWith('http')) return imagePath
    
    const formattedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`
    return `${apiBaseUrl}${formattedPath}`
  }, [apiBaseUrl])

  const handleImageError = useCallback(() => {
    console.error('Failed to load image:', form.event_image)
    setImageError(true)
  }, [form.event_image])

  // Render loading indicator if still fetching data
  if (loading || locationLoading) return <Loading />

  // Render form fields based on configuration
  const renderField = (field, required = true) => {
    const { name, label, type } = field
    
    // Custom rendering for each field type
    if (type === 'select') {
      const options = field.options || (field.optionsKey ? dropdownData[field.optionsKey] : [])
      
      return (
        <div className="mb-3" key={name}>
          <label className="form-label">
            {label} {required && <span className="text-danger">*</span>}
          </label>
          <select
            className={`form-select ${errors[name] ? 'is-invalid' : ''}`}
            name={name}
            value={form[name] || ''}
            onChange={handleChange}
          >
            <option value="">Select {label}</option>
            {options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
        </div>
      )
    }
    
    // Default text input
    return (
      <div className="mb-3" key={name}>
        <label className="form-label">
          {label} {required && <span className="text-danger">*</span>}
        </label>
        <input
          type={type}
          className={`form-control ${errors[name] ? 'is-invalid' : ''}`}
          name={name}
          value={form[name] || ''}
          onChange={handleChange}
        />
        {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
      </div>
    )
  }

  return (
    <div className="container my-4">
      <h3>Edit Event</h3>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        {renderField({ name: 'title', label: 'Title', type: 'text' })}

        {/* Short Description */}
        <div className="mb-3">
          <label className="form-label">
            Short Description <span className="text-danger">*</span>
          </label>
          <TrixEditor
            input="short_description"
            value={form.short_description}
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
          <TrixEditor
            input="description"
            value={form.description}
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

        {/* Render all required fields */}
        {FORM_FIELDS.required.map(field => renderField(field))}

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

        {/* Render all optional fields */}
        {FORM_FIELDS.optional.map(field => renderField(field, false))}

        <button type="submit" className="btn btn-primary">Update Event</button>
      </form>
    </div>
  )
}

export default EventEdit

