import React from 'react';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="premium-dashboard-wrapper">
      {/* Background Orbs */}
      <div className="ambient-background">
        <div className="glow-orb orb-dash-1"></div>
        <div className="glow-orb orb-dash-2"></div>
      </div>

      <div className="dashboard-container">
        <header className="dashboard-header">
          <div>
            <h1>Command Center</h1>
            <p>Real-time analytics and neural network performance metrics.</p>
          </div>
          <div className="system-status">
            <span className="pulse-dot green"></span> System Online
          </div>
        </header>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="glass-stat-card">
            <div className="stat-icon-wrapper blue-glow">
              <span className="icon">🧠</span>
            </div>
            <div className="stat-content">
              <h3>Total Scans Analyzed</h3>
              <p className="stat-value">1,248</p>
              <span className="stat-change positive">+12% vs last month</span>
            </div>
            <div className="card-border-glow"></div>
          </div>

          <div className="glass-stat-card">
            <div className="stat-icon-wrapper violet-glow">
              <span className="icon">⚠️</span>
            </div>
            <div className="stat-content">
              <h3>Anomalies Detected</h3>
              <p className="stat-value">84</p>
              <span className="stat-change negative">+3% vs last month</span>
            </div>
            <div className="card-border-glow"></div>
          </div>

          <div className="glass-stat-card">
            <div className="stat-icon-wrapper cyan-glow">
              <span className="icon">⚡</span>
            </div>
            <div className="stat-content">
              <h3>Average Inference Time</h3>
              <p className="stat-value">0.4s</p>
              <span className="stat-change positive">-0.1s optimization</span>
            </div>
            <div className="card-border-glow"></div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="dashboard-content-grid">
          {/* Recent Activity */}
          <div className="glass-panel recent-activity">
            <div className="panel-header">
              <h2>Recent Inference Logs</h2>
              <button className="btn-icon">⋮</button>
            </div>
            <ul className="activity-list">
              <li className="activity-item">
                <div className="activity-avatar bg-violet">PT</div>
                <div className="activity-details">
                  <h4>Scan #8824 - Uploaded</h4>
                  <p>Awaiting deep learning pipeline</p>
                </div>
                <span className="activity-time">10 min ago</span>
              </li>
              <li className="activity-item">
                <div className="activity-avatar bg-cyan">AN</div>
                <div className="activity-details">
                  <h4>Scan #8823 - Complete</h4>
                  <p>Classification: <span className="badge badge-success">No Tumor</span></p>
                </div>
                <span className="activity-time">1 hr ago</span>
              </li>
              <li className="activity-item">
                <div className="activity-avatar bg-gold">WR</div>
                <div className="activity-details">
                  <h4>Scan #8820 - Complete</h4>
                  <p>Classification: <span className="badge badge-warning">Glioma</span></p>
                </div>
                <span className="activity-time">3 hrs ago</span>
              </li>
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="glass-panel quick-actions">
            <h2>Quick Actions</h2>
            <div className="action-buttons">
              <button className="btn-action btn-primary-glow">
                <span className="icon">📤</span> Upload New Scan
              </button>
              <button className="btn-action btn-glass">
                <span className="icon">📊</span> Generate Report
              </button>
              <button className="btn-action btn-glass">
                <span className="icon">⚙️</span> Model Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
