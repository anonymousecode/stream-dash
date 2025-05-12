'use client'; 
import React, { useState, useEffect } from 'react'; 
 
const IdeaDevelopment = () => { 
  const [worksheetUrls, setWorksheetUrls] = useState({ 
    brainstorm: '', 
    concept: '', 
    outline: '' 
  }); 
  const [brainstormFile, setBrainstormFile] = useState(null); 
  const [conceptFile, setConceptFile] = useState(null); 
  const [outlineFile, setOutlineFile] = useState(null); 
 
  const [brainstormFileName, setBrainstormFileName] = useState(''); 
  const [conceptFileName, setConceptFileName] = useState(''); 
  const [outlineFileName, setOutlineFileName] = useState(''); 
 
  const [errorMessage, setErrorMessage] = useState(''); 
 
  useEffect(() => { 
    const fetchWorksheets = async () => { 
      try { 
        const res = await fetch('/api/idea-development-worksheets'); 
        const data = await res.json(); 
 
        setWorksheetUrls({ 
          brainstorm: data.brainstormWorksheetUrl || '', 
          concept: data.conceptWorksheetUrl || '', 
          outline: data.outlineWorksheetUrl || '' 
        }); 
      } catch (err) { 
        console.error('Failed to load worksheet URLs', err); 
      } 
    }; 
 
    fetchWorksheets(); 
  }, []); 
 
  const handleDownload = (url) => { 
    if (!url) { 
      alert('No worksheet available for this section.'); 
      return; 
    } 
    const link = document.createElement('a'); 
    link.href = url; 
    link.target = '_blank'; 
    link.rel = 'noopener noreferrer'; 
    link.click(); 
  }; 
 
  const handleFileChange = (e, type) => { 
    const file = e.target.files[0]; 
    if (type === 'brainstorm') { 
      setBrainstormFile(file); 
      setBrainstormFileName(file?.name || ''); 
    } else if (type === 'concept') { 
      setConceptFile(file); 
      setConceptFileName(file?.name || ''); 
    } else if (type === 'outline') { 
      setOutlineFile(file); 
      setOutlineFileName(file?.name || ''); 
    } 
  }; 
 
  const handleRemoveFile = (type) => { 
    if (type === 'brainstorm') { 
      setBrainstormFile(null); 
      setBrainstormFileName(''); 
      document.getElementById('brainstormUpload').value = ''; 
    } else if (type === 'concept') { 
      setConceptFile(null); 
      setConceptFileName(''); 
      document.getElementById('conceptUpload').value = ''; 
    } else if (type === 'outline') { 
      setOutlineFile(null); 
      setOutlineFileName(''); 
      document.getElementById('outlineUpload').value = ''; 
    } 
  }; 
 
  const handleSubmit = (e) => { 
    e.preventDefault(); 
 
    if (!brainstormFile || !conceptFile || !outlineFile) { 
      setErrorMessage('Please upload all three files: Brainstorming Map, Concept Map, and Project Outline.'); 
      return; 
    } 
 
    setErrorMessage(''); 
    alert(`Submitted: 
      Brainstorming Map: ${brainstormFileName} 
      Concept Map: ${conceptFileName} 
      Project Outline: ${outlineFileName}`); 
  }; 
 
  return ( 
    <div className="container-fluid py-5 px-3"> 
      <div className="bg-white p-5 rounded shadow-sm border w-100"> 
        {/* Title and Phase Description */} 
        <div className="text-center mb-4"> 
          <h2 className="fw-bold mb-3" style={{ color: '#F4B400' 
}}>Stage 2: Idea Development</h2> 
          <p className="text-dark mb-0"> 
            In this phase, your team will ideate solutions for the 
problem at hand. This is a critical stage where you’ll explore creative 
ways to address the challenges you’ve identified. The phase consists of 
three key steps: 
          </p> 
          <ul className="text-start mt-3 mb-3"> 
            <li><strong>Brainstorming:</strong> Generating ideas and 
potential directions for the project.</li> 
            <li><strong>Mind Mapping:</strong> Visualizing your ideas 
and concepts to explore connections and structure.</li> 
            <li><strong>Project Outline:</strong> Drafting a detailed 
plan for the project, including goals, timelines, and 
deliverables.</li> 
          </ul> 
          <p className="text-dark"> 
            For each of these steps, we provide worksheets to guide 
your progress. Please make sure to download and complete them before 
uploading the final versions. 
          </p> 
        </div> 
 
        {/* Worksheet Download Section */} 
        <div className="mb-4"> 
          <h5 className="fw-semibold text-dark text-center 
mb-3">Download Worksheets for Guidance</h5> 
          <div className="d-flex flex-wrap justify-content-center 
gap-3"> 
            <button 
              className="btn btn-warning text-white fw-bold" 
              onClick={() => handleDownload(worksheetUrls.brainstorm)} 
            > 
              Download Brainstorming Worksheet 
            </button> 
 
            <button 
              className="btn btn-warning text-white fw-bold" 
              onClick={() => handleDownload(worksheetUrls.concept)} 
            > 
              Download Concept Map Worksheet 
            </button> 
 
            <button 
              className="btn btn-warning text-white fw-bold" 
              onClick={() => handleDownload(worksheetUrls.outline)} 
            > 
              Download Project Outline Worksheet 
            </button> 
          </div> 
        </div> 
 
        {/* Error Message */} 
        {errorMessage && ( 
          <div className="alert alert-danger text-center mb-4"> 
            {errorMessage} 
          </div> 
        )} 
 
        {/* Upload Form */} 
        <h5 className="fw-semibold text-dark mb-3 text-center">Upload Your Completed Worksheets</h5> 
<form onSubmit={handleSubmit}> 
  {/* Brainstorming Map Upload */} 
  <div className="mb-4"> 
    <label htmlFor="brainstormUpload" className="form-label text-dark fw-semibold"> 
      Upload Brainstorming Map <span className="text-muted">(PDF/Image)</span> 
    </label> 
    <input 
      id="brainstormUpload" 
      type="file" 
      accept=".pdf, .png, .jpg, .jpeg" 
      className="form-control" 
      onChange={(e) => handleFileChange(e, 'brainstorm')} 
    /> 
    {brainstormFileName && ( 
      <div className="alert alert-light border d-flex justify-content-between align-items-center mt-2"> 
        <span className="text-success"><strong>Selected:</strong> {brainstormFileName}</span> 
        <button 
          type="button" 
          className="btn btn-outline-danger btn-sm" 
          onClick={() => handleRemoveFile('brainstorm')} 
        > 
          Remove 
        </button> 
      </div> 
    )} 
  </div> 

  {/* Concept Map Upload */} 
  <div className="mb-4"> 
    <label htmlFor="conceptUpload" className="form-label text-dark fw-semibold"> 
      Upload Concept Map <span className="text-muted">(PDF/Image)</span> 
    </label> 
    <input 
      id="conceptUpload" 
      type="file" 
      accept=".pdf, .png, .jpg, .jpeg" 
      className="form-control" 
      onChange={(e) => handleFileChange(e, 'concept')} 
    /> 
    {conceptFileName && ( 
      <div className="alert alert-light border d-flex justify-content-between align-items-center mt-2"> 
        <span className="text-success"><strong>Selected:</strong> {conceptFileName}</span> 
        <button 
          type="button" 
          className="btn btn-outline-danger btn-sm" 
          onClick={() => handleRemoveFile('concept')} 
        > 
          Remove 
        </button> 
      </div> 
    )} 
  </div> 

  {/* Project Outline Upload */} 
  <div className="mb-4"> 
    <label htmlFor="outlineUpload" className="form-label text-dark fw-semibold"> 
      Upload Project Outline <span className="text-muted">(PDF/Image)</span> 
    </label> 
    <input 
      id="outlineUpload" 
      type="file" 
      accept=".pdf, .png, .jpg, .jpeg" 
      className="form-control" 
      onChange={(e) => handleFileChange(e, 'outline')} 
    /> 
    {outlineFileName && ( 
      <div className="alert alert-light border d-flex justify-content-between align-items-center mt-2"> 
        <span className="text-success"><strong>Selected:</strong> {outlineFileName}</span> 
        <button 
          type="button" 
          className="btn btn-outline-danger btn-sm" 
          onClick={() => handleRemoveFile('outline')} 
        > 
          Remove 
        </button> 
      </div> 
    )} 
  </div> 

  <button 
    type="submit" 
    className="btn btn-warning text-white fw-bold w-100" 
  > 
    Submit Files 
  </button> 
</form>
      </div> 
    </div> 
  ); 
}; 
 
export default IdeaDevelopment; 