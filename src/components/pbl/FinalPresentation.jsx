'use client';
import React, { useState, useEffect } from 'react';
import { uploadFile, update, get_data } from '@/api/methods';

const FinalPresentation = ({ projectId }) => {
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [fileNames, setFileNames] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState({})

  const [showReworkModel, setShowReworkModel] = useState(false);
  const [reworkReason, setReworkReason] = useState('');

  useEffect(() => {
    const fetchSubmittedWorksheets = async () => {
      console.log("the project is", projectId)

      get_data("Final Presentation", ["status", "remark"], [["parent", "=", projectId]]).then((data) => {
        console.log("the data is", data)
        if (data?.[0]?.status === "Rework") {
          setShowReworkModel(true);
          setReworkReason(data?.[0]?.remark || '');
        }

      });

    };

    fetchSubmittedWorksheets();
  }, []);

  const requiredField = 'presentation';

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

    if (!uploadedFiles[requiredField]) {
      setErrorMessage('Please upload the Experience Feedback file.');
      return;
    }

    setErrorMessage('');
    alert(`Submitted file:\n${requiredField}: ${fileNames[requiredField]}`);


    const formData = { ["final_presentation"]: [form] }
    console.log('Form data to be sent:', formData);
    const result = await update("Project", projectId, formData);
    console.log(result);
  };

  const renderFileInput = (field, isRequired) => (
    <div className="mb-4" key={field}>
      <label htmlFor={`${field}-upload`} className="form-label fw-semibold" style={{ color: '#F4B400' }}>
        Upload {field} {isRequired ? <span className="text-danger">(Required)</span> : null}
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
        {showReworkModel && (
          <div className="alert alert-warning mt-4 shadow-sm border border-warning">
            <h4 className="alert-heading">⚠️ Rework Required</h4>
            <p className="mb-0">Your submission has been marked for rework.</p><br />
            <p className="mb-0">Reason for rework:</p>
            <p>{reworkReason}</p>
            <hr />
            <p className="mb-0">Please review and submit again.</p>
          </div>
        )}
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-3" style={{ color: '#F4B400' }}>Stage 8: Final Presentation</h2>
          <p className="text-dark mb-0">
            In this phase, your team is expected to submit the <strong>Experience Feedback</strong> document. Please ensure that the document accurately reflects your experiences and insights gained throughout the project.
          </p>
        </div>

        {errorMessage && (
          <div className="alert alert-danger text-center mb-4">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {renderFileInput(requiredField, true)}

          <button
            type="submit"
            className="btn fw-bold w-100 text-white"
            style={{
              backgroundColor: '#F4B400',
              borderColor: '#F4B400',
              color: 'white'
            }}
          >
            Submit File
          </button>
        </form>
      </div>
    </div>
  );
};

export default FinalPresentation;
