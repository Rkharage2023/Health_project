import React from 'react';
import { motion } from 'framer-motion';
import './ProfilePage.css';

const ProfilePage = ({ setPage }) => {
  const handleLogout = () => {
    localStorage.removeItem('phone');
    window.location.reload();
  };

  return (
    <div className="profile-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="profile-content"
      >
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <span className="avatar-icon">👤</span>
          </div>
          <div className="profile-info">
            <h1 className="profile-name">Rushikesh</h1>
            <p className="profile-tagline">
              Finding the root cause is a key to finding the right treatment for you.
            </p>
          </div>
        </div>

        {/* Take The Actions */}
        <div className="profile-actions">
          <h3 className="actions-title">Take The Actions</h3>
          <div className="action-cards">
            <div className="action-card yellow">
              <div className="action-icon">🟡</div>
              <div className="action-text">
                <h4>Progress</h4>
                <p>Track your journey</p>
              </div>
            </div>
            <div className="action-card green">
              <div className="action-icon">🟢</div>
              <div className="action-text">
                <h4>Help & Support</h4>
                <p>Get assistance</p>
              </div>
            </div>
            <div className="action-card purple">
              <div className="action-icon">🟣</div>
              <div className="action-text">
                <h4>Chat With Us</h4>
                <p>24/7 support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="orders-section">
          <h3 className="section-title">Orders</h3>
          <div className="orders-list">
            <div className="order-item">
              <div className="order-icon">📦</div>
              <div className="order-info">
                <h4>No active orders</h4>
                <p>You don't have any active orders</p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Section */}
        <div className="legal-section">
          <h3 className="section-title">Terms & Policies</h3>
          <div className="legal-options">
            <button className="legal-button">
              <span>Privacy Policy</span>
              <span>›</span>
            </button>
            <button className="legal-button">
              <span>Terms of Service</span>
              <span>›</span>
            </button>
            <button className="legal-button">
              <span>Refund Policy</span>
              <span>›</span>
            </button>
          </div>
        </div>

        {/* Logout Section */}
        <div className="logout-section">
          <motion.button
            onClick={handleLogout}
            className="logout-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Logout
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;