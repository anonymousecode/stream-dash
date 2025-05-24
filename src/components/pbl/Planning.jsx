'use client';
import React, { useState, useEffect } from 'react';
import { uploadFile, update, get_data } from '@/api/methods';


const projectOptions = {
  "engineering_design": [
    "literature_review",
    "design_chart",
    "requirements",
    "gantt_chart",
  ],
  "digital_product_development": [
    "literature_review",
    "gathering_requirements",
    "system_design",
    "gantt_chart",
  ],
  "experimental_study": ["literature_review", "methodology", "gantt_chart"],
  "nonexperimental_study": ["literature_review", "methodology", "gantt_chart"],
  "qualitative_study": ["literature_review", "methodology", "gantt_chart"],
  "others": ["literature_review", "methodology", "gantt_chart"],
};

const doctypes = {
  "engineering_design": "Engineering Design",
  "digital_product_development": "Digital Product Development",
  "experimental_study": "Common Project Type",
  "nonexperimental_study": "Common Project Type",
  "qualitative_study": "Common Project Type",
  "others": "Common Project Type"
};

const projectCategories = {
  "Engineering Design": "engineering_design",
  "Digital Product Development": "digital_product_development",
  "Experimental Study": "experimental_study",
  "Non Experimental Study": "nonexperimental_study",
  "Qualitative Study": "qualitative_study",
  "Others": "others"
};





// const projectOptions = {
//   "engineering_design": [
//     "Literature Review",
//     "Design / Concept / Flowchart",
//     "Gathering Requirements",
//     "Gantt Chart",
//   ],
//   "Digital Product Development": [
//     "Literature Review",
//     "Gathering Requirements",
//     "System Design",
//     "Gantt Chart",
//   ],
//   "Experimental Study": ["Literature Review", "Methodology", "Gantt Chart"],
//   "Non-Experimental Study": ["Literature Review", "Methodology", "Gantt Chart"],
//   "Qualitative Study": ["Literature Review", "Methodology", "Gantt Chart"],
//   "Others": ["Literature Review", "Methodology", "Gantt Chart"],
// };


const PlanningPhase = ({ projectId }) => {
  const [selectedProject, setSelectedProject] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [fileNames, setFileNames] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState({})

  const [showReworkModel, setShowReworkModel] = useState(false);
  const [reworkReason, setReworkReason] = useState('');

  useEffect(() => {
    get_data("Project", ["project_category_name"], [["name", "=", projectId]]).then((data) => {
      setSelectedProject(projectCategories[data[0]?.project_category_name] || '');
      console.log(data[0])
      console.log(data[1])

    });

  }, []);

  useEffect(() => {
    const fetchSubmittedWorksheets = async () => {
      console.log("the project is", projectId)

      get_data(doctypes[selectedProject], ["status", "remark"], [["parent", "=", projectId]]).then((data) => {
        console.log("the data is", data)
        if (data?.[0]?.status === "Rework") {
          setShowReworkModel(true);
          setReworkReason(data?.[0]?.remark || '');
        }

      });

    };

    fetchSubmittedWorksheets();
  }, [selectedProject]);

  const handleProjectChange = (e) => {
    const selected = e.target.value;
    setSelectedProject(selected);
    setUploadedFiles({});
    setFileNames({});
    setErrorMessage('');
  };

  const handleFileChange = async (e, field) => {
    const file = e.target.files[0];
    const uploded = await uploadFile(file);
    setForm((prev) => ({ ...prev, [field]: uploded }));
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
    // uploadedFiles.map((file) => {
    //   console.log(file);
    // });


    // const uploadedResults = {};

    // for (const [section, file] of Object.entries(uploadedFiles)) {
    //   const uploadedUrl = await uploadFile(file);
    //   uploadedResults[section] = uploadedUrl;
    // }

    // const entries = await Promise.all(
    //   Object.entries(uploadedFiles).map(async ([section, file]) => {
    //     const uploadedUrl = await uploadFile(file);
    //     return [section, uploadedUrl];
    //   })
    // );

    // const uploadedResults = Object.fromEntries(entries);
    // console.log(uploadedResults);

    ;


    e.preventDefault();
    if (!selectedProject) {
      setErrorMessage('Please select a project type first.');
      return;
    }

    const requiredFields = projectOptions[selectedProject];
    const missing = requiredFields.filter((field) => !uploadedFiles[field]);

    if (missing.length > 0) {
      setErrorMessage(`Please upload all required files: ${missing.join(', ')}`);
      return;
    }

    setErrorMessage('');
    alert(`Submitted files:\n${requiredFields.map(f => `${f}: ${fileNames[f]}`).join('\n')}`);


    const formData = { [selectedProject]: [form] }


    console.log(formData)
    const result = await update("Project", projectId, formData);
    console.log(result);
  };

  const renderFileInputs = () => {
    if (!selectedProject) return null;
    const fields = projectOptions[selectedProject];

    return fields.map((field) => (
      <div className="mb-4" key={field}>
        <label htmlFor={`${field}-upload`} className="form-label text-dark fw-semibold">
          Upload {field.replace(/_/g, ' ').toUpperCase()} <span className="text-muted">(PDF/Image)</span>
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
    ));
  };

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
          <h2 className="fw-bold mb-3" style={{ color: '#F4B400' }}>Stage 4: Planning</h2>
          <p className="text-dark mb-0">
            In this phase, your team will develop a comprehensive plan to execute your selected project.
            This includes defining the project approach, identifying required resources, designing systems or methodologies,
            and preparing a timeline for implementation. Select your project type and upload all the necessary planning
            documents that demonstrate how your project will be executed effectively.
          </p>
        </div>

        {/* Project Type Selector */}
        {/* <div className="mb-4">
          <label htmlFor="projectType" className="form-label text-dark fw-semibold">
            Select Project Type
          </label>
          <select
            id="projectType"
            className="form-select"
            value={selectedProject}
            onChange={handleProjectChange}
          >
            <option value="">-- Select --</option>
            {Object.keys(projectOptions).map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div> */}

        {/* Error Message */}
        {errorMessage && (
          <div className="alert alert-danger text-center mb-4">
            {errorMessage}
          </div>
        )}

        {/* Upload Form */}
        {selectedProject && (
          <>

            <h5 className="fw-semibold text-dark mb-3 text-center">The Project Category is <b>{selectedProject.replace(/_/g, ' ').toUpperCase()}</b> and Upload Required Documents</h5>
            <form onSubmit={handleSubmit}>
              {renderFileInputs()}
              <button
                type="submit"
                className="btn btn-warning text-white fw-bold w-100"
              >
                Submit Files
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default PlanningPhase;
