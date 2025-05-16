'use client';
import React, { useState } from 'react';
import { uploadFile, update } from '@/api/methods';
import { result, set } from 'lodash';

const SecondReview = ({ projectId }) => {
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [fileNames, setFileNames] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState({})

  const requiredField = 'presentation';
  const optionalField = 'Revised Report';

  const handleFileChange = async (e, field) => {
    const file = e.target.files[0];
    const fileName = await uploadFile(file, 0);
    setForm((prev) => ({ ...prev, [field]: fileName }));

    setUploadedFiles((prev) => ({ ...prev, [field]: file }));
    setFileNames((prev) => ({ ...prev, [field]: file?.name || '' }));
  };



  const handleRemoveFile = (field) => {
    setUploadedFiles((prev) => {
      const newFiles = { ...prev };
      delete newFiles[field];
      return newFiles;
    });
    setFileNames((prev) => {
      const newNames = { ...prev };
      delete newNames[field];
      return newNames;
    });
    document.getElementById(`${field}-upload`).value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Uploaded files:', uploadedFiles);

    if (!uploadedFiles[requiredField]) {
      setErrorMessage('Please upload the Project Plan.');
      return;
    }

    setErrorMessage('');
    alert(`Submitted files:\n${[requiredField, optionalField].map(f => `${f}: ${fileNames[f] || 'Not uploaded'}`).join('\n')}`);
    console.log('Form data:', form);

    const formData = { ["second_review"]: [form] }
    console.log('Form data to be sent:', formData);
    const result = await update("Project", projectId, formData);
    console.log(result);
  };

  const renderFileInput = (field, isRequired) => (
    <div className="mb-4" key={field}>
      <label htmlFor={`${field}-upload`} className="form-label fw-semibold" style={{ color: '#F39C12' }}>
        Upload {field} {isRequired ? <span className="text-danger">(Required)</span> : <span className="text-muted">(Optional)</span>}
      </label>
      <input
        id={`${field}-upload`}
        type="file"
        accept=".pdf, .png, .jpg, .jpeg"
        className="form-control"
        onChange={(e) => handleFileChange(e, field)}
      />
      {fileNames[field] && (
        <div className="alert alert-light border d-flex justify-content-between align-items-center mt-2">
          <span className="text-success"><strong>Selected:</strong> {fileNames[field]}</span>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={() => handleRemoveFile(field)}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="container-fluid py-5 px-3">
      <div className="bg-white p-5 rounded shadow-sm border w-100">
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-3" style={{ color: '#F4B400' }}>Stage 5: Second Review</h2>
          <p className="text-dark mb-0">
            The documents submitted during the <strong>Planning stage</strong> will be reviewed in this phase. Your team must present the <strong>Project Plan</strong> and submit a <strong>Revised Report</strong> based on suggestions received from coordinators or mentors. Please ensure all documents are clear and reflect the recommended revisions.
          </p>
        </div>

        {errorMessage && (
          <div className="alert alert-danger text-center mb-4">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {renderFileInput(requiredField, true)}
          {renderFileInput(optionalField, false)}

          <button
            type="submit"
            className="btn fw-bold w-100 text-white"
            style={{
              backgroundColor: '#F4B400',
              borderColor: '#F4B400',
              color: 'white'
            }}
          >
            Submit Files
          </button>
        </form>
      </div>
    </div>
  );
};

export default SecondReview;
