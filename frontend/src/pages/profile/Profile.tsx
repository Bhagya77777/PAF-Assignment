import React from 'react';
import { useUser } from '../../context/UserContext';
import { User, Mail, Shield, BookOpen, Clock, Settings, Edit3, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import './Profile.css';

const Profile: React.FC = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="profile-container fade-in">
      <div className="profile-header">
        <div className="header-content">
          <div className="profile-avatar-wrapper">
            <div className="profile-avatar">
              {user.name.charAt(0)}
            </div>
            <button className="edit-avatar-btn">
              <Edit3 size={16} />
            </button>
          </div>
          <div className="profile-info-main">
            <h1>{user.name}</h1>
            <p className="profile-role">
              <Shield size={14} />
              {user.role}
            </p>
            <div className="profile-badges">
              <span className="badge badge-success">Verified Student</span>
              <span className="badge badge-primary" style={{ background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)' }}>Academic Year 3</span>
            </div>
          </div>
        </div>
        <button className="btn btn-primary edit-profile-btn">
          <Settings size={18} />
          Edit Profile
        </button>
      </div>

      <div className="profile-grid">
        <div className="profile-main-col">
          <section className="glass-card profile-section">
            <div className="section-header">
              <h3>Personal Information</h3>
            </div>
            <div className="info-grid">
              <div className="info-item">
                <label><Mail size={14} /> Email Address</label>
                <p>{user.email || 'not-provided@campus.com'}</p>
              </div>
              <div className="info-item">
                <label><User size={14} /> Full Name</label>
                <p>{user.name}</p>
              </div>
              <div className="info-item">
                <label><Phone size={14} /> Phone Number</label>
                <p>+94 77 123 4567</p>
              </div>
              <div className="info-item">
                <label><MapPin size={14} /> Department</label>
                <p>Faculty of Computing & Information Systems</p>
              </div>
            </div>
          </section>

          <section className="glass-card profile-section">
            <div className="section-header">
              <h3>About Me</h3>
            </div>
            <p className="bio-text">
              Passionate student pursuing Computer Science. Active member of the Tech Society 
              and interested in building smart solutions for campus life.
            </p>
          </section>
        </div>

        <div className="profile-side-col">
          <section className="glass-card stats-card">
            <h3>Quick Stats</h3>
            <div className="stats-list">
              <div className="stat-item">
                <div className="stat-icon" style={{ background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)' }}>
                  <BookOpen size={20} />
                </div>
                <div className="stat-info">
                  <span className="stat-value">12</span>
                  <span className="stat-label">Active Bookings</span>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>
                  <Shield size={20} />
                </div>
                <div className="stat-info">
                  <span className="stat-value">4</span>
                  <span className="stat-label">Reported Incidents</span>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)' }}>
                  <Clock size={20} />
                </div>
                <div className="stat-info">
                  <span className="stat-value">24h</span>
                  <span className="stat-label">Avg Response Time</span>
                </div>
              </div>
            </div>
          </section>

          <section className="glass-card security-card">
            <h3>Security</h3>
            <div className="security-list">
              <button className="security-btn">
                <Shield size={16} />
                Two-Factor Authentication
                <span className="status-on">ON</span>
              </button>
              <button className="security-btn">
                <Settings size={16} />
                Change Password
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
