import React, { useState } from 'react';
import './Analysis.css';

function Analysis() {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    setResult(null);
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const apiUrl = import.meta.env.DEV ? 'http://localhost:8000/analyze' : '/analyze';
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Analysis failed. Please try again.');
      }
      
      const data = await response.json();
      
      setResult({
        status: data.status,
        findings: data.findings,
        confidence: data.confidence,
        recommendation: data.recommendation
      });
    } catch (error) {
      console.error('Error during analysis:', error);
      setResult({
        status: 'Error',
        findings: 'There was an error communicating with the backend server. Please make sure the FastAPI server is running.',
        confidence: 'N/A',
        recommendation: 'Check connection and try again.'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="page-container analysis-container">
      <div className="analysis-header">
        <h1>MRI Analysis Studio</h1>
        <p>Upload a patient MRI scan for AI-assisted review.</p>
      </div>

      <div className="analysis-grid">
        <div className="card upload-section">
          <h2>Upload Scan</h2>
          <div className="upload-area">
            <input 
              type="file" 
              id="file-upload" 
              className="file-input" 
              onChange={handleFileChange}
              accept="image/*,.dcm"
            />
            <label htmlFor="file-upload" className="upload-label">
              <div className="upload-icon">📁</div>
              <p>{file ? file.name : "Drag and drop or click to browse"}</p>
              <span className="upload-hint">Supported formats: DICOM, NIfTI, JPG, PNG</span>
            </label>
          </div>
          <button 
            className="btn btn-primary w-100 analyze-btn" 
            onClick={handleAnalyze}
            disabled={!file || isAnalyzing}
          >
            {isAnalyzing ? (
              <span className="loading-spinner"></span>
            ) : "Start Analysis"}
          </button>
        </div>

        <div className="card results-section">
          <h2>Analysis Results</h2>
          {!result && !isAnalyzing && (
            <div className="empty-state">
              <p>Upload a scan and click "Start Analysis" to view results here.</p>
            </div>
          )}
          
          {isAnalyzing && (
            <div className="analyzing-state">
              <div className="scanner-animation">
                <div className="scanner-bar"></div>
              </div>
              <p>Processing image data and running ML models...</p>
            </div>
          )}

          {result && (
            <div className="results-content fade-in">
              <div className="result-header">
                <span className="status-badge success">{result.status}</span>
                <span className="confidence-score">Confidence: {result.confidence}</span>
              </div>
              <div className="result-details">
                <h3>Findings</h3>
                <p>{result.findings}</p>
                
                <h3>Recommendation</h3>
                <p>{result.recommendation}</p>
              </div>
              <div className="result-actions">
                <button className="btn btn-outline">Download Report</button>
                <button className="btn btn-accent">Flag for Review</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Analysis;
