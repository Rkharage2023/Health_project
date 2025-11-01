import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, MessageCircle, Star, Shield, Leaf, Bell } from 'lucide-react';
import './HomePage.css';

const HomePage = ({ setPage, setQuizAnswers }) => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);

  const startTest = () => {
    // Let App.js handle the profile check
    setQuizAnswers([]);
    setPage('quiz');
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    if (!notificationsEnabled) {
      alert('Notification permissions requested!');
    }
  };

  return (
    <div className="home-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="home-content"
      >
        {/* Hero Section */}
        <div className="hero-section">
          <h1 className="hero-title">
            Know The Root Cause Of Your <span className="highlight">Skin Problems</span>
          </h1>
          <p className="hero-subtitle">
            94% saw improvement in photosensitivity symptoms within 4 weeks
          </p>
          <motion.button
            onClick={startTest}
            className="cta-button"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(16, 185, 129, 0.4)" }}
            whileTap={{ scale: 0.98 }}
          >
            Start Skin Sensitivity Assessment <ChevronRight size={22} className="button-icon" />
          </motion.button>
        </div>

        {/* Traya Plan Section */}
        <div className="traya-plan-section">
          <h2 className="section-title">PhotoGuard Plan Includes</h2>
          <div className="plan-features">
            <div className="plan-feature">
              <div className="feature-icon">👨‍⚕️</div>
              <span>Skin coach support</span>
            </div>
            <div className="plan-feature">
              <div className="feature-icon">📝</div>
              <span>Doctor prescription</span>
            </div>
            <div className="plan-feature">
              <div className="feature-icon">🥗</div>
              <span>Customised diet plan</span>
            </div>
          </div>
          <div className="plan-badges">
            <span className="badge"><Shield size={14} /> 100% Safe</span>
            <span className="badge"><Leaf size={14} /> Vegan Friendly</span>
            <span className="badge">🌿 Allergen Free</span>
          </div>
        </div>

        {/* Help Section */}
        <div className="help-section">
          <h3 className="section-title">Need Help?</h3>
          <div className="help-options">
            <label className="help-option">
              <input type="checkbox" />
              <span>General Queries</span>
            </label>
            <label className="help-option">
              <input type="checkbox" />
              <span>Skin Test</span>
            </label>
          </div>
        </div>

        {/* Notification Section */}
        <div className="notification-section">
          <div className="notification-header">
            <Bell size={20} />
            <span>Enable Notification For Better Experience</span>
          </div>
          <button 
            className={`notification-toggle ${notificationsEnabled ? 'enabled' : ''}`}
            onClick={toggleNotifications}
          >
            {notificationsEnabled ? 'Notifications Enabled' : 'Enable Notifications'}
          </button>
        </div>

        {/* Chat Support Section */}
        <div className="chat-support-section">
          <h3>HAVE QUESTIONS?</h3>
          <p>Your Skin coach is just 1-click away</p>
          <motion.button
            className="chat-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle size={20} />
            Chat Now
          </motion.button>
        </div>

        {/* Doctors Team Section */}
        <div className="doctors-section">
          <h2 className="section-title">Meet Our Team Of Doctors</h2>
          <div className="doctor-card">
            <div className="doctor-avatar">👨‍⚕️</div>
            <div className="doctor-info">
              <h3>Dr. Shailendra Chaubey</h3>
              <p className="doctor-specialty">Ayurvedic Practitioner</p>
              <p className="doctor-experience">Experience: 15 Years</p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {/* Reviews Section */}
<div className="reviews-section">
  <div className="reviews-header">
    <div className="rating-overview">
      <div className="stars">
        {[1, 2, 3, 4].map((star) => (
          <Star key={star} size={20} fill="currentColor" />
        ))}
        <Star size={20} fill="currentColor" />
      </div>
      <span className="rating">4.8</span>
      <span className="reviews-count">5243 ratings</span>
    </div>
  </div>
  
  <div className="reviews-container">
    <div className="review-card">
      <div className="reviewer">Priya Sharma</div>
      <div className="review-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} size={16} fill="currentColor" />
        ))}
      </div>
      <p className="review-text">
        I used to avoid going out in sunlight due to severe skin reactions. After using PhotoSense, 
        I can finally enjoy outdoor activities without worrying about rashes and redness. 
        Life-changing results! <span className="read-more">Read More</span>
      </p>
    </div>

    <div className="review-card">
      <div className="reviewer">Rahul Mehta</div>
      <div className="review-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} size={16} fill="currentColor" />
        ))}
      </div>
      <p className="review-text">
        My skin would burn and itch within minutes of sun exposure. The personalized treatment plan 
        from PhotoSense has reduced my sensitivity by 90%. I feel normal again! 
        <span className="read-more">Read More</span>
      </p>
    </div>

    <div className="review-card">
      <div className="reviewer">Anita Patel</div>
      <div className="review-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} size={16} fill="currentColor" />
        ))}
      </div>
      <p className="review-text">
        After years of struggling with medication-induced photosensitivity, I found relief with 
        PhotoSense. The expert guidance and proper diagnosis made all the difference. 
        Highly recommended! <span className="read-more">Read More</span>
      </p>
    </div>
  </div>
</div>

        {/* Features Section */}
        <div className="features-section">
          <h2 className="features-title">Why Choose PhotoGuard?</h2>
          <div className="features-grid">
            {[
              { icon: '🔍', title: 'Accurate Diagnosis', desc: 'Identify the exact cause of sensitivity' },
              { icon: '👨‍⚕️', title: 'Expert Dermatologists', desc: '15+ years experience in photosensitivity' },
              { icon: '📊', title: 'Proven Results', desc: '94% success rate in symptom reduction' }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="feature-card"
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="final-cta">
          <motion.button
            onClick={startTest}
            className="cta-button large"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(16, 185, 129, 0.4)" }}
            whileTap={{ scale: 0.98 }}
          >
            Take The Skin Test™
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;