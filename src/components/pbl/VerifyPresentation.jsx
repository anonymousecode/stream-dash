'use client';
import React, { useState, useEffect } from 'react';
import { get_data, update } from '@/api/methods';
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


const VerifyPresentation = ({ projectId }) => {
  const [showReworkReason, setShowReworkReason] = useState(false);
  const [reason, setReason] = useState('');
  const [presentationFile, setPresentationFile] = useState('SDfasdf');

  useEffect(() => {
    const fetchPresentaion = async () => {
      console.log("the project is", projectId)

      get_data("Final Presentation", ["presentation"], [["parent", "=", projectId]]).then((data) => {
        console.log("the data is", data)
        console.log("the message is", data?.[0])
        const fileData = data?.[0] || {}; // safely access first item

        setPresentationFile(fileData.presentation || '');
      });

    };

    fetchPresentaion();
  }, []);


  const handleOpenFile = (url) => {
    if (!url) {
      alert('File not available.');
      return;
    }
    // window.open(apiBaseUrl + url, '_blank', 'noopener,noreferrer');
    console.log("handleDownload is called")
    console.log("the url is", url)
    const link = document.createElement('a');
    link.href = apiBaseUrl + url;
    console.log("the link is", link.href)
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  };



  const handleAccept = async () => {
    // setReviewStatus('Approved');
    setReason('');
    const form = {
      "final_presentation": [
        {
          "presentation": presentationFile,
          "status": "Approved",
          "remark": "Presentation file is approved.",
        }
      ]

    }
    alert('Review accepted.');
    console.log("the form is", form)


    const result = await update("Project", projectId, form);
    console.log("the result is", result)
  };

  const handleRework = () => {
    setShowReworkReason(true);
  };

  const handleCancel = () => {
    setShowReworkReason(false);
    setReason('');
  };

  const handleSubmitReview = async () => {
    if (!reason.trim()) {
      alert('Please provide a reason before submitting.');
      return;
    }

    const form = {
      "final_presentation": [
        {
          "presentation": presentationFile,
          "status": "Rework",
          "remark": reason,
        }
      ]

    }



    // Simulate rework submission
    alert(`Rework submitted: ${reason}`);
    console.log("the form is", form)


    const result = await update("Project", projectId, form);
    console.log("the result is", result)

    // Reset state after submission
    // setReviewStatus(null);
    setReason('');
  };

  return (
    <div className="container-fluid py-5 px-3">
      <div className="bg-white p-5 rounded shadow-sm border w-100">
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-3" style={{ color: '#F4B400' }}>
            Verify Presentation Submission
          </h2>
          <p className="text-dark mb-0">Open the following file for review:</p>
        </div>

        <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
          {presentationFile && (
            <button
              className="btn fw-semibold border-2" style={{ borderColor: '#F4B400', color: '#F4B400' }}
              onClick={() => handleOpenFile(presentationFile)}
            >
              Presentation File
            </button>
          )}

          {!presentationFile && (
            <p className="text-muted">No files submitted.</p>
          )}
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

export default VerifyPresentation;
