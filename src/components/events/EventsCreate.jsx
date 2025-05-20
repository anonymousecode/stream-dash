
'use client'
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import useDatePicker from '@/hooks/useDatePicker'
import useLocationData from '@/hooks/useLocationData'
import Loading from '@/components/shared/Loading'
import { insertDoc, uploadFile, get_data } from '@/api/methods'
import "trix"
import "trix/dist/trix.css"

// Form initial state - defined outside component to avoid recreating on each render
const initialForm = {
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
};

const EventCreate = () => {
  const router = useRouter();
  
  // Combined state objects to reduce number of state variables
  const [form, setForm] = useState(initialForm);
  const [locationData, setLocationData] = useState({
    districts: [],
    states: [],
    brcs: [],
    labs: []
  });
  const [mediaFiles, setMediaFiles] = useState({
    eventImage: null,
    partnerLogos: [],
    galleryImages: []
  });
  const [selectedLocations, setSelectedLocations] = useState({
    state: null,
    district: null,
    labType: null
  });
  const [uiState, setUiState] = useState({
    errors: {},
    showSuccessPopup: false,
    isSubmitting: false
  });

  const { startDate, setStartDate } = useDatePicker();
  const { loading } = useLocationData();

  // Memoized error setter to reduce function creation
  const clearError = useCallback((fieldName) => {
    setUiState(prev => ({
      ...prev,
      errors: {
        ...prev.errors,
        [fieldName]: null
      }
    }));
  }, []);

  // Form change handler with error clearing
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Only clear errors if they exist for this field
    if (uiState.errors[name]) {
      clearError(name);
    }
  }, [uiState.errors, clearError]);

  // Fetch states - only runs once
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await get_data("State", ["state", "name"], "{}");
        if (!res.error) {
          setLocationData(prev => ({ ...prev, states: res }));
        }
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    fetchStates();
  }, []);

  // Fetch districts - only runs when selectedState changes
  useEffect(() => {
    const fetchDistricts = async () => {
      if (!selectedLocations.state) return;
      
      try {
        const res = await get_data(
          "District", 
          ["district_name", "name"], 
          [["state_id", "=", selectedLocations.state]]
        );

        if (!res.error) {
          setLocationData(prev => ({ ...prev, districts: res }));
        }
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    };

    fetchDistricts();
  }, [selectedLocations.state]);

  // Fetch BRCs - only runs when selectedDistrict changes
  useEffect(() => {
    const fetchBRCs = async () => {
      if (!selectedLocations.district) return;
      
      try {
        const res = await get_data(
          "BRC", 
          ["brc_name", "name"], 
          [["district_id", "=", selectedLocations.district]]
        );

        if (!res.error) {
          setLocationData(prev => ({ ...prev, brcs: res }));
        }
      } catch (error) {
        console.error("Error fetching BRCs:", error);
      }
    };

    fetchBRCs();
  }, [selectedLocations.district]);

  // Fetch labs - only runs once
  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const res = await get_data("Lab", ["title", "name"], "{}");
        if (!res.error) {
          setLocationData(prev => ({ ...prev, labs: res }));
        }
      } catch (error) {
        console.error("Error fetching labs:", error);
      }
    };

    fetchLabs();
  }, []);

  // Set up Trix editor listeners
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const handleTrixChange = (e) => {
      const editorId = e.target.getAttribute('input');
      const fieldName = editorId; // In this case, ID matches field name
      
      setForm(prev => ({ 
        ...prev, 
        [fieldName]: e.target.innerHTML 
      }));
      
      if (uiState.errors[fieldName]) {
        clearError(fieldName);
      }
    };

    // Add event listener
    document.addEventListener("trix-change", handleTrixChange);
    
    // Cleanup
    return () => {
      document.removeEventListener("trix-change", handleTrixChange);
    };
  }, [clearError, uiState.errors]);

  // Reset Trix editors
  const resetTrixEditors = useCallback(() => {
    if (typeof window === "undefined") return;
    
    const shortDescEditor = document.querySelector("trix-editor[input='short_description']");
    const fullDescEditor = document.querySelector("trix-editor[input='description']");
    
    if (shortDescEditor) {
      shortDescEditor.editor.loadHTML("");
    }
    
    if (fullDescEditor) {
      fullDescEditor.editor.loadHTML("");
    }
  }, []);

  // Form validation
  const validateForm = useCallback(() => {
    const requiredFields = [
      'title', 'short_description', 'description', 'venue', 
      'place', 'level', 'date', 'state', 'district', 'brc', 'lab_type'
    ];
    
    const newErrors = {};
    
    requiredFields.forEach(field => {
      if (!form[field]) {
        newErrors[field] = 'This field is required';
      }
    });
    
    if (!mediaFiles.eventImage) {
      newErrors.event_image = 'Event image is required';
    }
    
    setUiState(prev => ({
      ...prev,
      errors: newErrors
    }));
    
    return Object.keys(newErrors).length === 0;
  }, [form, mediaFiles.eventImage]);

  // Reset form completely
  const resetForm = useCallback(() => {
    setForm(initialForm);
    setMediaFiles({
      eventImage: null,
      partnerLogos: [],
      galleryImages: []
    });
    resetTrixEditors();
  }, [resetTrixEditors]);

  // Navigate to events management
  const goToEventManagement = useCallback(() => {
    router.push('/events/manage');
  }, [router]);

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      // Set submitting state to prevent multiple submissions
      setUiState(prev => ({ ...prev, isSubmitting: true }));
      
      const imageUrl = mediaFiles.eventImage ? 
        await uploadFile(mediaFiles.eventImage, 0) : '';
      
      const updatedForm = {
        ...form,
        event_image: imageUrl,
      };
      
      const result = await insertDoc("Events", updatedForm);
      
      if (result) {
        // Show success popup
        setUiState(prev => ({ 
          ...prev, 
          showSuccessPopup: true,
          isSubmitting: false 
        }));
        
        // Reset form
        resetForm();
        
        // Hide success popup after delay
        setTimeout(() => {
          setUiState(prev => ({ ...prev, showSuccessPopup: false }));
        }, 3000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setUiState(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  // Image change handler - memoized to prevent recreation
  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaFiles(prev => ({
        ...prev,
        eventImage: file
      }));
      
      if (uiState.errors.event_image) {
        clearError('event_image');
      }
    }
  }, [uiState.errors, clearError]);

  // Memoize partner logos handler
  const handlePartnerLogosChange = useCallback((e) => {
    setMediaFiles(prev => ({
      ...prev,
      partnerLogos: Array.from(e.target.files)
    }));
  }, []);

  // Memoize gallery images handler
  const handleGalleryImagesChange = useCallback((e) => {
    setMediaFiles(prev => ({
      ...prev,
      galleryImages: Array.from(e.target.files)
    }));
  }, []);

  // Memoize dropdown handlers to prevent recreation
  const handleStateChange = useCallback((e) => {
    const value = e.target.value;
    setForm(prev => ({ ...prev, state: value }));
    setSelectedLocations(prev => ({ ...prev, state: value }));
    
    if (uiState.errors.state) {
      clearError('state');
    }
  }, [uiState.errors, clearError]);

  const handleDistrictChange = useCallback((e) => {
    const value = e.target.value;
    setForm(prev => ({ ...prev, district: value }));
    setSelectedLocations(prev => ({ ...prev, district: value }));
    
    if (uiState.errors.district) {
      clearError('district');
    }
  }, [uiState.errors, clearError]);

  // Memoized level options
  const levelOptions = useMemo(() => (
    <>
      <option value="">Select</option>
      <option value="BRC">BRC</option>
      <option value="District">District</option>
      <option value="State">State</option>
    </>
  ), []);

  return (
    <>
      {loading && <Loading />}
      
      {/* Success Popup */}
      {uiState.showSuccessPopup && (
        <div className="position-fixed top-50 start-50 translate-middle bg-white p-4 rounded shadow-lg" style={{ zIndex: 1050, width: '400px' }}>
          <div className="text-center">
            <div className="text-success mb-3">
              <i className="fas fa-check-circle fa-3x"></i>
            </div>
            <h4 className="mb-2">Success!</h4>
            <p className="mb-3">Event has been submitted successfully!</p>
            <div className="d-flex justify-content-center gap-2">
              <button 
                className="btn btn-outline-secondary" 
                onClick={resetForm}
              >
                Add Another Event
              </button>
              <button 
                className="btn btn-primary" 
                onClick={goToEventManagement}
              >
                Manage Events
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="col-xl-12">
        <div className="card stretch stretch-full">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">Create New Event</h5>
            <button 
              className="btn btn-outline-secondary btn-sm" 
              onClick={goToEventManagement}
            >
              Back to Events
            </button>
          </div>
          <div className="card-body">

            {/* Title */}
            <div className="mb-4">
              <label className="form-label">Title <span className="text-danger">*</span></label>
              <input 
                type="text" 
                className={`form-control ${uiState.errors.title ? 'is-invalid' : ''}`} 
                placeholder="Event Title" 
                name="title" 
                value={form.title}
                onChange={handleChange} 
              />
              {uiState.errors.title && <div className="invalid-feedback">{uiState.errors.title}</div>}
            </div>

            {/* Short Description with Trix */}
            <div className="mb-4">
              <label className="form-label">Short Description <span className="text-danger">*</span></label>
              <input type="hidden" id="short_description" name="short_description" />
              <trix-editor input="short_description"></trix-editor>
              {uiState.errors.short_description && <div className="invalid-feedback d-block">{uiState.errors.short_description}</div>}
            </div>

            {/* Full Description with Trix */}
            <div className="mb-4">
              <label className="form-label">Full Description <span className="text-danger">*</span></label>
              <input type="hidden" id="description" name="description" />
              <trix-editor input="description"></trix-editor>
              {uiState.errors.description && <div className="invalid-feedback d-block">{uiState.errors.description}</div>}
            </div>

            {/* Event Images */}
            <div className="mb-4">
              <label className="form-label">Event Image <span className="text-danger">*</span></label>
              <input
                type="file"
                className={`form-control ${uiState.errors.event_image ? 'is-invalid' : ''}`}
                accept="image/*"
                name='event_image'
                onChange={handleImageChange}
              />
              {uiState.errors.event_image && <div className="invalid-feedback">{uiState.errors.event_image}</div>}
              <div className="mt-3 d-flex gap-2 flex-wrap">
                {mediaFiles.eventImage &&
                  <div className="position-relative">
                    <img
                      src={URL.createObjectURL(mediaFiles.eventImage)}
                      alt="event"
                      className="rounded"
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                    <button 
                      type="button"
                      className="btn btn-sm btn-danger position-absolute top-0 end-0"
                      style={{ margin: '-8px', borderRadius: '50%', width: '24px', height: '24px', padding: '0' }}
                      onClick={() => setMediaFiles(prev => ({ ...prev, eventImage: null }))}
                    >
                      ×
                    </button>
                  </div>
                }
              </div>
            </div>

            {/* Venue */}
            <div className="mb-4">
              <label className="form-label">Venue <span className="text-danger">*</span></label>
              <input 
                type="text" 
                className={`form-control ${uiState.errors.venue ? 'is-invalid' : ''}`} 
                placeholder="Venue name" 
                name="venue" 
                value={form.venue}
                onChange={handleChange} 
              />
              {uiState.errors.venue && <div className="invalid-feedback">{uiState.errors.venue}</div>}
            </div>

            {/* Place */}
            <div className="mb-4">
              <label className="form-label">Place <span className="text-danger">*</span></label>
              <input 
                type="text" 
                className={`form-control ${uiState.errors.place ? 'is-invalid' : ''}`} 
                placeholder="City/Town/Village" 
                name="place" 
                value={form.place}
                onChange={handleChange} 
              />
              {uiState.errors.place && <div className="invalid-feedback">{uiState.errors.place}</div>}
            </div>

            {/* Level */}
            <div className="mb-4">
              <label className="form-label">Level <span className="text-danger">*</span></label><br />
              <select
                className={`form-control ${uiState.errors.level ? 'is-invalid' : ''}`}
                name="level"
                value={form.level}
                onChange={handleChange}
              >
                {levelOptions}
              </select>
              {uiState.errors.level && <div className="invalid-feedback">{uiState.errors.level}</div>}
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
                  onChange={handleChange} 
                />
              </div>
              <div className="col-lg-6 mb-4">
                <label className="form-label">Date <span className="text-danger">*</span></label>
                <input 
                  type="date" 
                  className={`form-control ${uiState.errors.date ? 'is-invalid' : ''}`} 
                  name="date" 
                  value={form.date}
                  onChange={handleChange} 
                />
                {uiState.errors.date && <div className="invalid-feedback">{uiState.errors.date}</div>}
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
                onChange={handlePartnerLogosChange}
              />
              <div className="mt-3 d-flex gap-2 flex-wrap">
                {mediaFiles.partnerLogos.map((file, index) => (
                  <div key={index} className="position-relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`partner-${index}`}
                      className="rounded"
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                    <button 
                      type="button"
                      className="btn btn-sm btn-danger position-absolute top-0 end-0"
                      style={{ margin: '-8px', borderRadius: '50%', width: '24px', height: '24px', padding: '0' }}
                      onClick={() => {
                        setMediaFiles(prev => ({
                          ...prev,
                          partnerLogos: prev.partnerLogos.filter((_, i) => i !== index)
                        }));
                      }}
                    >
                      ×
                    </button>
                  </div>
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
                className={`form-control ${uiState.errors.state ? 'is-invalid' : ''}`} 
                name="state" 
                value={form.state}
                onChange={handleStateChange}
              >
                <option value="">Select</option>
                {locationData.states.map((state, id) => (
                  <option key={id} value={state.name}>
                    {state.state}
                  </option>
                ))}
              </select>
              {uiState.errors.state && <div className="invalid-feedback">{uiState.errors.state}</div>}
            </div>

            {/* District */}
            <div className="mb-4">
              <label className="form-label">District <span className="text-danger">*</span></label><br />
              <select 
                className={`form-control ${uiState.errors.district ? 'is-invalid' : ''}`} 
                name="district" 
                value={form.district}
                onChange={handleDistrictChange}
              >
                <option value="">Select</option>
                {locationData.districts.map((dist) => (
                  <option key={dist.name} value={dist.name}>
                    {dist.district_name}
                  </option>
                ))}
              </select>
              {uiState.errors.district && <div className="invalid-feedback">{uiState.errors.district}</div>}
            </div>

            {/* BRC */}
            <div className="mb-4">
              <label className="form-label">BRC <span className="text-danger">*</span></label><br />
              <select 
                className={`form-control ${uiState.errors.brc ? 'is-invalid' : ''}`} 
                name="brc" 
                value={form.brc}
                onChange={handleChange}
              >
                <option value="">Select</option>
                {locationData.brcs.map((brc) => (
                  <option key={brc.name} value={brc.name}>
                    {brc.brc_name}
                  </option>
                ))}
              </select>
              {uiState.errors.brc && <div className="invalid-feedback">{uiState.errors.brc}</div>}
            </div>

            {/* LAB TYPE */}
            <div className="mb-4">
              <label className="form-label">Lab Type <span className="text-danger">*</span></label><br />
              <select 
                className={`form-control ${uiState.errors.lab_type ? 'is-invalid' : ''}`} 
                name="lab_type" 
                value={form.lab_type}
                onChange={handleChange}
              >
                <option value="">Select</option>
                {locationData.labs.map((lab) => (
                  <option key={lab.name} value={lab.name}>
                    {lab.title}
                  </option>
                ))}
              </select>
              {uiState.errors.lab_type && <div className="invalid-feedback">{uiState.errors.lab_type}</div>}
            </div>

            {/* Event Gallery */}
            <div className="mb-4">
              <label className="form-label">Event Gallery</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                multiple
                onChange={handleGalleryImagesChange}
              />
              <div className="mt-3 d-flex gap-2 flex-wrap">
                {mediaFiles.galleryImages.map((file, index) => (
                  <div key={index} className="position-relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`gallery-${index}`}
                      className="rounded"
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                    <button 
                      type="button"
                      className="btn btn-sm btn-danger position-absolute top-0 end-0"
                      style={{ margin: '-8px', borderRadius: '50%', width: '24px', height: '24px', padding: '0' }}
                      onClick={() => {
                        setMediaFiles(prev => ({
                          ...prev,
                          galleryImages: prev.galleryImages.filter((_, i) => i !== index)
                        }));
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-4 d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={uiState.isSubmitting}
                >
                  {uiState.isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={resetForm}
                  disabled={uiState.isSubmitting}
                >
                  Reset
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