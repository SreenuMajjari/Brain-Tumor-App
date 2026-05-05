import React, { useState, useRef, useCallback } from 'react';
import NeuralCanvas from '../components/NeuralCanvas';
import './Analysis.css';

/* ── Confidence color helper ── */
const getConfidenceColor = (conf) => {
  if (conf >= 85) return '#10B981';
  if (conf >= 60) return '#F59E0B';
  return '#F43F5E';
};

/* ── Status color map ── */
const STATUS_COLORS = {
  'No Tumor':    { bg: 'rgba(16,185,129,0.15)',  border: 'rgba(16,185,129,0.4)',  text: '#10B981' },
  'Glioma':      { bg: 'rgba(244,63,94,0.15)',   border: 'rgba(244,63,94,0.4)',   text: '#F43F5E' },
  'Meningioma':  { bg: 'rgba(245,158,11,0.15)',  border: 'rgba(245,158,11,0.4)',  text: '#F59E0B' },
  'Pituitary':   { bg: 'rgba(99,102,241,0.15)',  border: 'rgba(99,102,241,0.4)',  text: '#818CF8' },
  'Error':       { bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.1)', text: '#94A3B8' },
};

function getStatusStyle(status) {
  return STATUS_COLORS[status] || STATUS_COLORS['Error'];
}

export default function Analysis() {
  const [file, setFile]           = useState(null);
  const [preview, setPreview]     = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult]       = useState(null);
  const [progress, setProgress]   = useState(0);
  const inputRef = useRef(null);

  /* ── File handling ── */
  const loadFile = useCallback((f) => {
    if (!f) return;
    setFile(f);
    setResult(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(f);
  }, []);

  const handleFileChange = (e) => loadFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    loadFile(e.dataTransfer.files[0]);
  };

  /* ── Analysis ── */
  const handleAnalyze = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    setResult(null);
    setProgress(0);

    // Fake progress until response arrives
    const interval = setInterval(() => {
      setProgress(p => (p < 90 ? p + Math.random() * 12 : p));
    }, 200);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const apiUrl = import.meta.env.DEV ? 'http://localhost:8000/analyze' : '/analyze';
      const response = await fetch(apiUrl, { method: 'POST', body: formData });
      if (!response.ok) throw new Error('Analysis failed.');
      const data = await response.json();
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setResult({
          status:         data.status,
          findings:       data.findings,
          confidence:     data.confidence,
          recommendation: data.recommendation,
        });
        setIsAnalyzing(false);
      }, 400);
    } catch (err) {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setResult({
          status:         'Error',
          findings:       'Could not reach the backend. Please ensure the FastAPI server is running.',
          confidence:     'N/A',
          recommendation: 'Check your connection and try again.',
        });
        setIsAnalyzing(false);
      }, 300);
    }
  };

  const reset = () => { setFile(null); setPreview(null); setResult(null); setProgress(0); };

  const statusStyle = result ? getStatusStyle(result.status) : null;
  const confNum     = result ? parseFloat(result.confidence) : 0;

  return (
    <div className="analysis-wrapper">
      {/* ── Neural Canvas Background ── */}
      <NeuralCanvas opacity={0.45} />
      <div className="orb orb-blue"   style={{ width: 400, height: 400, top: -80, left: -60 }} />
      <div className="orb orb-violet" style={{ width: 500, height: 500, bottom: -150, right: -80 }} />

      {/* ── Header ── */}
      <header className="analysis-header">
        <span className="page-badge">🔬 Deep Learning Pipeline</span>
        <h1>MRI Analysis Studio</h1>
        <p>Upload a brain MRI scan and receive a deep learning classification report in seconds.</p>
      </header>

      {/* ── Main Grid ── */}
      <div className="analysis-grid">

        {/* ── LEFT: Upload Panel ── */}
        <div className="glass-panel upload-panel">
          <h2 className="panel-title">Upload Scan</h2>

          {/* Drop Zone */}
          <div
            className={`drop-zone ${isDragging ? 'dragging' : ''} ${file ? 'has-file' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => !file && inputRef.current.click()}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*,.dcm"
              className="hidden-input"
              onChange={handleFileChange}
            />

            {preview ? (
              <div className="preview-wrapper">
                <img src={preview} alt="Scan preview" className="scan-preview" />
                <div className="preview-overlay">
                  <button className="btn-change" onClick={(e) => { e.stopPropagation(); reset(); }}>
                    ✕ Remove
                  </button>
                </div>
              </div>
            ) : (
              <div className="drop-placeholder">
                <div className="drop-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                  </svg>
                </div>
                <p className="drop-text">Drag & drop or <span className="drop-link">browse files</span></p>
                <p className="drop-hint">Supports JPG, PNG, DICOM</p>
              </div>
            )}
          </div>

          {/* File info */}
          {file && (
            <div className="file-info">
              <span className="file-icon">🧬</span>
              <div className="file-meta">
                <p className="file-name">{file.name}</p>
                <p className="file-size">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>
          )}

          {/* Analyze Button */}
          <button
            className={`btn-analyze ${isAnalyzing ? 'loading' : ''}`}
            onClick={handleAnalyze}
            disabled={!file || isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <span className="spinner" />
                Analyzing...
              </>
            ) : (
              <>Run Analysis &nbsp;→</>
            )}
          </button>

          {/* Progress bar */}
          {isAnalyzing && (
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          )}
        </div>

        {/* ── RIGHT: Results Panel ── */}
        <div className="glass-panel results-panel">
          <h2 className="panel-title">Results</h2>

          {/* Empty state */}
          {!result && !isAnalyzing && (
            <div className="empty-state">
              <div className="empty-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/>
                </svg>
              </div>
              <p>Upload a scan and click <strong>Run Analysis</strong> to see classification results here.</p>
            </div>
          )}

          {/* Scanning animation */}
          {isAnalyzing && (
            <div className="scanning-state">
              <div className="brain-scan-box">
                <div className="scan-line" />
                {preview && <img src={preview} alt="" className="scan-ghost" />}
              </div>
              <p className="scanning-text">Running deep learning pipeline…</p>
              <div className="scan-steps">
                <span className="step done">Feature Extraction</span>
                <span className="step active">SVM Classification</span>
                <span className="step">Report Generation</span>
              </div>
            </div>
          )}

          {/* Result content */}
          {result && (
            <div className="result-content fade-in">
              {/* Status Badge */}
              <div
                className="result-status"
                style={{
                  background: statusStyle.bg,
                  border: `1px solid ${statusStyle.border}`,
                  color: statusStyle.text,
                }}
              >
                <span className="status-dot" style={{ background: statusStyle.text }} />
                {result.status}
              </div>

              {/* Confidence Meter */}
              {result.confidence !== 'N/A' && (
                <div className="confidence-block">
                  <div className="confidence-label">
                    <span>Confidence</span>
                    <span style={{ color: getConfidenceColor(confNum) }}>
                      {result.confidence}
                    </span>
                  </div>
                  <div className="confidence-track">
                    <div
                      className="confidence-fill"
                      style={{
                        width: `${confNum}%`,
                        background: getConfidenceColor(confNum),
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Findings */}
              <div className="result-section">
                <h3>Findings</h3>
                <p>{result.findings}</p>
              </div>

              {/* Recommendation */}
              <div className="result-section">
                <h3>Recommendation</h3>
                <p>{result.recommendation}</p>
              </div>

              {/* New scan button */}
              <button className="btn-new-scan" onClick={reset}>
                ← Analyze Another Scan
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
