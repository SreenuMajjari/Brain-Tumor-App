import React from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../assets/hero.png';
import './Home.css';

function Home() {
  return (
    <div className="home-wrapper">
      {/* Clean, Hopeful Hero Section */}
      <section className="clinical-hero">
        <div className="hero-shape-background"></div>

        <div className="hero-container">
          <div className="hero-content">
            <div className="medical-badge">
              <span className="pulse-dot"></span> Clinical Excellence
            </div>
            <h1 className="hero-title">
              Advancing Diagnostics,<br />
              <span className="text-navy">Inspiring Hope.</span>
            </h1>
            <p className="hero-description">
              Our state-of-the-art imaging analysis tools provide medical professionals with the precision they need to detect anomalies early, ensuring better care and brighter futures for patients.
            </p>
            <div className="hero-actions">
              <Link to="/analysis" className="btn-clinical btn-primary-solid">
                Start Analysis
              </Link>
              <Link to="/diseases" className="btn-clinical btn-outline-navy">
                Learn About Conditions
              </Link>
            </div>
          </div>


        </div>
      </section>

      {/* Clean Features Section */}
      <section className="clinical-features">
        <div className="features-header">
          <h2>Compassionate Care Meets <br /><span className="text-teal">Advanced Technology</span></h2>
          <p>Designed with patients and providers in mind, delivering accurate results in a secure, easy-to-use environment.</p>
        </div>

        <div className="feature-cards-container">
          <div className="clean-feature-card">
            <div className="icon-circle bg-navy-light">
              <span className="icon">🛡️</span>
            </div>
            <h3>Uncompromising Security</h3>
            <p>Patient privacy is our top priority. We use industry-leading encryption to ensure all health data remains completely secure and confidential.</p>
          </div>

          <div className="clean-feature-card">
            <div className="icon-circle bg-teal-light">
              <span className="icon">✨</span>
            </div>
            <h3>Exceptional Precision</h3>
            <p>Our algorithms are trained on extensive clinical datasets, providing highly accurate secondary evaluations to support your diagnosis.</p>
          </div>

          <div className="clean-feature-card">
            <div className="icon-circle bg-gold-light">
              <span className="icon">⏱️</span>
            </div>
            <h3>Rapid Results</h3>
            <p>Time is critical in healthcare. Receive detailed diagnostic reports in seconds, allowing you to focus on what matters most—the patient.</p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="trust-section">
        <div className="trust-content">
          <h2>Dedicated to Better Outcomes</h2>
          <p>BrainCare is committed to supporting medical facilities with tools that enhance accuracy and inspire confidence in every diagnosis.</p>
          <Link to="/dashboard" className="btn-clinical btn-accent-solid">View Clinical Dashboard</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
