"use client"

import { useEffect, useState } from "react"
import "trix"
import "trix/dist/trix.css"
import { insertDoc, uploadFile, get_data } from '@/api/methods'

const FacilitiesCreate = () => {
  const [form, setForm] = useState({
    title: "",
    lab_type: "",
    brc: "",
    district: "",
    state: "",
    attach_image: null,
    description: "",
    address: "",
  })


  const [districts, setDistricts] = useState([])
  const [states, setStates] = useState([])
  const [brcs, setBrcs] = useState([])
  const [labs, setLabs] = useState([])
  const [selectedState, setSelectedState] = useState(null)
  const [selectedDistrict, setSelectedDistrict] = useState(null)
  const [facilityImage, setFacilityImage] = useState(null)



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



  const handleSave = () => {
    // You can collect and validate your form data here.
    alert("Proposal saved! (you can replace this with actual logic)");
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const editor = document.querySelector("trix-editor")
      if (editor) {
        editor.addEventListener("trix-change", (e) => {
          setForm((prev) => ({
            ...prev,
            description: e.target.innerHTML,
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
    console.log("Image:", facilityImage);

    e.preventDefault()

    const imageUrl = await uploadFile(facilityImage, 0)
    console.log("Image URL:", imageUrl);
    setForm(prev => ({ ...prev, attach_image: imageUrl }));

    console.log("Form data:", form);

    const result = await insertDoc("Facility", {
      ...form,

    });
  }

  return (
    <div className="container mt-3">
      <form onSubmit={handleSubmit}>

        {/* Title */}
        <div className="mb-3">
          <label className="form-label">Facility Name</label>
          <input
            name="title"
            className="form-control"
            onChange={handleChange}
            placeholder="Enter facility name"
          />
        </div>

        {/* <div className="mb-3">
          <label className="form-label">Lab Type</label>
          <input
            name="lab_type"
            className="form-control"
            onChange={handleChange}
            placeholder="e.g. ICT Lab, Science Lab"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">BRC</label>
          <input
            name="brc"
            className="form-control"
            onChange={handleChange}
            placeholder="Enter BRC"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">District</label>
          <input
            name="district"
            className="form-control"
            onChange={handleChange}
            placeholder="Enter district"
          />
        </div> */}

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

        {/* adress */}
        <div className="mb-3">
          <label className="form-label">Address</label>
          <textarea
            name="address"
            className="form-control"
            onChange={handleChange}
            placeholder="Enter Address"
          />
        </div>

        {/* Image */}

        <div className="mb-3">
          <label className="form-label">Attach Image</label>
          <input
            type="file"
            name="attach_image"
            className="form-control"
            onChange={(e) => { setFacilityImage(e.target.files[0]) }}
          />
          <div className="mt-3 d-flex gap-2 flex-wrap">
            {facilityImage &&
              <img

                src={URL.createObjectURL(facilityImage)}
                alt="event"
                className="rounded"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
            }
          </div>
        </div>



        <div className="mb-3">
          <label className="form-label">Description</label>
          <input type="hidden" id="description" />
          <trix-editor input="description"></trix-editor>
        </div>

        {/* SAVE BUTTON */}
        <div className="text-end mt-4">
          <button
            onClick={handleSave}
            className="btn"
            style={{
              backgroundColor: '#FFC324',
              color: 'white',
              padding: '10px 20px',
              fontWeight: 'bold',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default FacilitiesCreate
