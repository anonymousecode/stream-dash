'use client'
import React, { useState, useEffect } from 'react'
import useDatePicker from '@/hooks/useDatePicker'
import Loading from '@/components/shared/Loading'
import { insertDoc, uploadFile, get_data } from '@/api/methods'

const ProposalSubmit = () => {

  const [form, setForm] = useState({
    title: '', description: '', project_type: '', start_date: '', project_members: '', file_upload: ''
  });

  const [file, setFile] = useState(null);
  const { loading } = useDatePicker()

  const [members, setMembers] = useState([]); // Added state for project members

  // Fetch members from backend
  useEffect(() => {
    const fetchMembers = async () => {
      const res = await get_data("STREAM User", ["name", "fname","status"], "{}"); // Adjust based on your backend API
        console.log("Members data:", res);
      if (!res.error) {
        const filteredMembers = res.filter(member => member.status === "Student"); // Filter out students
        setMembers(filteredMembers); // Assuming res is an array of members
      } else {
        console.error("Error fetching members:", res.error);
      }
    };

    fetchMembers();
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleMemberChange = (e) => {
    setForm(prev => ({ ...prev, project_members: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data:", form);
    console.log("File:", file);

    let fileUrl = '';
    if (file) {
      fileUrl = await uploadFile(file, 0);
      console.log("File URL:", fileUrl);
    }

    const updatedForm = {
      ...form,
      file_upload: fileUrl,
    };

    console.log("Form data:", updatedForm);

    const result = await insertDoc("Proposals", updatedForm);
  }

  return (
    <>
      {loading && <Loading />}

      <div className="col-xl-12">
        <div className="card stretch stretch-full">
          <div className="card-body">

            {/* Title */}
            <div className="mb-4">
              <label className="form-label">Title <span className="text-danger">*</span></label>
              <input type="text" className="form-control" placeholder="Proposal Title" name="title" onChange={handleChange} />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="form-label">Description <span className="text-danger">*</span></label>
              <textarea className="form-control" rows={4} placeholder="Project Description" name="description" onChange={handleChange}></textarea>
            </div>

            {/* Project Type */}
            <div className="mb-4">
            <label className="form-label">Project Type <span className="text-danger">*</span></label>
            <select
                className="form-control"
                name="project_type"
                onChange={handleChange}
                value={form.project_type} // This ensures the selected value is controlled
            >
                <option value="">Select Project Type</option>
                <option value="engineering">Engineering</option>
                <option value="non-engineering">Non-Engineering</option>
                <option value="others">Others</option>
            </select>
            </div>

            {/* Start Date */}
            <div className="mb-4">
              <label className="form-label">Start Date <span className="text-danger">*</span></label>
              <input type="date" className="form-control" name="start_date" onChange={handleChange} />
            </div>

            {/* Project Members */}
            <div className="mb-4">
              <label className="form-label">Project Members <span className="text-danger">*</span></label>
              <select
                className="form-control"
                name="project_members"
                value={form.project_members}
                onChange={handleMemberChange}
              >
                <option value="">Select Members</option>
                {members.map((member) => (
                  <option key={member.email} value={member.email}>
                    {member.fname}-{member.name}
                  </option>
                ))}
              </select>
            </div>

            {/* File Upload */}
            <div className="mb-4">
              <label className="form-label">Upload File</label>
              <input
                type="file"
                className="form-control"
                accept="application/pdf, image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <div className="mt-3 d-flex gap-2 flex-wrap">
                {file &&
                  <div className="file-preview">
                    <span>{file.name}</span>
                  </div>
                }
              </div>
            </div>

            {/* Submit Button */}
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
    </>
  )
}

export default ProposalSubmit
