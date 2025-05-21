'use client';
import React, { useState } from 'react';

const projectOptions = {
  engineering_design: [
    'Presentation File',
    'Design Chart',
    'Requirements',
    'Gantt Chart',
  ],
  digital_product_development: [
    'Presentation File',
    'Gathering Requirements',
    'System Design',
    'Gantt Chart',
  ],
  experimental_study: ['Presentation File', 'Methodology', 'Gantt Chart'],
  nonexperimental_study: ['Presentation File', 'Methodology', 'Gantt Chart'],
  qualitative_study: ['Presentation File', 'Methodology', 'Gantt Chart'],
  others: ['Presentation File', 'Methodology', 'Gantt Chart'],
};

const VerificationComponent = () => {
  const [selectedType, setSelectedType] = useState('');
  const [action, setAction] = useState('');
  const [reason, setReason] = useState('');

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setAction('');
    setReason('');
  };

  const handleSubmitReview = () => {
    if (action === 'rework' && !reason.trim()) {
      alert('Please provide a reason for rework.');
      return;
    }
    console.log('Review submitted:', { selectedType, action, reason });
    // Add submission logic here
  };

  return (
    <div className="container-fluid py-5 px-3">
      <div className="bg-white p-5 rounded shadow-sm border w-100">
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-3" style={{ color: '#F4B400' }}>
            Verify First Review Submissions
          </h2>
          <p className="text-dark mb-0">
            Open each of the following files for review:
          </p>
        </div>

        {/* Project Type Dropdown */}
        <div className="mb-4">
          <label className="form-label text-dark fw-semibold">
            Select Project Type
          </label>
          <select
            className="form-select"
            value={selectedType}
            onChange={handleTypeChange}
          >
            <option value="">-- Select --</option>
            {Object.keys(projectOptions).map((type) => (
              <option key={type} value={type}>
                {type.replace(/_/g, ' ')}
              </option>
            ))}
          </select>
        </div>

        {/* Files */}
        {selectedType && (
          <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
            {projectOptions[selectedType].map((file, idx) => (
              <button
                key={idx}
                className={`btn border ${
                  idx === 0 ? 'btn-warning text-white' : 'btn-outline-dark'
                }`}
              >
                {file.toUpperCase()}
              </button>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="d-flex justify-content-center gap-3 mb-4">
          <button
            className="btn btn-success fw-semibold"
            onClick={() => {
              setAction('accept');
              setReason('');
            }}
          >
            ACCEPT
          </button>
          <button
            className="btn btn-danger fw-semibold"
            onClick={() => {
              setAction('rework');
            }}
          >
            REQUEST REWORK
          </button>
        </div>

        {/* Rework Reason */}
        {action === 'rework' && (
          <div className="mb-4">
            <label className="form-label text-dark fw-semibold">
              Provide reason for rework:
            </label>
            <textarea
              className="form-control"
              rows={3}
              placeholder="Enter reason here..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        )}

        {action && (
          <div className="d-flex justify-content-end gap-2">
            <button className="btn btn-secondary" onClick={() => setAction('')}>
              CANCEL
            </button>
            <button
              className="btn btn-warning text-white fw-bold"
              onClick={handleSubmitReview}
            >
              SUBMIT REVIEW
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationComponent;
