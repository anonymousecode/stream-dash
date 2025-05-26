"use client"

import { useEffect, useRef, useState } from "react"
import { insertDoc, get_data } from '@/api/methods'

const MentorRequest = () => {
  const [streamUsers, setStreamUsers] = useState([])
  const [brcList, setBrcList] = useState([])
  const [stateList, setStateList] = useState([])
  const [districtList, setDistrictList] = useState([])

  const [form, setForm] = useState({
    unique_id: "",
    domain: "",
    level: "",
    preferred_brc: "",
    state_id: "",
    district_id: ""
  })

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const userFields = ["name", "fname"]
        const brcFields = ["name","brc_name"]
        const stateFields = ["name","state"]
        const districtFields = ["name","district_name"]

        const [users, brcs, states, districts] = await Promise.all([
          get_data("STREAM User", userFields, {}),
          get_data("BRC", brcFields, {}),
          get_data("State", stateFields, {}),
          get_data("District", districtFields, {}),
        ])

        setStreamUsers(users || [])
        setBrcList(brcs || [])
        setStateList(states || [])
        setDistrictList(districts || [])
      } catch (error) {
        console.error("Error fetching dropdown data:", error)
      }
    }

    fetchDropdownData()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const result = await insertDoc("Mentor", form)

      if (result) {
        alert("Mentor request submitted successfully!")
        setForm({
          unique_id: "",
          domain: "",
          level: "",
          preferred_brc: "",
          state_id: "",
          district_id: ""
        })
      }
    } catch (error) {
      console.error("Submit error:", error)
      alert("Failed to submit mentor request.")
    }
  }

  return (
    <div className="container mt-3 bg-white p-4 rounded shadow-sm">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Unique ID</label>
          <select
            name="unique_id"
            className="form-control"
            value={form.unique_id}
            onChange={handleChange}
          >
            <option value="">Select User</option>
            {streamUsers.map((user) => (
              <option key={user.name} value={user.name}>
                {user.fname + " - " + user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Domain</label>
          <input
            name="domain"
            className="form-control"
            value={form.domain}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Level</label>
          <select
            name="level"
            className="form-control"
            value={form.level}
            onChange={handleChange}
          >
            <option value="">Select Level</option>
            <option value="District">District</option>
            <option value="BRC">BRC</option>
            <option value="State">State</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Preferred BRC</label>
          <select
            name="preferred_brc"
            className="form-control"
            value={form.preferred_brc}
            onChange={handleChange}
          >
            <option value="">Select BRC</option>
            {brcList.map((brc) => (
              <option key={brc.name} value={brc.name}>
                { brc.brc_name} 
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">State ID</label>
          <select
            name="state_id"
            className="form-control"
            value={form.state_id}
            onChange={handleChange}
          >
            <option value="">Select State</option>
            {stateList.map((state) => (
              <option key={state.name} value={state.name}>
                {state.state}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">District ID</label>
          <select
            name="district_id"
            className="form-control"
            value={form.district_id}
            onChange={handleChange}
          >
            <option value="">Select District</option>
            {districtList.map((district) => (
              <option key={district.name} value={district.name}>
                {district.district_name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  )
}

export default MentorRequest
