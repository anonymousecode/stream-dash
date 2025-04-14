"use client"

import { useEffect, useState } from "react"
import "trix"
import "trix/dist/trix.css"

const FacilitiesCreate = () => {
  const [form, setForm] = useState({
    facility_name: "",
    lab_type: "",
    brc: "",
    district: "",
    attach_image: null,
    description: "",
  })

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
    const { name, value, files } = e.target
    if (files) {
      setForm((prev) => ({ ...prev, [name]: files[0] }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Facility Data", form)
    // Add your POST request logic here
  }

  return (
    <div className="container mt-3">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Facility Name</label>
          <input
            name="facility_name"
            className="form-control"
            onChange={handleChange}
            placeholder="Enter facility name"
          />
        </div>

        <div className="mb-3">
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
        </div>

        <div className="mb-3">
          <label className="form-label">Attach Image</label>
          <input
            type="file"
            name="attach_image"
            className="form-control"
            onChange={handleChange}
          />
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
