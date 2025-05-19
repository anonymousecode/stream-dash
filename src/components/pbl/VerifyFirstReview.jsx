'use client';
import React, { useEffect, useState } from 'react';

const FirstReviewVerification = () => {
  const [presentationFile, setPresentationFile] = useState('');
  const [supportingFiles, setSupportingFiles] = useState([]);

  // Track review status: 'accepted', 'rework', or null
  const [reviewStatus, setReviewStatus] = useState(null);
  const [reworkReason, setReworkReason] = useState('');

  useEffect(() => {
    // Dummy data simulating fetched files
    const dummyPresentation = 'https://example.com/files/presentation.pdf';
    const dummySupportDocs = [
      { url: 'https://example.com/files/supporting1.pdf', name: 'Supporting Document 1' },
      { url: 'https://example.com/files/supporting2.pdf', name: 'Supporting Document 2' }
    ];

    setPresentationFile(dummyPresentation);
    setSupportingFiles(dummySupportDocs);
  }, []);

  const handleOpenFile = (url) => {
    if (!url) {
      alert('File not available.');
      return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleAccept = () => {
    setReviewStatus('accepted');
    setReworkReason('');
    alert('Review accepted.');
  };

  const handleRework = () => {
    setReviewStatus('rework');
  };

  const handleCancelRework = () => {
    setReviewStatus(null);
    setReworkReason('');
  };

  const handleSubmitRework = () => {
    if (!reworkReason.trim()) {
      alert('Please provide a reason before submitting.');
      return;
    }

    // Simulate rework submission
    alert(`Rework submitted: ${reworkReason}`);

    // Reset state after submission
    setReviewStatus(null);
    setReworkReason('');
  };

  return (
    <div className="container-fluid py-5 px-3">
      <div className="bg-white p-5 rounded shadow-sm border w-100">
        <h2 className="text-center fw-bold mb-4" style={{ color: '#F4B400' }}>
          Verify First Review Submissions
        </h2>

        <div className="mb-4 text-center">
          <p className="mb-3">Open each of the following files for review:</p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {presentationFile && (
              <button
                className="btn btn-outline-primary fw-bold"
                onClick={() => handleOpenFile(presentationFile)}
              >
                Presentation File
              </button>
            )}

            {supportingFiles.length > 0 &&
              supportingFiles.map((file, index) => (
                <button
                  key={index}
                  className="btn btn-outline-secondary fw-bold"
                  onClick={() => handleOpenFile(file.url)}
                >
                  {file.name}
                </button>
              ))}

            {!presentationFile && supportingFiles.length === 0 && (
              <p className="text-muted">No files submitted.</p>
            )}
          </div>
        </div>

        {/* Accept and Rework buttons */}
        <div className="d-flex justify-content-center gap-3 mb-3">
          <button
            className="btn btn-success fw-bold"
            onClick={handleAccept}
          >
            ACCEPT
          </button>
          <button
            className="btn btn-danger fw-bold"
            onClick={handleRework}
          >
            REQUEST REWORK
          </button>
        </div>

        {/* Show only when "REQUEST REWORK" is clicked */}
        {reviewStatus === 'rework' && (
          <div className="mb-3">
            <label htmlFor="reworkReason" className="form-label fw-bold">
              Provide reason for rework:
            </label>
            <textarea
              id="reworkReason"
              className="form-control"
              rows={4}
              value={reworkReason}
              onChange={(e) => setReworkReason(e.target.value)}
              placeholder="Enter reason here..."
              required
            />

            <div className="d-flex justify-content-end gap-2 mt-3">
              <button className="btn btn-secondary" onClick={handleCancelRework}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSubmitRework}>
                Submit Review
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FirstReviewVerification;
