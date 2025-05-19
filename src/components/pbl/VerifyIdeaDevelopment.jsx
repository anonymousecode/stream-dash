'use client';
import React, { useEffect, useState } from 'react';
import { update } from '@/api/methods';

const VerifyIdeaDevelopment = () => {
  const [submittedFiles, setSubmittedFiles] = useState({
    brainstorming_map: '',
    concept_map: '',
    project_outline: ''
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showReworkTextbox, setShowReworkTextbox] = useState(false);
  const [reworkFeedback, setReworkFeedback] = useState('');

  useEffect(() => {
    const fetchSubmittedWorksheets = async () => {
      try {
        const res = await fetch('/api/submitted-idea-development');
        const data = await res.json();
        setSubmittedFiles({
          brainstorming_map: data?.brainstorming_map || '',
          concept_map: data?.concept_map || '',
          project_outline: data?.project_outline || ''
        });
      } catch (err) {
        console.error('Failed to fetch submitted worksheets', err);
      }
    };

    fetchSubmittedWorksheets();
  }, []);

  const handleDownload = (url) => {
    if (!url) {
      alert('File not available.');
      return;
    }
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  };

  const handleDecision = async (status) => {
    if (status === 'Rework Required') {
      setShowReworkTextbox(true);
      return;
    }

    await submitDecision(status);
  };

  const submitDecision = async (status) => {
    setLoading(true);
    try {
      const payload = {
        idea_development_status: status
      };

      if (status === 'Rework Required') {
        payload['rework_feedback'] = reworkFeedback;
      }

      const result = await update("Project", "P00006", payload);

      if (result.success) {
        setStatusMessage(
          status === 'Rework Required'
            ? `Rework requested with feedback: "${reworkFeedback}"`
            : `Idea Development has been marked as: ${status}`
        );
      } else {
        setStatusMessage('Failed to update status.');
      }
    } catch (err) {
      console.error('Status update failed', err);
      setStatusMessage('Error updating status.');
    }
    setLoading(false);
    setShowReworkTextbox(false);
    setReworkFeedback('');
  };

  return (
    <div className="container-fluid py-5 px-3">
      <div className="bg-white p-5 rounded shadow-sm border w-100">
        <h2 className="text-center fw-bold mb-4" style={{ color: '#F4B400' }}>
          Verify Idea Development Submissions
        </h2>

        <div className="mb-4 text-center">
          <p className="mb-3">Download each of the following submissions for review:</p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <button
              className="btn btn-outline-primary fw-bold"
              onClick={() => handleDownload(submittedFiles.brainstorming_map)}
            >
              Brainstorming Map
            </button>
            <button
              className="btn btn-outline-primary fw-bold"
              onClick={() => handleDownload(submittedFiles.concept_map)}
            >
              Concept Map
            </button>
            <button
              className="btn btn-outline-primary fw-bold"
              onClick={() => handleDownload(submittedFiles.project_outline)}
            >
              Project Outline
            </button>
          </div>
        </div>

        <div className="text-center mt-5">
          <h5 className="mb-3 text-dark">Decision</h5>
          <div className="d-flex justify-content-center gap-3">
            <button
              className="btn btn-success fw-bold"
              onClick={() => handleDecision('Accepted')}
              disabled={loading}
            >
              Accept
            </button>
            <button
              className="btn btn-danger fw-bold"
              onClick={() => handleDecision('Rework Required')}
              disabled={loading}
            >
              Request Rework
            </button>
          </div>
        </div>

        {showReworkTextbox && (
          <div className="mt-4">
            <label htmlFor="reworkFeedback" className="form-label fw-bold">
              Provide reason for rework:
            </label>
            <textarea
              id="reworkFeedback"
              className="form-control"
              rows="4"
              value={reworkFeedback}
              onChange={(e) => setReworkFeedback(e.target.value)}
              placeholder="Enter feedback or instructions for rework..."
            ></textarea>
            <div className="text-center mt-3">
              <button
                className="btn btn-danger fw-bold"
                onClick={() => submitDecision('Rework Required')}
                disabled={!reworkFeedback.trim() || loading}
              >
                Submit Rework Feedback
              </button>
              <button
                className="btn btn-secondary ms-2"
                onClick={() => {
                  setShowReworkTextbox(false);
                  setReworkFeedback('');
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {statusMessage && (
          <div className="alert alert-info text-center mt-4">
            {statusMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyIdeaDevelopment;
