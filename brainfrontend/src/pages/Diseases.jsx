import React from 'react';
import './Diseases.css';

function Diseases() {
  return (
    <div className="page-container diseases-container">
      <header className="diseases-header">
        <h1>Brain Diseases Directory</h1>
        <p>Information on common brain conditions and abnormalities we screen for.</p>
      </header>

      <div className="diseases-grid">
        <div className="card disease-card">
          <div className="disease-icon glioma-icon"></div>
          <h2>Glioma</h2>
          <p>
            Gliomas are a type of tumor that occurs in the brain and spinal cord. They begin in the gluey supportive cells (glial cells) that surround nerve cells and help them function.
          </p>
          <ul className="disease-features">
            <li>Grade I-IV classifications</li>
            <li>Can be slow or fast-growing</li>
            <li>Symptoms vary by location</li>
          </ul>
        </div>

        <div className="card disease-card">
          <div className="disease-icon meningioma-icon"></div>
          <h2>Meningioma</h2>
          <p>
            A meningioma is a tumor that arises from the meninges — the membranes that surround your brain and spinal cord. Most are noncancerous (benign), though some can be atypical or malignant.
          </p>
          <ul className="disease-features">
            <li>Often slow-growing</li>
            <li>More common in older adults</li>
            <li>Can cause pressure on brain tissue</li>
          </ul>
        </div>

        <div className="card disease-card">
          <div className="disease-icon pituitary-icon"></div>
          <h2>Pituitary Tumor</h2>
          <p>
            Pituitary tumors are abnormal growths that develop in your pituitary gland. Most are noncancerous growths (adenomas) that remain in the gland and don't spread to other parts of the body.
          </p>
          <ul className="disease-features">
            <li>Can affect hormone levels</li>
            <li>May cause vision problems</li>
            <li>Often highly treatable</li>
          </ul>
        </div>

        <div className="card disease-card">
          <div className="disease-icon healthy-icon"></div>
          <h2>Healthy Brain</h2>
          <p>
            Our models are also trained on extensive datasets of healthy brain scans to establish a robust baseline. This ensures high specificity in distinguishing normal variations from pathological anomalies.
          </p>
          <ul className="disease-features">
            <li>No structural abnormalities</li>
            <li>Normal tissue densities</li>
            <li>Used as baseline for comparison</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Diseases;
