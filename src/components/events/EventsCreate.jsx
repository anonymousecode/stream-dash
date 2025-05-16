// 

'use client'
import React, { useState, useEffect } from 'react'
import useDatePicker from '@/hooks/useDatePicker'
import useLocationData from '@/hooks/useLocationData'
import Loading from '@/components/shared/Loading'
import { insertDoc, uploadFile, get_data } from '@/api/methods'

const EventCreate = () => {
  const [districts, setDistricts] = useState([])
  const [states, setStates] = useState([])
  const [brcs, setBrcs] = useState([])
  const [labs, setLabs] = useState([])

  const [selectedLabType, setSelectedLabType] = useState(null)
  const [stateValue, setStateValue] = useState('')
  const { startDate, setStartDate } = useDatePicker()
  const { loading } = useLocationData()

  const [eventImages, setEventImages] = useState(null)
  const [partnerLogos, setPartnerLogos] = useState([])
  const [galleryImages, setGalleryImages] = useState([])

  const [selectedState, setSelectedState] = useState(null)
  const [selectedDistrict, setSelectedDistrict] = useState(null)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [errors, setErrors] = useState({})

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
  });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear the error for this field when the user makes a change
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      'title', 'short_description', 'description', 'venue', 
      'place', 'level', 'date', 'state', 'district', 'brc', 'lab_type'
    ];
    
    requiredFields.forEach(field => {
      if (!form[field]) {
        newErrors[field] = 'This field is required';
      }
    });
    
    if (!eventImages) {
      newErrors.event_image = 'Event image is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      const imageUrl = eventImages ? await uploadFile(eventImages, 0) : '';
      
      const updatedForm = {
        ...form,
        event_image: imageUrl,
      };
      
      const result = await insertDoc("Events", updatedForm);
      
      if (result) {
        setShowSuccessPopup(true);
        // Reset form after successful submission
        setForm({
          title: '', short_description: '', description: '', event_image: '',
          venue: '', place: '', level: '', host: '', time: '', date: '', 
          partner_name: '', credit: '', brc: '', district: '', lab_type: '', state: ''
        });
        setEventImages(null);
        setPartnerLogos([]);
        setGalleryImages([]);
        
        // Hide success popup after 5 seconds
        setTimeout(() => {
          setShowSuccessPopup(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    const fetchStates = async () => {
      const res = await get_data("State", ["state", "name"], "{}");
      
      if (!res.error) {
        setStates(res);
      } else {
        console.error("Error fetching states:", res.error);
      }
    };

    fetchStates();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (!selectedState) return;
      
      const res = await get_data("District", ["district_name", "name"], [["state_id", "=", selectedState]]);

      if (!res.error) {
        setDistricts(res);
      } else {
        console.error("Error fetching districts:", res.error);
      }
    };

    fetchDistricts();
  }, [selectedState]);

  useEffect(() => {
    const fetchBRCs = async () => {
      if (!selectedDistrict) return;
      
      const res = await get_data("BRC", ["brc_name", "name"], [["district_id", "=", selectedDistrict]]);

      if (!res.error) {
        setBrcs(res);
      } else {
        console.error("Error fetching BRCs:", res.error);
      }
    };

    fetchBRCs();
  }, [selectedDistrict]);

  useEffect(() => {
    const fetchLabs = async () => {
      const res = await get_data("Lab", ["title", "name"], "{}");

      if (!res.error) {
        setLabs(res);
      } else {
        console.error("Error fetching labs:", res.error);
      }
    };

    fetchLabs();
  }, []);

  return (
    <>
      {loading && <Loading />}
      
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="position-fixed top-50 start-50 translate-middle bg-white p-4 rounded shadow-lg" style={{ zIndex: 1050, width: '400px' }}>
          <div className="text-center">
            <div className="text-success mb-3">
              <i className="fas fa-check-circle fa-3x"></i>
            </div>
            <h4 className="mb-2">Success!</h4>
            <p className="mb-0">Event has been submitted successfully!</p>
          </div>
        </div>
      )}

      <div className="col-xl-12">
        <div className="card stretch stretch-full">
          <div className="card-body">

            {/* Title */}
            <div className="mb-4">
              <label className="form-label">Title <span className="text-danger">*</span></label>
              <input 
                type="text" 
                className={`form-control ${errors.title ? 'is-invalid' : ''}`} 
                placeholder="Event Title" 
                name="title" 
                value={form.title}
                onChange={handleChange} 
              />
              {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>

            {/* Short Description */}
            <div className="mb-4">
              <label className="form-label">Short Description <span className="text-danger">*</span></label>
              <input 
                type="text" 
                className={`form-control ${errors.short_description ? 'is-invalid' : ''}`} 
                placeholder="Short description" 
                name="short_description" 
                value={form.short_description}
                onChange={handleChange} 
              />
              {errors.short_description && <div className="invalid-feedback">{errors.short_description}</div>}
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="form-label">Description <span className="text-danger">*</span></label>
              <textarea 
                className={`form-control ${errors.description ? 'is-invalid' : ''}`} 
                rows={4} 
                placeholder="Full description" 
                name="description" 
                value={form.description}
                onChange={handleChange}
              ></textarea>
              {errors.description && <div className="invalid-feedback">{errors.description}</div>}
            </div>

            {/* Event Images */}
            <div className="mb-4">
              <label className="form-label">Event Image <span className="text-danger">*</span></label>
              <input
                type="file"
                className={`form-control ${errors.event_image ? 'is-invalid' : ''}`}
                accept="image/*"
                name='event_image'
                onChange={(e) => {
                  setEventImages(e.target.files[0]);
                  if (errors.event_image) {
                    setErrors(prev => ({ ...prev, event_image: null }));
                  }
                }}
              />
              {errors.event_image && <div className="invalid-feedback">{errors.event_image}</div>}
              <div className="mt-3 d-flex gap-2 flex-wrap">
                {eventImages &&
                  <img
                    src={URL.createObjectURL(eventImages)}
                    alt="event"
                    className="rounded"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                }
              </div>
            </div>

            {/* Venue */}
            <div className="mb-4">
              <label className="form-label">Venue <span className="text-danger">*</span></label>
              <input 
                type="text" 
                className={`form-control ${errors.venue ? 'is-invalid' : ''}`} 
                placeholder="Venue name" 
                name="venue" 
                value={form.venue}
                onChange={handleChange} 
              />
              {errors.venue && <div className="invalid-feedback">{errors.venue}</div>}
            </div>

            {/* Place */}
            <div className="mb-4">
              <label className="form-label">Place <span className="text-danger">*</span></label>
              <input 
                type="text" 
                className={`form-control ${errors.place ? 'is-invalid' : ''}`} 
                placeholder="City/Town/Village" 
                name="place" 
                value={form.place}
                onChange={handleChange} 
              />
              {errors.place && <div className="invalid-feedback">{errors.place}</div>}
            </div>

            {/* Level */}
<div className="mb-4">
  <label className="form-label">Level <span className="text-danger">*</span></label><br />
  <select
    className={`form-control ${errors.level ? 'is-invalid' : ''}`}
    name="level"
    value={form.level}
    onChange={(e) => {
      setForm(prev => ({ ...prev, level: e.target.value }));
      if (errors.level) {
        setErrors(prev => ({ ...prev, level: null }));
      }
    }}
  >
    <option value="">Select</option>
    <option value="BRC">BRC</option>
    <option value="District">District</option>
    <option value="State">State</option>
  </select>
  {errors.level && <div className="invalid-feedback">{errors.level}</div>}
</div>

            {/* Host */}
            <div className="mb-4">
              <label className="form-label">Host</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Organizer / Host" 
                name="host" 
                value={form.host}
                onChange={handleChange} 
              />
            </div>

            {/* Time and Date */}
            <div className="row">
              <div className="col-lg-6 mb-4">
                <label className="form-label">Time</label>
                <input 
                  type="time" 
                  className="form-control" 
                  name="time" 
                  value={form.time ? form.time.substring(0, 5) : ''}
                  onChange={(e) => {
                    const fullTime = e.target.value + ":00"; // always adds seconds
                    setForm(prev => ({ ...prev, time: fullTime }));
                  }} 
                />
              </div>
              <div className="col-lg-6 mb-4">
                <label className="form-label">Date <span className="text-danger">*</span></label>
                <input 
                  type="date" 
                  className={`form-control ${errors.date ? 'is-invalid' : ''}`} 
                  name="date" 
                  value={form.date}
                  onChange={handleChange} 
                />
                {errors.date && <div className="invalid-feedback">{errors.date}</div>}
              </div>
            </div>

            {/* Partner Name */}
            <div className="mb-4">
              <label className="form-label">Partner Name</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Partner Organization" 
                name="partner_name" 
                value={form.partner_name}
                onChange={handleChange} 
              />
            </div>

            {/* Partner Logos */}
            <div className="mb-4">
              <label className="form-label">Partner Logo</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                multiple
                onChange={(e) => setPartnerLogos(Array.from(e.target.files))}
              />
              <div className="mt-3 d-flex gap-2 flex-wrap">
                {partnerLogos.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`partner-${index}`}
                    className="rounded"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                ))}
              </div>
            </div>

            {/* Credit */}
            <div className="mb-4">
              <label className="form-label">Credit</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Credit details (if any)" 
                name="credit" 
                value={form.credit}
                onChange={handleChange} 
              />
            </div>

            {/* State */}
            <div className="mb-4">
              <label className="form-label">State <span className="text-danger">*</span></label><br />
              <select 
                className={`form-control ${errors.state ? 'is-invalid' : ''}`} 
                name="state" 
                value={form.state}
                onChange={(e) => {
                  setForm(prev => ({ ...prev, state: e.target.value }));
                  setSelectedState(e.target.value);
                  if (errors.state) {
                    setErrors(prev => ({ ...prev, state: null }));
                  }
                }}
              >
                <option value="">Select</option>
                {states.map((state, id) => (
                  <option key={id} value={state.name}>
                    {state.state}
                  </option>
                ))}
              </select>
              {errors.state && <div className="invalid-feedback">{errors.state}</div>}
            </div>

            {/* District */}
            <div className="mb-4">
              <label className="form-label">District <span className="text-danger">*</span></label><br />
              <select 
                className={`form-control ${errors.district ? 'is-invalid' : ''}`} 
                name="district" 
                value={form.district}
                onChange={(e) => {
                  setForm(prev => ({ ...prev, district: e.target.value }));
                  setSelectedDistrict(e.target.value);
                  if (errors.district) {
                    setErrors(prev => ({ ...prev, district: null }));
                  }
                }}
              >
                <option value="">Select</option>
                {districts.map((dist) => (
                  <option key={dist.name} value={dist.name}>
                    {dist.district_name}
                  </option>
                ))}
              </select>
              {errors.district && <div className="invalid-feedback">{errors.district}</div>}
            </div>

            {/* BRC */}
            <div className="mb-4">
              <label className="form-label">BRC <span className="text-danger">*</span></label><br />
              <select 
                className={`form-control ${errors.brc ? 'is-invalid' : ''}`} 
                name="brc" 
                value={form.brc}
                onChange={handleChange}
              >
                <option value="">Select</option>
                {brcs.map((brc) => (
                  <option key={brc.name} value={brc.name}>
                    {brc.brc_name}
                  </option>
                ))}
              </select>
              {errors.brc && <div className="invalid-feedback">{errors.brc}</div>}
            </div>

            {/* LAB TYPE */}
            <div className="mb-4">
              <label className="form-label">Lab Type <span className="text-danger">*</span></label><br />
              <select 
                className={`form-control ${errors.lab_type ? 'is-invalid' : ''}`} 
                name="lab_type" 
                value={form.lab_type}
                onChange={handleChange}
              >
                <option value="">Select</option>
                {labs.map((lab) => (
                  <option key={lab.name} value={lab.name}>
                    {lab.title}
                  </option>
                ))}
              </select>
              {errors.lab_type && <div className="invalid-feedback">{errors.lab_type}</div>}
            </div>

            {/* Event Gallery */}
            <div className="mb-4">
              <label className="form-label">Event Gallery</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                multiple
                onChange={(e) => setGalleryImages(Array.from(e.target.files))}
              />
              <div className="mt-3 d-flex gap-2 flex-wrap">
                {galleryImages.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`gallery-${index}`}
                    className="rounded"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                ))}
              </div>

              <div className="mb-4">
                <button
                  type="button"
                  className="btn btn-primary mt-3"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default EventCreate