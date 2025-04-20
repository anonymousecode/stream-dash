'use client'
import React, { use, useState, useEffect } from 'react'
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


  // "/files/AI.jpeg"

  const [form, setForm] = useState({
    title: '', short_description: '', description: '', event_image: '',
    venue: '', place: '', level: '', host: '', time: '', date: '', partner_name: '', credit: '', brc: '', district: '', lab_type: '', state: ''
  });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    console.log("Form data:", form);
    console.log("Image:", eventImages);

    e.preventDefault()

    const imageUrl = await uploadFile(eventImages, 0)
    console.log("Image URL:", imageUrl);
    setForm(prev => ({ ...prev, event_image: imageUrl }));

    console.log("Form data:", form);

    const result = await insertDoc("Events", {
      ...form,



    });
  }

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
      const res = await get_data("District", ["district_name", "name"], [["state_id", "=", selectedState]]);

      if (!res.error) {
        setDistricts(res); // Assuming res is an array
      } else {
        console.error("Error fetching districts:", res.error);
      }


    };

    fetchDistricts();


  }, [selectedState]);


  useEffect(() => {
    const fetchBRCs = async () => {
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

      <div className="col-xl-12">
        <div className="card stretch stretch-full">
          <div className="card-body">

            {/* Title */}
            <div className="mb-4">
              <label className="form-label">Title <span className="text-danger">*</span></label>
              <input type="text" className="form-control" placeholder="Event Title" name="title" onChange={handleChange} />
            </div>

            {/* Short Description */}
            <div className="mb-4">
              <label className="form-label">Short Description <span className="text-danger">*</span></label>
              <input type="text" className="form-control" placeholder="Short description" name="short_description" onChange={handleChange} />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="form-label">Description <span className="text-danger">*</span></label>
              <textarea className="form-control" rows={4} placeholder="Full description" name="description" onChange={handleChange}></textarea>
            </div>

            {/* Event Images */}
            <div className="mb-4">
              <label className="form-label">Event Image</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                name='event_image'
                multiple
                onChange={(e) => setEventImages(e.target.files[0])}
              // onChange={(e) => {
              //   setForm(prev => ({ ...prev, event_image: e.target.files[0].name }));

              // }}
              />
              {/* <div className="mt-3 d-flex gap-2 flex-wrap">
                    {eventImages.map((file, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt={`event-${index}`}
                        className="rounded"
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                      />
                    ))}
                  </div> */}
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
              <input type="text" className="form-control" placeholder="Venue name" name="venue" onChange={handleChange} />
            </div>

            {/* Place */}
            <div className="mb-4">
              <label className="form-label">Place <span className="text-danger">*</span></label>
              <input type="text" className="form-control" placeholder="City/Town/Village" name="place" onChange={handleChange} />
            </div>

            {/* Level */}
            <div className="mb-4">
              <label className="form-label">Level</label>
              <input type="text" className="form-control" placeholder="Enter level (e.g., District, State)" name="level" onChange={handleChange} />
            </div>

            {/* Host */}
            <div className="mb-4">
              <label className="form-label">Host</label>
              <input type="text" className="form-control" placeholder="Organizer / Host" name="host" onChange={handleChange} />
            </div>

            {/* Time and Date */}
            <div className="row">
              <div className="col-lg-6 mb-4">
                <label className="form-label">Time</label>
                <input type="time" className="form-control" name="time" onChange={(e) => {
                  const fullTime = e.target.value + ":00"; // always adds seconds
                  setForm(prev => ({ ...prev, time: fullTime }));
                }} />
              </div>
              <div className="col-lg-6 mb-4">
                <label className="form-label">Date</label>
                <input type="date" className="form-control" name="date" onChange={handleChange} />
              </div>
            </div>

            {/* Partner Name */}
            <div className="mb-4">
              <label className="form-label">Partner Name</label>
              <input type="text" className="form-control" placeholder="Partner Organization" name="partner_name" onChange={handleChange} />
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
              <input type="text" className="form-control" placeholder="Credit details (if any)" name="credit" onChange={handleChange} />
            </div>


            {/* State */}

            <div className="mb-4">
              <label className="form-label">State  </label><br />
              <select className="form-control" name="state" onChange={(e) => {
                setForm(prev => ({ ...prev, state: e.target.value }));
                setSelectedState(e.target.value);
              }}>
                <option value="">Select</option>
                {states.map((state, id) => (
                  <option key={id} value={state.name}>
                    {state.state}
                  </option>
                ))}
              </select>
            </div>

            {/* District */}

            <div className="mb-4">
              <label className="form-label">District</label><br />
              <select className="form-control" name="district" onChange={(e) => {
                setForm(prev => ({ ...prev, district: e.target.value }));
                setSelectedDistrict(e.target.value);
              }}>
                <option value="">Select</option>
                {districts.map((dist) => (
                  <option key={dist.name} value={dist.name}>
                    {dist.district_name}
                  </option>
                ))}
              </select>
            </div>

            {/* BRC */}
            <div className="mb-4">
              <label className="form-label">BRC</label><br />
              {/* <input type="text" className="form-control" placeholder="BRC Name" name="brc" onChange={handleChange} /> */}

              <select className="form-control" name="brc" onChange={handleChange}>
                <option value="">Select</option>
                {brcs.map((brc) => (
                  <option key={brc.name} value={brc.name}>
                    {brc.brc_name}
                  </option>
                ))}
              </select>
            </div>

            {/* LAB TYPE */}
            <div className="mb-4">
              <label className="form-label">Lab Type</label><br />
              <select className="form-control" name="lab_type" onChange={handleChange}>
                <option value="">Select</option>
                {labs.map((lab) => (
                  <option key={lab.name} value={lab.name}>
                    {lab.title}
                  </option>
                ))}
              </select>
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
