'use client'; 
import React, { useState } from 'react'; 
 
const FirstReview = () => { 
  const [presentationFile, setPresentationFile] = useState(null); 
  const [supportingFiles, setSupportingFiles] = useState([]); 
  const [errorMessage, setErrorMessage] = useState(''); 
 
  const handlePresentationChange = (e) => { 
    const file = e.target.files[0]; 
    setPresentationFile(file || null); 
  }; 
 
  const handleSupportingChange = (e) => { 
    const newFiles = Array.from(e.target.files); 
 
    // Avoid duplicates 
    const existingNames = supportingFiles.map(file => file.name); 
    const filteredNewFiles = newFiles.filter(file => 
!existingNames.includes(file.name)); 
 
    setSupportingFiles([...supportingFiles, ...filteredNewFiles]); 
 
    // Reset input value to allow uploading same file again later if 
removed 
    document.getElementById('supportingUpload').value = ''; 
  }; 
 
  const handleRemovePresentation = () => { 
    setPresentationFile(null); 
    document.getElementById('presentationUpload').value = ''; 
  }; 
 
  const handleRemoveSupporting = (index) => { 
    const updatedFiles = [...supportingFiles]; 
    updatedFiles.splice(index, 1); 
    setSupportingFiles(updatedFiles); 
  }; 
 
  const handleSubmit = (e) => { 
    e.preventDefault(); 
    if (!presentationFile && supportingFiles.length === 0) { 
      setErrorMessage('Please upload at least one file: Presentation or Supporting Document(s).'); 
      return; 
    } 
 
    setErrorMessage(''); 
    alert(`Submitted: Presentation File: ${presentationFile ? presentationFile.name : 'None'} 
      Supporting Documents: ${supportingFiles.map(f => f.name).join(', ') || 'None'} 
    `); 
  }; 
 
  return ( 
    <div className="container py-5"> 
      <div className="row justify-content-center"> 
        <div className="col-12"> 
          <div className="bg-white p-5 rounded shadow-sm border"> 
            {/* Title and Description */} 
            <div className="text-center mb-4"> 
              <h2 className="fw-bold mb-3" style={{ color: '#F4B400' 
}}>Stage 3: First Review</h2> 
              <p className="text-dark mb-0"> 
                In this stage, please submit your presentation and any 
supporting documents required for the First Review. You can upload your 
final presentation file and additional materials (like reports, 
references, or appendices) that support your project. 
              </p> 
            </div> 
 
            {/* Error Message */} 
            {errorMessage && ( 
              <div className="alert alert-danger text-center mb-4"> 
                {errorMessage} 
              </div> 
            )} 
 
            {/* Upload Form */} 
            <form onSubmit={handleSubmit}> 
              {/* Presentation Upload */} 
              <div className="mb-4"> 
                <label htmlFor="presentationUpload" 
className="form-label text-dark fw-semibold"> 
                  Upload Presentation File <span 
className="text-muted">(PDF/PPT)</span> 
                </label> 
                <input 
                  id="presentationUpload" 
                  type="file" 
                  accept=".pdf, .ppt, .pptx" 
                  className="form-control" 
                  onChange={handlePresentationChange} 
                /> 
                <div className="mt-2 small text-dark"> 
                  <strong>Selected:</strong>{' '} 
                  {presentationFile ? presentationFile.name : <span 
className="text-muted">No file chosen</span>} 
                </div> 
                {presentationFile && ( 
                  <button 
                    type="button" 
                    className="btn btn-outline-danger btn-sm mt-2" 
                    onClick={handleRemovePresentation} 
                  > 
                    Remove Presentation 
                  </button> 
                )} 
              </div> 
 
              {/* Supporting Documents Upload */} 
              <div className="mb-4"> 
                <label htmlFor="supportingUpload" className="form-label 
text-dark fw-semibold"> 
                  Upload Supporting Documents <span 
className="text-muted">(PDF/Images, Multiple Allowed)</span> 
                </label> 
                <input 
                  id="supportingUpload" 
                  type="file" 
                  accept=".pdf, .png, .jpg, .jpeg" 
                  className="form-control" 
                  multiple 
                  onChange={handleSupportingChange} 
                /> 
                <div className="mt-2 small text-dark"> 
                  <strong>Selected:</strong>{' '} 
                  {supportingFiles.length > 0 ? ( 
                    supportingFiles.map(file => file.name).join(', ') 
                  ) : ( 
                    <span className="text-muted">No files chosen</span> 
                  )} 
                </div> 
                {supportingFiles.length > 0 && ( 
                  <div className="mt-2"> 
                    {supportingFiles.map((file, index) => ( 
                      <div key={index} className="d-flex 
justify-content-between align-items-center border rounded p-2 mb-2"> 
                        <span className="small 
text-success">{file.name}</span> 
                        <button 
                          type="button" 
                          className="btn btn-outline-danger btn-sm" 
                          onClick={() => handleRemoveSupporting(index)} 
                        > 
                          Remove 
                        </button> 
                      </div> 
                    ))} 
                  </div> 
                )} 
              </div> 
 
              <button 
                type="submit" 
                className="btn text-white fw-bold w-100" 
                style={{ backgroundColor: '#F4B400' }} 
              > 
                Submit Files 
              </button> 
            </form> 
          </div> 
        </div> 
      </div> 
    </div> 
  ); 
}; 
 
export default FirstReview; 