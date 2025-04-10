'use client'
import React, { useState } from 'react'
import useDatePicker from '@/hooks/useDatePicker'
import useLocationData from '@/hooks/useLocationData'
import Loading from '@/components/shared/Loading'
import SelectDropdown from '@/components/shared/SelectDropdown'
import { districtOptions, labTypeOptions } from '@/utils/options'

const EventCreate = () => {
  const [selectedDistrict, setSelectedDistrict] = useState(null)
  const [selectedLabType, setSelectedLabType] = useState(null)
  const [stateValue, setStateValue] = useState('')
  const { startDate, setStartDate } = useDatePicker()
  const { loading } = useLocationData()

  const [eventImages, setEventImages] = useState([])
  const [partnerLogos, setPartnerLogos] = useState([])
  const [galleryImages, setGalleryImages] = useState([])

  return (
    <>
      {loading && <Loading />}

      <div className="col-xl-12">
        <div className="card stretch stretch-full">
          <div className="card-body">

            {/* Title */}
            <div className="mb-4">
              <label className="form-label">Title <span className="text-danger">*</span></label>
              <input type="text" className="form-control" placeholder="Event Title" />
            </div>

            {/* Short Description */}
            <div className="mb-4">
              <label className="form-label">Short Description <span className="text-danger">*</span></label>
              <input type="text" className="form-control" placeholder="Short description" />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="form-label">Description <span className="text-danger">*</span></label>
              <textarea className="form-control" rows={4} placeholder="Full description"></textarea>
            </div>

            {/* Event Images */}
            <div className="mb-4">
              <label className="form-label">Event Image</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                multiple
                onChange={(e) => setEventImages(Array.from(e.target.files))}
              />
              <div className="mt-3 d-flex gap-2 flex-wrap">
                {eventImages.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`event-${index}`}
                    className="rounded"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                ))}
              </div>
            </div>

            {/* Venue */}
            <div className="mb-4">
              <label className="form-label">Venue <span className="text-danger">*</span></label>
              <input type="text" className="form-control" placeholder="Venue name" />
            </div>

            {/* Place */}
            <div className="mb-4">
              <label className="form-label">Place <span className="text-danger">*</span></label>
              <input type="text" className="form-control" placeholder="City/Town/Village" />
            </div>

            {/* Level */}
            <div className="mb-4">
              <label className="form-label">Level</label>
              <input type="text" className="form-control" placeholder="Enter level (e.g., District, State)" />
            </div>

            {/* Host */}
            <div className="mb-4">
              <label className="form-label">Host</label>
              <input type="text" className="form-control" placeholder="Organizer / Host" />
            </div>

            {/* Time and Date */}
            <div className="row">
              <div className="col-lg-6 mb-4">
                <label className="form-label">Time</label>
                <input type="time" className="form-control" />
              </div>
              <div className="col-lg-6 mb-4">
                <label className="form-label">Date</label>
                <input type="date" className="form-control" />
              </div>
            </div>

            {/* Partner Name */}
            <div className="mb-4">
              <label className="form-label">Partner Name</label>
              <input type="text" className="form-control" placeholder="Partner Organization" />
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
              <input type="text" className="form-control" placeholder="Credit details (if any)" />
            </div>

            {/* State */}
            <div className="mb-4">
              <label className="form-label">State</label>
              <input
                type="text"
                className="form-control"
                value={stateValue}
                onChange={(e) => setStateValue(e.target.value)}
                placeholder="Enter state name"
              />
            </div>

            {/* District (Conditional) */}
            {stateValue.trim().toLowerCase() === 'kerala' && (
              <div className="mb-4">
                <label className="form-label">District</label>
                <SelectDropdown
                  options={districtOptions}
                  selectedOption={selectedDistrict}
                  onSelectOption={setSelectedDistrict}
                  defaultSelect="Wayanad"
                />
              </div>
            )}

            {/* BRC */}
            <div className="mb-4">
              <label className="form-label">BRC</label>
              <input type="text" className="form-control" placeholder="BRC Name" />
            </div>

            {/* Lab Type Dropdown */}
            <div className="mb-4">
              <label className="form-label">Lab Type</label>
              <SelectDropdown
                options={labTypeOptions}
                selectedOption={selectedLabType}
                onSelectOption={setSelectedLabType}
                defaultSelect="Ideation Lab"
              />
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
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default EventCreate



