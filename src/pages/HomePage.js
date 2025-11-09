import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, MessageCircle, Star, Shield, Leaf, Bell, Plus, ChevronLeft, ChevronRight as RightIcon } from 'lucide-react';
import DoctorRegistration from '../components/DoctorRegistration';
import './HomePage.css';

const HomePage = ({ setPage, setQuizAnswers, userRole, phoneNumber }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [showDoctorRegistration, setShowDoctorRegistration] = useState(false);
  const [registeredDoctors, setRegisteredDoctors] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0); // For carousel

  // Load registered doctors from localStorage
  useEffect(() => {
    const doctors = JSON.parse(localStorage.getItem('registeredDoctors') || '[]');
    setRegisteredDoctors(doctors);
  }, []);

  // Separate doctors by role
  const pharmacists = registeredDoctors.filter(doctor => doctor.role === 'pharmacist');
  const dermatologists = registeredDoctors.filter(doctor => doctor.role === 'dermatologist');

  const startTest = () => {
    setQuizAnswers([]);
    setPage('quiz');
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    if (!notificationsEnabled) {
      alert('Notification permissions requested!');
    }
  };

  const handleDoctorAdded = (newDoctor) => {
    setRegisteredDoctors(prev => [...prev, newDoctor]);
  };

  const handleDoctorDeleted = (doctorId) => {
    setRegisteredDoctors(prev => prev.filter(doctor => doctor.id !== doctorId));
  };

  // Carousel navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === 1 ? 0 : 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
  };

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

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

        {/* Add Doctor Button for Pharmacist and Dermatologist */}
        {(userRole === 'pharmacist' || userRole === 'dermatologist') && (
          <div className="add-doctor-section">
            <motion.button
              onClick={() => setShowDoctorRegistration(true)}
              className="add-doctor-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={20} />
              Manage Doctor Information
            </motion.button>
            <p className="role-indicator">
              Logged in as: <strong>{userRole.charAt(0).toUpperCase() + userRole.slice(1)}</strong>
            </p>
          </div>
        )}

        {/* Healthcare Professionals Carousel */}
        {(pharmacists.length > 0 || dermatologists.length > 0) && (
          <div className="professionals-carousel-section">
            <h2 className="section-title">Our Healthcare Partners</h2>
            
            <div className="carousel-container">
              {/* Navigation Buttons */}
              <button className="carousel-button prev" onClick={prevSlide}>
                <ChevronLeft size={24} />
              </button>
              
              <button className="carousel-button next" onClick={nextSlide}>
                <RightIcon size={24} />
              </button>

              {/* Carousel Content */}
              <div className="carousel-wrapper">
                <AnimatePresence mode="wait">
                  {currentSlide === 0 ? (
                    <motion.div
                      key="pharmacists"
                      initial={{ opacity: 0, x: 300 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -300 }}
                      transition={{ duration: 0.5 }}
                      className="carousel-slide"
                    >
                      <div className="slide-header">
                        <div className="role-icon">💊</div>
                        <h3 className="slide-title">Pharmacists</h3>
                        <p className="slide-subtitle">Expert medication guidance and consultations</p>
                      </div>
                      
                      <div className="professionals-grid">
                        {pharmacists.length > 0 ? (
                          pharmacists.map((pharmacist) => (
                            <motion.div
                              key={pharmacist.id}
                              className="professional-card pharmacist"
                              whileHover={{ scale: 1.02 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <div className="professional-avatar">💊</div>
                              <div className="professional-info">
                                <h4>Dr. {pharmacist.name}</h4>
                                <p className="professional-store">📍 {pharmacist.storeName}</p>
                                <p className="professional-specialty">{pharmacist.specialty}</p>
                                <p className="professional-experience">{pharmacist.experience} Years Experience</p>
                                <p className="professional-location">{pharmacist.location}</p>
                                <p className="professional-contact">{pharmacist.phone}</p>
                              </div>
                            </motion.div>
                          ))
                        ) : (
                          <div className="no-professionals">
                            <p>No pharmacists registered yet</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="dermatologists"
                      initial={{ opacity: 0, x: 300 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -300 }}
                      transition={{ duration: 0.5 }}
                      className="carousel-slide"
                    >
                      <div className="slide-header">
                        <div className="role-icon">👨‍⚕️</div>
                        <h3 className="slide-title">Dermatologists</h3>
                        <p className="slide-subtitle">Specialized skin care and treatment</p>
                      </div>
                      
                      <div className="professionals-grid">
                        {dermatologists.length > 0 ? (
                          dermatologists.map((dermatologist) => (
                            <motion.div
                              key={dermatologist.id}
                              className="professional-card dermatologist"
                              whileHover={{ scale: 1.02 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <div className="professional-avatar">👨‍⚕️</div>
                              <div className="professional-info">
                                <h4>Dr. {dermatologist.name}</h4>
                                <p className="professional-store">📍 {dermatologist.storeName}</p>
                                <p className="professional-specialty">{dermatologist.specialty}</p>
                                <p className="professional-experience">{dermatologist.experience} Years Experience</p>
                                <p className="professional-location">{dermatologist.location}</p>
                                <p className="professional-contact">{dermatologist.phone}</p>
                              </div>
                            </motion.div>
                          ))
                        ) : (
                          <div className="no-professionals">
                            <p>No dermatologists registered yet</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Carousel Indicators */}
              <div className="carousel-indicators">
                <button
                  className={`indicator ${currentSlide === 0 ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(0)}
                >
                  Pharmacists
                </button>
                <button
                  className={`indicator ${currentSlide === 1 ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(1)}
                >
                  Dermatologists
                </button>
              </div>
            </div>
          </div>
        )}

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
          
          {/* Default doctor (always shown) */}
          <div className="doctor-card">
            <div className="doctor-avatar">👨‍⚕️</div>
            <div className="doctor-info">
              <h3>Dr. Omkar Swami</h3>
              <p className="doctor-specialty">Alliance Medical</p>
              <p className="doctor-specialty">Ward no 15, MCMX+J25, Chandur Road, behind Suraj Gas Godown, Tambe Mala, Ichalkaranji, Maharashtra 416115</p>
              <p className="doctor-specialty">Contact no.  9011674221</p>
              <p className="doctor-experience">Experience: 10 Years</p>
            </div>
          </div>

          {/* Registered doctors from pharmacists and dermatologists */}
          <AnimatePresence>
            {registeredDoctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="doctor-card registered"
              >
                <div className="doctor-avatar">
                  {doctor.role === 'dermatologist' ? '👨‍⚕️' : '💊'}
                </div>
                <div className="doctor-info">
                  <h3>Dr. {doctor.name}</h3>
                  {doctor.storeName && (
                    <p className="doctor-store">📍 {doctor.storeName}</p>
                  )}
                  <p className="doctor-specialty">{doctor.specialty}</p>
                  <p className="doctor-experience">Experience: {doctor.experience} Years</p>
                  <p className="doctor-location">{doctor.location}</p>
                  <p className="doctor-qualifications">{doctor.qualifications}</p>
                  <p className="doctor-role-badge">
                    Added by: {doctor.role === 'dermatologist' ? 'Dermatologist' : 'Pharmacist'}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

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

      {/* Doctor Registration Modal */}
      <AnimatePresence>
        {showDoctorRegistration && (
          <DoctorRegistration
            onClose={() => setShowDoctorRegistration(false)}
            onDoctorAdded={handleDoctorAdded}
            onDoctorDeleted={handleDoctorDeleted}
            userRole={userRole}
            phoneNumber={phoneNumber}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;