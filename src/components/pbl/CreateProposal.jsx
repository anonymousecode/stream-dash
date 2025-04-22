'use client'
import React, { useState, useEffect } from 'react'
import useDatePicker from '@/hooks/useDatePicker'
import Loading from '@/components/shared/Loading'
import { insertDoc, uploadFile, get_data } from '@/api/methods'
import Select from 'react-select'

const ProposalSubmit = () => {

  const [form, setForm] = useState({
    title: '', description: '', project_type: '', member_list: '', idea_sheet: ''
  });

  const [file, setFile] = useState(null);
  const { loading } = useDatePicker()

  const [members, setMembers] = useState([]); // Added state for project members
  const [selectedIds, setSelectedIds] = useState([]);
  const [brcs, setBrcs] = useState([]); // Added state for BRCs

  // Fetch members from backend
  useEffect(() => {
    const fetchMembers = async () => {
      const res = await get_data("STREAM User", ["name", "fname", "status"], "{}"); // Adjust based on your backend API
      console.log("Members data:", res);
      if (!res.error) {
        const filteredMembers = res.filter(member => member.status === "Student"); // Filter out students
        setMembers(filteredMembers);

      } else {
        console.error("Error fetching members:", res.error);
      }
    };

    fetchMembers();
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // const handleMemberChange = (e) => {
  //   setForm(prev => ({ ...prev, member_list: [{ unique_id: e.target.value }] }));
  // };

  const handleMemberChange = (e) => {
    const ids = Array.from(e.target.selectedOptions, (opt) => opt.value);

    // 1. Update selectedIds state
    setSelectedIds(ids);

    // 2. Convert to [{ unique_id: ... }] and set it in the form
    const formattedMembers = ids.map((id) => ({ unique_id: id }));
    setForm((form) => ({
      ...form,
      members_list: formattedMembers,
    }));
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
      idea_sheet: fileUrl,
    };

    console.log("Form data:", updatedForm);

    const result = await insertDoc("Project Proposal", updatedForm);
  }

  useEffect(() => {
    const fetchBRCs = async () => {
      const res = await get_data("BRC", ["brc_name", "name"], "");

      if (!res.error) {
        setBrcs(res);
      } else {
        console.error("Error fetching BRCs:", res.error);
      }


    };

    fetchBRCs();
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
                <option value="Engineering">Engineering</option>
                <option value="Non-Engineering">Non-Engineering</option>
                <option value="Others">Others</option>
              </select>
            </div>

            {/* Start Date */}
            {/* <div className="mb-4">
              <label className="form-label">Start Date <span className="text-danger">*</span></label>
              <input type="date" className="form-control" name="start_date" onChange={handleChange} />
            </div> */}

            {/* Project Members */}
            <div className="mb-4">
              <label className="form-label">Project Members <span className="text-danger">*</span></label>
              {/* <select multiple
                className="form-control"
                name="project_members"
                value={form.project_members}
              onChange={handleMemberChange}
              > */}
              {/* <option value="">Select Members</option> */}
              {/* {members.map((member) => (
                  <option key={member.email} value={member.name}>
                    {member.fname}-{member.name}
                    {member.fname}
                  </option> */}
              {/* // ))} */}
              {/* </select> */}

              <select
                multiple
                className="form-control"
                value={selectedIds}
                onChange={handleMemberChange}
                style={{ width: '300px', height: '150px' }}
              >
                {members.map((member) => (
                  <option key={member.email} value={member.unique_id}>
                    {member.fname} - {member.name}
                  </option>
                ))}
              </select>
              <div className="mt-4">
                <strong>Selected Members:</strong>
                <ul>
                  {selectedIds.map((id) => {
                    const found = members.find((m) => m.unique_id === id);
                    return (
                      <li key={id}>
                        {found?.fname} - {found?.name} ({id})
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* <Select
                options={options}
                isMulti
                className="basic-multi-select"
                classNamePrefix="select"
                value={options.filter(opt => selectedIds.includes(opt.value))}
                onChange={handleMemberChange}
              /> */}


            </div>

            {/* BRC */}
            <div className="mb-4">
              <label className="form-label">BRC</label><br />
              {/* <input type="text" className="form-control" placeholder="BRC Name" name="brc" onChange={handleChange} /> */}

              <select className="form-control" name="brc_id" onChange={handleChange}>
                <option value="">Select</option>
                {brcs.map((brc) => (
                  <option key={brc.name} value={brc.name}>
                    {brc.brc_name}
                  </option>
                ))}
              </select>
            </div>

            {/* File Upload */}
            <div className="mb-4">
              <label className="form-label">Idea sheet</label>
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
