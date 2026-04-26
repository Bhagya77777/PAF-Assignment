import React from 'react';
import { Activity, Users, Zap, ShieldCheck } from 'lucide-react';
import './StatsBanner.css';

const StatsBanner: React.FC = () => {
  return (
    <div className="stats-banner">
      <div className="stat-pill-card">
        <div className="pill-icon indigo"><Zap size={14} /></div>
        <div className="pill-info">
          <span className="pill-label">Live Load</span>
          <span className="pill-value">84%</span>
        </div>
        <div className="live-indicator"></div>
      </div>
      
      <div className="stat-pill-card">
        <div className="pill-icon emerald"><Users size={14} /></div>
        <div className="pill-info">
          <span className="pill-label">Active Users</span>
          <span className="pill-value">1.2k</span>
        </div>
      </div>

      <div className="stat-pill-card">
        <div className="pill-icon rose"><ShieldCheck size={14} /></div>
        <div className="pill-info">
          <span className="pill-label">System Health</span>
          <span className="pill-value">Optimal</span>
        </div>
      </div>

      <div className="stat-pill-card">
        <div className="pill-icon amber"><Activity size={14} /></div>
        <div className="pill-info">
          <span className="pill-label">Throughput</span>
          <span className="pill-value">4.2gb/s</span>
        </div>
      </div>
    </div>
  );
};

export default StatsBanner;
