// 'use client';
// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Execution = () => {
//   const projectTypes = {
//     'Engineering Design': ['Developing Document', 'Testing Document', 'Modification Document'],
//     'Digital Product Development': ['Database Designing Document', 'Development Document', 'Testing Document', 'Modification Document'],
//     'Experimental Study / Non-Experimental Study / Qualitative Study': ['Data Collection Document', 'Data Analysis Document', 'Results & Discussion Document'],
//     'Other Studies': ['Coordinator Assigned Task Document'],
//   };

//   const [selectedType, setSelectedType] = useState('');
//   const [uploadedFiles, setUploadedFiles] = useState({});
//   const [fileNames, setFileNames] = useState({});
//   const [errorMessage, setErrorMessage] = useState('');

//   const mangoYellow = '#FFC324';  // Mango-yellow

//   const handleTypeChange = (e) => {
//     const value = e.target.value;
//     setSelectedType(value);
//     setUploadedFiles({});
//     setFileNames({});
//     setErrorMessage('');
//   };

//   const handleFileChange = (e, field) => {
//     const file = e.target.files[0];
//     setUploadedFiles((prev) => ({ ...prev, [field]: file }));
//     setFileNames((prev) => ({ ...prev, [field]: file?.name || '' }));
//   };

//   const handleRemoveFile = (field) => {
//     const newFiles = { ...uploadedFiles };
//     const newNames = { ...fileNames };
//     delete newFiles[field];
//     delete newNames[field];
//     setUploadedFiles(newFiles);
//     setFileNames(newNames);
//     document.getElementById(`${field}-upload`).value = '';
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const requiredDocs = projectTypes[selectedType] || [];
//     const allUploaded = requiredDocs.every(doc => uploadedFiles[doc]);

//     if (!selectedType) {
//       setErrorMessage('Please select a project type.');
//       return;
//     }

//     if (!allUploaded) {
//       setErrorMessage('Please upload all required documents.');
//       return;
//     }

//     setErrorMessage('');
//     alert(`Submitted files for ${selectedType}:\n${requiredDocs.map(f => `${f}: ${fileNames[f]}`).join('\n')}`);
//   };

//   const renderFileInput = (field) => (
//     <div className="mb-3" key={field}>
//       <label htmlFor={`${field}-upload`} className="form-label fw-semibold text-dark">
//         Upload {field} <span className="text-danger">(Required)</span>
//       </label>
//       <input
//         id={`${field}-upload`}
//         type="file"
//         accept=".pdf, .png, .jpg, .jpeg"
//         className="form-control"
//         onChange={(e) => handleFileChange(e, field)}
//       />
//       {fileNames[field] && (
//         <div className="alert alert-light border d-flex justify-content-between align-items-center mt-2">
//           <span className="text-success"><strong>Selected:</strong> {fileNames[field]}</span>
//           <button
//             type="button"
//             className="btn btn-outline-danger btn-sm"
//             onClick={() => handleRemoveFile(field)}
//           >
//             Remove
//           </button>
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="container-fluid py-5 px-3">
//       <div className="bg-white p-5 rounded shadow-sm border">
//         <div className="text-center mb-4">
//           <h2 className="fw-bold mb-3" style={{ color: mangoYellow }}>Stage 6: Execution</h2>
//           <p className="text-dark mb-0">
//             Based on your project category, upload the required documents for the execution phase. Please ensure all documents are clear and complete.
//           </p>
//         </div>

//         {errorMessage && (
//           <div className="alert alert-danger text-center mb-4">
//             {errorMessage}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="form-label fw-semibold text-dark">Select Project Type <span className="text-danger">*</span></label>
//             <select className="form-select" value={selectedType} onChange={handleTypeChange}>
//               <option value="">-- Select --</option>
//               {Object.keys(projectTypes).map((type) => (
//                 <option key={type} value={type}>{type}</option>
//               ))}
//             </select>
//           </div>

//           {selectedType &&
//             projectTypes[selectedType].map((doc) => renderFileInput(doc))
//           }

//           <button
//             type="submit"
//             className="btn w-100 fw-bold text-black"
//             style={{ backgroundColor: mangoYellow }}
//           >
//             Submit Documents
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Execution;



'use client';
import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

const Execution = () => {
  const projectTypes = {
    'Engineering Design': ['Developing Document', 'Testing Document', 'Modification Document'],
    'Digital Product Development': ['Database Designing Document', 'Development Document', 'Testing Document', 'Modification Document'],
    'Experimental Study / Non-Experimental Study / Qualitative Study': ['Data Collection Document', 'Data Analysis Document', 'Results & Discussion Document'],
    'Other Studies': ['Coordinator Assigned Task Document'],
  };

  const [selectedType, setSelectedType] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [fileNames, setFileNames] = useState({});
  const [errorMessage, setErrorMessage] = useState('');


  const handleTypeChange = (e) => {
    const value = e.target.value;
    setSelectedType(value);
    setUploadedFiles({});
    setFileNames({});
    setErrorMessage('');
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    setUploadedFiles((prev) => ({ ...prev, [field]: file }));
    setFileNames((prev) => ({ ...prev, [field]: file?.name || '' }));
  };

  const handleRemoveFile = (field) => {
    const newFiles = { ...uploadedFiles };
    const newNames = { ...fileNames };
    delete newFiles[field];
    delete newNames[field];
    setUploadedFiles(newFiles);
    setFileNames(newNames);
    document.getElementById(`${field}-upload`).value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredDocs = projectTypes[selectedType] || [];
    const allUploaded = requiredDocs.every(doc => uploadedFiles[doc]);

    if (!selectedType) {
      setErrorMessage('Please select a project type.');
      return;
    }

    if (!allUploaded) {
      setErrorMessage('Please upload all required documents.');
      return;
    }

    setErrorMessage('');
    alert(`Submitted files for ${selectedType}:\n${requiredDocs.map(f => `${f}: ${fileNames[f]}`).join('\n')}`);
  };

  const renderFileInput = (field) => (
    <div className="mb-3" key={field}>
      <label htmlFor={`${field}-upload`} className="form-label fw-semibold text-dark">
        Upload {field} <span className="text-danger">(Required)</span>
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
      <div className="bg-white p-5 rounded shadow-sm border">
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-3" style={{ color: '#F4B400' }}>Stage 6: Execution</h2>
          <p className="text-dark mb-0">
            Based on your project category, upload the required documents for the execution phase. Please ensure all documents are clear and complete.
          </p>
        </div>

        {errorMessage && (
          <div className="alert alert-danger text-center mb-4">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label fw-semibold text-dark">Select Project Type <span className="text-danger">*</span></label>
            <select className="form-select" value={selectedType} onChange={handleTypeChange}>
              <option value="">-- Select --</option>
              {Object.keys(projectTypes).map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {selectedType &&
            projectTypes[selectedType].map((doc) => renderFileInput(doc))
          }

          <button
            type="submit"
            className="btn w-100 fw-bold text-white"
            style={{
              backgroundColor: '#F4B400',
              color: 'white'
            }}
          >
            Submit Documents
          </button>
        </form>
      </div>
    </div>
  );
};

export default Execution;
