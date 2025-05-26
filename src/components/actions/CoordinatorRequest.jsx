"use client"

import { useEffect, useState } from "react"
import { insertDoc, get_data } from '@/api/methods'

const CoordinatorRequest = () => {
  const [streamUsers, setStreamUsers] = useState([])
  const [brcList, setBrcList] = useState([])
  const [stateList, setStateList] = useState([])
  const [districtList, setDistrictList] = useState([])

  const [form, setForm] = useState({
    unique_id: "",
    name: "",
    brc_id: "",
    state_id: "",
    district_id: ""
  })

  // Fetch dropdown data
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [users, brcs, states, districts] = await Promise.all([
          get_data("STREAM User", ["name", "fname"]),
          get_data("BRC", ["name", "brc_name", "state_id", "district_id"]),
          get_data("State", ["name", "state"]),
          get_data("District", ["name", "district_name"])
        ])

        setStreamUsers(users || [])
        setBrcList(brcs || [])
        setStateList(states || [])
        setDistrictList(districts || [])
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchDropdownData()
  }, [])

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => {
      const updatedForm = { ...prev, [name]: value }

      // Auto-fill state_id and district_id based on selected BRC
      if (name === "brc_id") {
        const selectedBrc = brcList.find((b) => b.name === value)
        if (selectedBrc) {
          updatedForm.state_id = selectedBrc.state_id || ""
          updatedForm.district_id = selectedBrc.district_id || ""
        }
      }

      // Auto-fill name from selected user
      if (name === "unique_id") {
        const selectedUser = streamUsers.find((u) => u.name === value)
        updatedForm.name = selectedUser ? selectedUser.fname : ""
      }

      return updatedForm
    })
  }

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await insertDoc("Coordinator", form)
      if (result) {
        alert("Coordinator request submitted successfully!")
        setForm({
          unique_id: "",
          name: "",
          brc_id: "",
          state_id: "",
          district_id: ""
        })
      }
    } catch (error) {
      console.error("Submit error:", error)
      alert("Failed to submit coordinator request.")
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
                {user.fname} - {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            name="name"
            className="form-control"
            value={form.name}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label className="form-label">BRC ID</label>
          <select
            name="brc_id"
            className="form-control"
            value={form.brc_id}
            onChange={handleChange}
          >
            <option value="">Select BRC</option>
            {brcList.map((brc) => (
              <option key={brc.name} value={brc.name}>
                {brc.brc_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">State ID</label>
          <input
            name="state_id"
            className="form-control"
            value={form.state_id}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label className="form-label">District ID</label>
          <input
            name="district_id"
            className="form-control"
            value={form.district_id}
            readOnly
          />
        </div>

        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  )
}

export default CoordinatorRequest
