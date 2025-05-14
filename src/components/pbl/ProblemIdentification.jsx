'use client';
import React, { useState, useEffect } from 'react';
import { get_data, insertDoc, uploadFile } from '@/api/methods';

const ProblemIdentification = ({ instructionsFileUrl }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  // const [form, setForm] = useState({ brc_id: '' }); 
  const [form, setForm] = useState({
    title: '', description: '', member_list: '', empathy_map: ''
  });
  const [members, setMembers] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [brcs, setBrcs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      const res = await get_data("STREAM User", ["name", "fname", "status"], "{}");
      if (!res.error) {
        const filtered = res.filter(m => m.status === "Student");
        setMembers(filtered);
      }
    };

    const fetchBRCs = async () => {
      const res = await get_data("BRC", ["brc_name", "name"], "");
      if (!res.error) {
        setBrcs(res);
      }
    };

    fetchMembers();
    fetchBRCs();
  }, []);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setFileName(uploadedFile?.name || '');
  };

  const handleRemoveFile = () => {
    const fileInput = document.getElementById('fileUpload');
    if (fileInput) fileInput.value = '';
    setFile(null);
    setFileName('');
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Check if file is uploaded 
  //   if (!file) {
  //     setErrorMessage('Please upload an empathy map file before submitting.');
  //     return;
  //   }

  //   setErrorMessage('');
  //   alert('Empathy map uploaded: ' + fileName);
  // };
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
      empathy_map: fileUrl,
    };

    console.log("Form data:", updatedForm);

    const result = await insertDoc("Project Proposal", updatedForm);
  }

  const handleOpenFile = () => {
    if (instructionsFileUrl) {
      window.open(instructionsFileUrl, '_blank');
    } else {
      alert('No instructions file available.');
    }
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleMemberChange = (e) => {
    const ids = Array.from(e.target.selectedOptions, opt => opt.value);
    setSelectedIds(ids);
    const formattedMembers = ids.map((id) => ({ unique_id: id }));
    setForm((form) => ({
      ...form,
      members_list: formattedMembers,
    }));

  };

  return (
    <div className="container-fluid bg-white p-4 rounded shadow-sm border mt-4">
      {/* Title and Phase Description */}
      <div className="text-center mb-5">
        <h2 className="fw-bold" style={{ color: '#F4B400' }}>Stage 1: Problem Identification</h2>
        <p className="text-dark">
          In this phase, your team will identify the key problem to be solved. You'll need to define the issue clearly, including understanding the stakeholders, their needs, and the context. This is a
          foundational stage, setting the stage for the later stages of ideation and solution development.
        </p>
      </div>

      {/* Instructions File Section */}
      <section className="mb-4">
        {instructionsFileUrl ? (
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={handleOpenFile}
          >
            Open Instructions File
          </button>
        ) : (
          <p className="text-danger">No instructions file available.</p>
        )}
      </section>

      <div className="mb-4">
        <label className="form-label">Title <span className="text-danger">*</span></label>
        <input type="text" className="form-control" placeholder="Proposal Title" name="title" onChange={handleChange} />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="form-label">Description <span className="text-danger">*</span></label>
        <textarea className="form-control" rows={4} placeholder="Project Description" name="description" onChange={handleChange}></textarea>
      </div>

      {/* Project Members */}
      <div className="mb-4">
        <label className="form-label">Project Members <span className="text-danger">*</span></label>
        <select
          multiple
          className="form-control"
          value={selectedIds}
          onChange={handleMemberChange}
          style={{ height: '150px' }}
        >
          {members.map((member) => (
            <option key={member.name} value={member.name}>
              {member.fname} - {member.name}
            </option>
          ))}
        </select>

        <div className="mt-3">
          <strong>Selected Members:</strong>
          <ul>
            {selectedIds.map(id => {
              const member = members.find(m => m.name === id);
              return (
                <li key={id}>{member?.fname} - {member?.name}</li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* BRC */}
      <div className="mb-4">
        <label className="form-label">BRC</label>
        <select className="form-control" name="brc_id" onChange={handleChange}>
          <option value="">Select</option>
          {brcs.map((brc) => (
            <option key={brc.name} value={brc.name}>
              {brc.brc_name}
            </option>
          ))}
        </select>
      </div>

      {/* Upload Section */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fileUpload" className="form-label fw-semibold">
            Upload Empathy Map (PDF/Image)
          </label>
          <input
            id="fileUpload"
            type="file"
            accept=".pdf, .png, .jpg, .jpeg"
            onChange={handleFileChange}
            className="form-control"
          />
        </div>

        {fileName && (
          <div className="alert alert-light border d-flex justify-content-between align-items-center">
            <div className="text-success mb-0">
              <strong>Selected:</strong> {fileName}
            </div>
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={handleRemoveFile}
            >
              Remove
            </button>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="alert alert-danger text-center mb-4">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          className="btn fw-bold text-white"
          style={{ backgroundColor: '#F4B400' }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProblemIdentification; 