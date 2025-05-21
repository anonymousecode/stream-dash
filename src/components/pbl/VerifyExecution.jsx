// // 'use client';
// // import React, { useState } from 'react';

// // const VerifyExecution = () => {
// //   const projectTypes = {
// //     'Engineering Design': ['Developing Document', 'Testing Document', 'Modification Document'],
// //     'Digital Product Development': ['Database Designing Document', 'Development Document', 'Testing Document', 'Modification Document'],
// //     'Experimental Study / Non-Experimental Study / Qualitative Study': ['Data Collection Document', 'Data Analysis Document', 'Results & Discussion Document'],
// //     'Other Studies': ['Coordinator Assigned Task Document'],
// //   };

// //   const [selectedType, setSelectedType] = useState('');
// //   const [feedback, setFeedback] = useState({});
// //   const [errorMessage, setErrorMessage] = useState('');
// //   const [submitted, setSubmitted] = useState(false);

// //   // Dummy uploaded files for preview (replace with actual data from API)
// //   const uploadedFiles = {
// //     'Developing Document': 'dev_doc.pdf',
// //     'Testing Document': 'test_report.pdf',
// //     'Modification Document': 'modifications.pdf',
// //     'Database Designing Document': 'db_design.pdf',
// //     'Development Document': 'development_notes.pdf',
// //     'Data Collection Document': 'data_collection.pdf',
// //     'Data Analysis Document': 'analysis.pdf',
// //     'Results & Discussion Document': 'results_discussion.pdf',
// //     'Coordinator Assigned Task Document': 'task_file.pdf'
// //   };

// //   const handleTypeChange = (e) => {
// //     setSelectedType(e.target.value);
// //     setFeedback({});
// //     setErrorMessage('');
// //     setSubmitted(false);
// //   };

// //   const handleFeedbackChange = (field, value) => {
// //     setFeedback(prev => ({ ...prev, [field]: value }));
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     const requiredDocs = projectTypes[selectedType] || [];
// //     const allMarked = requiredDocs.every(doc => feedback[doc]);

// //     if (!selectedType) {
// //       setErrorMessage('Please select a project type.');
// //       return;
// //     }

// //     if (!allMarked) {
// //       setErrorMessage('Please provide feedback for all uploaded documents.');
// //       return;
// //     }

// //     setErrorMessage('');
// //     setSubmitted(true);
// //   };

// //   const renderVerificationRow = (docName) => (
// //     <div className="mb-3" key={docName}>
// //       <label className="form-label fw-semibold text-dark">
// //         {docName}
// //       </label>
// //       <div className="d-flex justify-content-between align-items-center mb-2">
// //         <a href={`#`} className="btn btn-outline-primary btn-sm" target="_blank" rel="noopener noreferrer">
// //           View {uploadedFiles[docName] || 'Document'}
// //         </a>
// //         <div className="btn-group" role="group">
// //           <button
// //             type="button"
// //             className={`btn btn-sm ${feedback[docName] === 'Accepted' ? 'btn-success' : 'btn-outline-success'}`}
// //             onClick={() => handleFeedbackChange(docName, 'Accepted')}
// //           >
// //             Accept
// //           </button>
// //           <button
// //             type="button"
// //             className={`btn btn-sm ${feedback[docName] === 'Needs Rework' ? 'btn-danger' : 'btn-outline-danger'}`}
// //             onClick={() => handleFeedbackChange(docName, 'Needs Rework')}
// //           >
// //             Rework
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   return (
// //     <div className="container-fluid py-5 px-3">
// //       <div className="bg-white p-5 rounded shadow-sm border">
// //         <div className="text-center mb-4">
// //           <h2 className="fw-bold mb-3 text-warning">Verify Execution Documents</h2>
// //           <p className="text-dark mb-0">
// //             Please review the uploaded execution documents for the selected project type and provide your feedback.
// //           </p>
// //         </div>

// //         {errorMessage && (
// //           <div className="alert alert-danger text-center mb-4">
// //             {errorMessage}
// //           </div>
// //         )}

// //         {submitted && (
// //           <div className="alert alert-success text-center mb-4">
// //             Feedback submitted successfully!
// //           </div>
// //         )}

// //         <form onSubmit={handleSubmit}>
// //           <div className="mb-4">
// //             <label className="form-label fw-semibold text-dark">
// //               Select Project Type <span className="text-danger">*</span>
// //             </label>
// //             <select className="form-select" value={selectedType} onChange={handleTypeChange}>
// //               <option value="">-- Select --</option>
// //               {Object.keys(projectTypes).map(type => (
// //                 <option key={type} value={type}>{type}</option>
// //               ))}
// //             </select>
// //           </div>

// //           {selectedType &&
// //             projectTypes[selectedType].map(doc => renderVerificationRow(doc))
// //           }

// //           <button
// //             type="submit"
// //             className="btn w-100 fw-bold text-white"
// //             style={{ backgroundColor: '#F4B400' }}
// //           >
// //             Submit Feedback
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default VerifyExecution;


// 'use client';
// import React, { useState, useEffect } from 'react';

// const VerifyExecution = () => {
//   const [documents, setDocuments] = useState([]);
//   const [reviewStatus, setReviewStatus] = useState(null);
//   const [reworkReason, setReworkReason] = useState('');

//   useEffect(() => {
//     // Simulated fetched data
//     const uploadedDocs = [
//       { name: 'Developing Document', url: 'https://example.com/files/dev_doc.pdf' },
//       { name: 'Testing Document', url: 'https://example.com/files/test_report.pdf' },
//       { name: 'Modification Document', url: 'https://example.com/files/modifications.pdf' },
//     ];
//     setDocuments(uploadedDocs);
//   }, []);

//   const handleOpenFile = (url) => {
//     if (!url) {
//       alert('File not available.');
//       return;
//     }
//     window.open(url, '_blank', 'noopener,noreferrer');
//   };

//   const handleAccept = () => {
//     setReviewStatus('accepted');
//     setReworkReason('');
//     alert('Review accepted.');
//   };

//   const handleRework = () => {
//     setReviewStatus('rework');
//   };

//   const handleCancelRework = () => {
//     setReviewStatus(null);
//     setReworkReason('');
//   };

//   const handleSubmitRework = () => {
//     if (!reworkReason.trim()) {
//       alert('Please provide a reason before submitting.');
//       return;
//     }

//     alert(`Rework submitted: ${reworkReason}`);
//     setReviewStatus(null);
//     setReworkReason('');
//   };

//   return (
//     <div className="container-fluid py-5 px-3">
//       <div className="bg-white p-5 rounded shadow-sm border w-100">
//         <h2 className="text-center fw-bold mb-4" style={{ color: '#F4B400' }}>
//           Verify Execution Documents
//         </h2>

//         <div className="mb-4 text-center">
//   <p className="mb-3">Open each of the following files for review:</p>
//   <div className="d-flex flex-wrap justify-content-center gap-3">
//     {documents.length > 0 ? (
//       documents.map((doc, index) => {
//         // Apply yellow style for "Presentation File", default gray otherwise
//         const isPresentation = doc.name.toLowerCase().includes('presentation');
//         const buttonClass = isPresentation ? 'custom-btn-yellow' : 'custom-btn-gray';

//         return (
//           <button
//             key={index}
//             className={buttonClass}
//             onClick={() => handleOpenFile(doc.url)}
//           >
//             {doc.name.toUpperCase()}
//           </button>
//         );
//       })
//     ) : (
//       <p className="text-muted">No files submitted.</p>
//     )}
//   </div>
// </div>
//         <div className="d-flex justify-content-center gap-3 mb-3">
//           <button className="btn btn-success fw-bold" onClick={handleAccept}>
//             ACCEPT
//           </button>
//           <button className="btn btn-danger fw-bold" onClick={handleRework}>
//             REQUEST REWORK
//           </button>
//         </div>

//         {reviewStatus === 'rework' && (
//           <div className="mb-3">
//             <label htmlFor="reworkReason" className="form-label fw-bold">
//               Provide reason for rework:
//             </label>
//             <textarea
//               id="reworkReason"
//               className="form-control"
//               rows={4}
//               value={reworkReason}
//               onChange={(e) => setReworkReason(e.target.value)}
//               placeholder="Enter reason here..."
//               required
//             />

//             <div className="d-flex justify-content-end gap-2 mt-3">
//               <button className="btn btn-secondary" onClick={handleCancelRework}>
//                 Cancel
//               </button>
//               <button className="btn btn-primary" onClick={handleSubmitRework}>
//                 Submit Review
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VerifyExecution;

'use client';
import React, { useState, useEffect } from 'react';

const VerifyExecution = () => {
  const [documents, setDocuments] = useState([]);
  const [activeDoc, setActiveDoc] = useState(null);
  const [reviewStatus, setReviewStatus] = useState(null);
  const [reworkReason, setReworkReason] = useState('');

  useEffect(() => {
    const uploadedDocs = [
      { name: 'Developing Document', url: 'https://example.com/files/dev_doc.pdf' },
      { name: 'Testing Document', url: 'https://example.com/files/test_report.pdf' },
      { name: 'Modification Document', url: 'https://example.com/files/modifications.pdf' },
    ];
    setDocuments(uploadedDocs);
    setActiveDoc(uploadedDocs[0]?.name);
  }, []);

  const handleOpenFile = (name, url) => {
    if (!url) {
      alert('File not available.');
      return;
    }
    setActiveDoc(name);
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
    alert(`Rework submitted: ${reworkReason}`);
    setReviewStatus(null);
    setReworkReason('');
  };

  return (
    <div className="container-fluid py-5 px-3">
      <div className="bg-white p-5 rounded shadow-sm border w-100">
        <h2 className="text-center fw-bold mb-4" style={{ color: '#F4B400' }}>
          Verify Execution Documents
        </h2>

        <div className="mb-4 text-center">
          <p className="mb-3">Open each of the following files for review:</p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {documents.length > 0 ? (
              documents.map((doc, index) => (
                <button
                  key={index}
                  className={`btn fw-semibold border-2 ${
                    activeDoc === doc.name ? 'text-white' : 'text-dark'
                  }`}
                  style={{
                    backgroundColor: activeDoc === doc.name ? '#F4B400' : 'transparent',
                    borderColor: '#F4B400'
                  }}
                  onClick={() => handleOpenFile(doc.name, doc.url)}
                >
                  {doc.name.toUpperCase()}
                </button>
              ))
            ) : (
              <p className="text-muted">No files submitted.</p>
            )}
          </div>
        </div>

        <div className="d-flex justify-content-center gap-3 mb-3">
          <button className="btn btn-success fw-bold" onClick={handleAccept}>
            ACCEPT
          </button>
          <button className="btn btn-danger fw-bold" onClick={handleRework}>
            REQUEST REWORK
          </button>
        </div>

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
              <button
                className="btn fw-bold text-white"
                style={{ backgroundColor: '#F4B400' }}
                onClick={handleSubmitRework}
              >
                Submit Review
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyExecution;