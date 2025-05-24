'use client';
import React, { useState, useEffect, use } from 'react';
import { get_data, update } from '@/api/methods';
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


const projectOptions = {
  "Engineering_Design": [
    'literature_review',
    'design_chart',
    'requirements',
    'gantt_chart',
  ],
  "Digital_Product_Development": [
    'literature_review',
    'requirements',
    'system_design',
    'gantt_chart',
  ],
  "Experimental_Study": ['literature_review', 'methodology', 'gantt_chart'],
  "Nonexperimental_Study": ['literature_review', 'methodology', 'gantt_chart'],
  "Qualitative_Study": ['literature_review', 'methodology', 'gantt_chart'],
  "Others": ['literature_review', 'methodology', 'gantt_chart'],
};
const doctypes = {
  "Engineering_Design": "Engineering Design",
  "Digital_Product_Development": "Digital Product Development",

  "Experimental_Study": "Common Project Type",
  "Nonexperimental_Study": "Common Project Type",
  "Qualitative_Study": "Common Project Type",
  "Others": "Common Project Type"
}

const projectCategories = {
  "Engineering Design": "Engineering_Design",
  "Digital Product Development": "Digital_Product_Development",
  "Experimental Study": "Experimental_Study",
  "Non Experimental Study": "Nonexperimental_Study",
  "Qualitative Study": "Qualitative_Study",
  "Others": "Others"
};

const VerificationComponent = ({ projectId }) => {
  const [selectedType, setSelectedType] = useState('');
  const [action, setAction] = useState('');
  const [reason, setReason] = useState('');
  const [files, setFiles] = useState({});

  useEffect(() => {
    get_data("Project", ["project_category_name"], [["name", "=", projectId]]).then((data) => {
      setSelectedType(projectCategories[data[0]?.project_category_name] || '');
      console.log(data[0])
      console.log(data[1])

    });

  }, []);



  useEffect(() => {
    const fetchCategories = async () => {
      const res = await get_data(doctypes[selectedType], projectOptions[selectedType], [["parent", "=", projectId]]);
      console.log("the data is", res)

      if (!res.error) {
        setFiles(res[0]);
      } else {
        console.error("Error fetching categories:", res.error);
      }
    };

    fetchCategories();
  }, [selectedType]);


  useEffect(() => {
    console.log("the files are", files)

  }, [files])

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setAction('');
    setReason('');
  };

  const handleApprove = async () => {
    if (action === 'rework' && !reason.trim()) {
      alert('Please provide a reason for rework.');
      return;
    }
    console.log('Review submitted:', { selectedType, action, reason });
    // Add submission logic here


    const form = {
      [selectedType.toLocaleLowerCase()]: [
        {
          ...files,
          status: 'Approved',
          remark: "Approved"
        }
      ]


    }
    console.log("the form is", form)

    const result = await update("Project", projectId, form);
    console.log("the result is", result)
    alert("Approved")
  };


  const handleRework = async () => {
    if (!reason.trim()) {
      alert('Please provide a reason before submitting.');
      return;
    }

    const form = {
      [selectedType.toLocaleLowerCase()]: [
        {
          ...files,
          status: 'Rework',
          remark: reason
        }
      ]


    }
    console.log("the form is", form)



    // Simulate rework submission
    alert(`Rework submitted: ${reason}`);
    console.log("the form is", form)


    const result = await update("Project", projectId, form);
    console.log("the result is", result)

    // Reset state after submission
    // setReviewStatus(null);
    setReason('');
  };


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

  return (
    <div className="container-fluid py-5 px-3">
      <div className="bg-white p-5 rounded shadow-sm border w-100">
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-3" style={{ color: '#F4B400' }}>
            Verify Planning Phase Submissions
          </h2>
          <p className="text-dark mb-0">
            Open each of the following files for review:
          </p>
        </div>

        {/* Project Type Dropdown */}
        {/* <div className="mb-4">
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
        </div> */}

        {/* Files */}
        {selectedType && (
          <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
            {/* {projectOptions[selectedType].map((file, idx) => (
              <button
                key={idx}
                className={`btn border ${idx === 0 ? 'btn-warning text-white' : 'btn-outline-dark'
                  }`}
              >
                {file.toUpperCase()}
                onClick={handleOpenFile(files[file])}
              </button>
            ))} */}
            {/* {files && files.map((file, idx) => (
              <button
                key={idx}
                className={`btn border ${idx === 0 ? 'btn-warning text-white' : 'btn-outline-dark'
                  }`}
              >
                {file.toUpperCase()}
              </button>
            ))} */}

            {files && Object.keys(files).map((file, idx) => (
              <button
                key={idx}
                className={`btn border ${idx === 0 ? 'btn-warning text-white' : 'btn-outline-dark'}`}
                onClick={() => handleOpenFile(files[file])}
              >
                {file.replace(/_/g, ' ').toUpperCase()}
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
              handleApprove();
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
              onClick={handleRework}
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
