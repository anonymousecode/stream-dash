'use client';
import React, { useState } from 'react';

const VerifySecondReview = () => {
  const [showReworkReason, setShowReworkReason] = useState(false);
  const [reason, setReason] = useState('');

  const handleAccept = () => {
    setShowReworkReason(false);
    alert('Submission Accepted');
  };

  const handleRework = () => {
    setShowReworkReason(true);
  };

  const handleCancel = () => {
    setShowReworkReason(false);
    setReason('');
  };

  const handleSubmitReview = () => {
    if (!reason.trim()) {
      alert('Please provide a reason for rework.');
      return;
    }
    alert(`Rework requested with reason:\n${reason}`);
    setShowReworkReason(false);
  };

  return (
    <div className="container-fluid py-5 px-3">
      <div className="bg-white p-5 rounded shadow-sm border w-100">
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-3" style={{ color: '#F4B400' }}>
            Verify Second Review Submissions
          </h2>
          <p className="text-dark mb-0">Open each of the following files for review:</p>
        </div>

        
        <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
          <a href="/path/to/presentation" target="_blank" rel="noopener noreferrer">
            <button className="btn fw-semibold border-2" style={{ borderColor: '#F4B400', color: '#F4B400' }}>
              PRESENTATION FILE
            </button>
          </a>

          
          <a href="/path/to/revised-report" target="_blank" rel="noopener noreferrer">
            <button className="btn btn-outline-secondary fw-semibold">
              REVISED REPORT
            </button>
          </a>

        </div>

        {/* Action buttons */}
        <div className="d-flex justify-content-center gap-3 mb-4">
          <button className="btn btn-success fw-bold" onClick={handleAccept}>
            ACCEPT
          </button>
          <button className="btn btn-danger fw-bold" onClick={handleRework}>
            REQUEST REWORK
          </button>
        </div>

        {/* Rework reason section */}
        {showReworkReason && (
          <div>
            <div className="mb-3">
              <label className="form-label fw-semibold text-dark">
                Provide reason for rework:
              </label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Enter reason here..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-end gap-2">
              <button className="btn btn-secondary" onClick={handleCancel}>
                CANCEL
              </button>
              <button
                className="btn fw-bold text-white"
                style={{ backgroundColor: '#F4B400' }}
                onClick={handleSubmitReview}
              >
                SUBMIT REVIEW
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifySecondReview;
