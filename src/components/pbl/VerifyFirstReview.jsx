'use client';
import React, { useEffect, useState } from 'react';
import { get_data, update } from '@/api/methods';
import { set } from 'lodash';
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const VerifyFirstReview = ({ projectId }) => {
  const [presentationFile, setPresentationFile] = useState('');
  const [supportingFiles, setSupportingFiles] = useState([]);

  // Track review status: 'accepted', 'rework', or null
  const [reviewStatus, setReviewStatus] = useState(null);
  const [reworkReason, setReworkReason] = useState('');
  const [categories, setCategories] = useState([]);
  const [showAcceptModel, setShowAcceptModel] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');


  useEffect(() => {
    const fetchPresentaion = async () => {
      console.log("the project is", projectId)

      get_data("First Review", ["presentation"], [["parent", "=", projectId]]).then((data) => {
        console.log("the data is", data)
        console.log("the message is", data?.[0])
        const fileData = data?.[0] || {}; // safely access first item

        setPresentationFile(fileData.presentation || '');
      });

    };

    fetchPresentaion();
  }, []);


  useEffect(() => {
    const fetchCategories = async () => {
      const res = await get_data("Project Category", ["title", "name"], "{}");

      if (!res.error) {
        setCategories(res);
      } else {
        console.error("Error fetching categories:", res.error);
      }
    };

    fetchCategories();
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
    setReviewStatus('Approved');
    setReworkReason('');
    const form = {
      "first_review": [
        {
          "presentation": presentationFile,
          "status": "Approved",
          "remark": "Presentation file is approved.",
        }
      ],
      "project_category": selectedCategory

    }
    alert('Review accepted.');
    console.log("the form is", form)


    const result = await update("Project", projectId, form);
    console.log("the result is", result)
  };

  const handleRework = () => {
    setReviewStatus('rework');
  };

  const handleCancelRework = () => {
    setReviewStatus(null);
    setReworkReason('');
  };

  const handleSubmitRework = async () => {
    if (!reworkReason.trim()) {
      alert('Please provide a reason before submitting.');
      return;
    }

    const form = {
      "first_review": [
        {
          "presentation": presentationFile,
          "status": "Rework",
          "remark": reworkReason,
        }
      ]

    }



    // Simulate rework submission
    alert(`Rework submitted: ${reworkReason}`);
    console.log("the form is", form)


    const result = await update("Project", projectId, form);
    console.log("the result is", result)

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

            {/* {supportingFiles.length > 0 &&
              supportingFiles.map((file, index) => (
                <button
                  key={index}
                  className="btn btn-outline-secondary fw-bold"
                  onClick={() => handleOpenFile(file.url)}
                >
                  {file.name}
                </button>
              ))} */}

            {!presentationFile && supportingFiles.length === 0 && (
              <p className="text-muted">No files submitted.</p>
            )}
          </div>
        </div>

        {/* Accept and Rework buttons */}
        <div className="d-flex justify-content-center gap-3 mb-3">
          <button
            className="btn btn-success fw-bold"
            onClick={(e) => { setShowAcceptModel(true); e.preventDefault(); }}
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
      {showAcceptModel && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Select a Project Category</h5>
                <button className="btn-close" onClick={() => setShowAcceptModel(false)}></button>
              </div>
              <div className="modal-body">
                {/* <label className="form-label">Remarks</label> */}
                {/* <textarea className="form-control" value={remarks} onChange={(e) => setRemarks(e.target.value)} /> */}
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Select a category:</label>
                  <select
                    id="category"
                    className="form-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-warning" onClick={handleAccept}>Submit</button>
                <button className="btn btn-secondary" onClick={() => setShowAcceptModel(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default VerifyFirstReview;           
