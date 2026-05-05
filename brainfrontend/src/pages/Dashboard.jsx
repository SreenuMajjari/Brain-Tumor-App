import React from 'react';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="page-container dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p>Monitor patient statistics and recent analysis results.</p>
      </header>

      <div className="stats-grid">
        <div className="card stat-card">
          <div className="stat-info">
            <h3>Total Scans</h3>
            <p className="stat-value">1,248</p>
            <span className="stat-change positive">+12% this month</span>
          </div>
          <div className="stat-icon">📄</div>
        </div>
        <div className="card stat-card">
          <div className="stat-info">
            <h3>Anomalies Detected</h3>
            <p className="stat-value">84</p>
            <span className="stat-change negative">+3% this month</span>
          </div>
          <div className="stat-icon">⚠️</div>
        </div>
        <div className="card stat-card">
          <div className="stat-info">
            <h3>Active Patients</h3>
            <p className="stat-value">342</p>
            <span className="stat-change positive">+8% this month</span>
          </div>
          <div className="stat-icon">🧑‍⚕️</div>
        </div>
      </div>

      <div className="dashboard-content-grid">
        <div className="card recent-activity">
          <h2>Recent Activity</h2>
          <ul className="activity-list">
            <li className="activity-item">
              <div className="activity-avatar">PT</div>
              <div className="activity-details">
                <h4>Patient MRI Uploaded</h4>
                <p>ID: #8824 - Awaiting Analysis</p>
              </div>
              <span className="activity-time">10 min ago</span>
            </li>
            <li className="activity-item">
              <div className="activity-avatar bg-teal">AN</div>
              <div className="activity-details">
                <h4>Analysis Complete</h4>
                <p>ID: #8823 - No anomalies detected</p>
              </div>
              <span className="activity-time">1 hr ago</span>
            </li>
            <li className="activity-item">
              <div className="activity-avatar bg-gold">WR</div>
              <div className="activity-details">
                <h4>Analysis Complete</h4>
                <p>ID: #8820 - Review Required</p>
              </div>
              <span className="activity-time">3 hrs ago</span>
            </li>
          </ul>
        </div>
        <div className="card quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button className="btn btn-primary w-100">Upload New Scan</button>
            <button className="btn btn-outline w-100">Generate Report</button>
            <button className="btn btn-outline w-100">Manage Patients</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
