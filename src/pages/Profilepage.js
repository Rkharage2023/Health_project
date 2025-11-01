import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Calendar, Save, Edit, AlertCircle, LogOut, Home } from 'lucide-react';
import './ProfilePage.css';

const Profilepage = ({ setPage, onProfileComplete }) => {
  const [isEditing, setIsEditing] = useState(true);
  const [profile, setProfile] = useState({
    name: '',
    location: '',
    age: '',
    gender: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Load profile data from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    const phone = localStorage.getItem('phone');
    const profileCompleted = localStorage.getItem('profileCompleted');
    
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
      setIsEditing(false);
    }
    
    if (phone) {
      setProfile(prev => ({ ...prev, phone }));
    }

    if (profileCompleted === 'true') {
      setIsSubmitted(true);
      setIsEditing(false);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!profile.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!profile.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!profile.age) {
      newErrors.age = 'Age is required';
    } else if (profile.age < 1 || profile.age > 120) {
      newErrors.age = 'Please enter a valid age (1-120)';
    }
    
    if (!profile.gender) {
      newErrors.gender = 'Gender is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      localStorage.setItem('userProfile', JSON.stringify(profile));
      localStorage.setItem('profileCompleted', 'true');
      setIsEditing(false);
      setIsSubmitted(true);
      
      // Call the completion callback if provided
      if (onProfileComplete) {
        onProfileComplete();
      } else {
        // Fallback: redirect to home if callback not provided
        setTimeout(() => {
          if (setPage) {
            setPage('home');
          }
        }, 1500);
      }
      
      alert('Profile completed successfully! You can now use all features.');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('phone');
    localStorage.removeItem('userProfile');
    localStorage.removeItem('profileCompleted');
    localStorage.removeItem('quizAnswers');
    window.location.reload();
  };

  const goToHome = () => {
    if (setPage) {
      setPage('home');
    }
  };

  const calculateCompletion = () => {
    const fields = ['name', 'location', 'age', 'gender'];
    const completedFields = fields.filter(field => profile[field]).length;
    return Math.round((completedFields / fields.length) * 100);
  };

  const getGenderDisplay = (gender) => {
    const genderMap = {
      male: '👨 Male',
      female: '👩 Female', 
      other: '⚧ Other',
      'prefer-not-to-say': '🙈 Prefer not to say'
    };
    return genderMap[gender] || (gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : 'Not provided');
  };

  // If profile is not completed, show mandatory form WITH LOGOUT
  if (!isSubmitted) {
    return (
      <div className="profile-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="profile-content"
        >
          {/* Add Home button in header */}
          <div className="profile-top-bar">
            <button className="home-button" onClick={goToHome}>
              <Home size={20} />
              Home
            </button>
          </div>

          {/* Mandatory Profile Completion Header */}
          <div className="mandatory-header">
            <AlertCircle size={48} className="alert-icon" />
            <h1 className="mandatory-title">Complete Your Profile</h1>
            <p className="mandatory-subtitle">
              Please fill in your details to continue using PhotoGuard. This helps us provide personalized recommendations.
            </p>
          </div>

          {/* Profile Form */}
          <div className="profile-form-section mandatory-form">
            <h2 className="section-title">Personal Information</h2>
            <p className="form-required-text">All fields are required</p>
            
            <div className="form-grid">
              {/* Name Field */}
              <div className="form-group">
                <label className="form-label required">
                  <User size={18} />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder="Enter your full name"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              {/* Location Field */}
              <div className="form-group">
                <label className="form-label required">
                  <MapPin size={18} />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={profile.location}
                  onChange={handleInputChange}
                  className={`form-input ${errors.location ? 'error' : ''}`}
                  placeholder="Enter your city"
                />
                {errors.location && <span className="error-message">{errors.location}</span>}
              </div>

              {/* Age Field */}
              <div className="form-group">
                <label className="form-label required">
                  <Calendar size={18} />
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={profile.age}
                  onChange={handleInputChange}
                  className={`form-input ${errors.age ? 'error' : ''}`}
                  placeholder="Enter your age"
                  min="1"
                  max="120"
                />
                {errors.age && <span className="error-message">{errors.age}</span>}
              </div>

              {/* Gender Field */}
              <div className="form-group">
                <label className="form-label required">
                  <span style={{ fontSize: '18px' }}>👤</span>
                  Gender
                </label>
                <select
                  name="gender"
                  value={profile.gender}
                  onChange={handleInputChange}
                  className={`form-input ${errors.gender ? 'error' : ''}`}
                >
                  <option value="">Select Gender</option>
                  <option value="male">👨 Male</option>
                  <option value="female">👩 Female</option>
                  <option value="other">⚧ Other</option>
                  <option value="prefer-not-to-say">🙈 Prefer not to say</option>
                </select>
                {errors.gender && <span className="error-message">{errors.gender}</span>}
              </div>

              {/* Phone Field (Read-only) */}
              <div className="form-group">
                <label className="form-label">
                  <User size={18} />
                  Phone Number
                </label>
                <div className="profile-field-display phone-field">
                  {profile.phone || 'Not available'}
                </div>
              </div>
            </div>

            <div className="completion-section">
              <h3 className="section-title">Profile Progress</h3>
              <div className="completion-bar">
                <div 
                  className="completion-progress"
                  style={{ 
                    width: `${calculateCompletion()}%` 
                  }}
                ></div>
              </div>
              <p className="completion-text">
                {calculateCompletion()}% complete - {calculateCompletion() === 100 ? 'Ready to submit!' : 'Fill all fields to continue'}
              </p>
            </div>

            <div className="form-actions">
              <button className="save-button primary" onClick={handleSave}>
                <Save size={20} />
                Complete Profile
              </button>
              
              {/* LOGOUT BUTTON - ALWAYS AVAILABLE */}
              <button 
                className="logout-button-secondary"
                onClick={handleLogout}
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // If profile is completed, show the COMPLETE profile view with all sections
  return (
    <div className="profile-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="profile-content"
      >
        {/* Add Home button in header */}
        <div className="profile-top-bar">
          <button className="home-button" onClick={goToHome}>
            <Home size={20} />
            Home
          </button>
        </div>

        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <User size={40} className="avatar-icon" />
          </div>
          <div className="profile-info">
            <h1 className="profile-name">
              {profile.name}
            </h1>
            <p className="profile-tagline">
              Your profile is complete! Thank you for providing your information.
            </p>
          </div>
          <button 
            className="edit-button"
            onClick={handleEdit}
          >
            <Edit size={20} />
            Edit
          </button>
        </div>

        {/* View Mode - Display Profile Info */}
        {!isEditing ? (
          <>
            {/* Profile Display Section */}
            <div className="profile-display-section">
              <h2 className="section-title">Your Information</h2>
              <div className="info-grid">
                <div className="info-item">
                  <label>Full Name</label>
                  <div className="info-value">{profile.name}</div>
                </div>
                <div className="info-item">
                  <label>Location</label>
                  <div className="info-value">{profile.location}</div>
                </div>
                <div className="info-item">
                  <label>Age</label>
                  <div className="info-value">{profile.age} years</div>
                </div>
                <div className="info-item">
                  <label>Gender</label>
                  <div className="info-value">{getGenderDisplay(profile.gender)}</div>
                </div>
                <div className="info-item">
                  <label>Phone Number</label>
                  <div className="info-value phone">{profile.phone}</div>
                </div>
              </div>
            </div>

            {/* Profile Completion Status */}
            <div className="completion-section completed">
              <h3 className="section-title">Profile Status</h3>
              <div className="completion-bar">
                <div className="completion-progress" style={{ width: '100%' }}></div>
              </div>
              <p className="completion-text success">
                ✅ 100% complete - Your profile is fully set up!
              </p>
            </div>

            {/* Action Cards */}
            <div className="profile-actions">
              <h3 className="section-title">Quick Actions</h3>
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

            {/* App Info */}
            <div className="app-info-section">
              <div className="app-info">
                <h4>PhotoGuard</h4>
                <p>Version 1.0.0</p>
              </div>
            </div>
          </>
        ) : (
          /* Edit Mode */
          <div className="profile-form-section">
            <h2 className="section-title">Edit Personal Information</h2>
            
            <div className="form-grid">
              {/* Name Field */}
              <div className="form-group">
                <label className="form-label">
                  <User size={18} />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Location Field */}
              <div className="form-group">
                <label className="form-label">
                  <MapPin size={18} />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={profile.location}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your city"
                />
              </div>

              {/* Age Field */}
              <div className="form-group">
                <label className="form-label">
                  <Calendar size={18} />
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={profile.age}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your age"
                  min="1"
                  max="120"
                />
              </div>

              {/* Gender Field */}
              <div className="form-group">
                <label className="form-label">
                  <span style={{ fontSize: '18px' }}>👤</span>
                  Gender
                </label>
                <select
                  name="gender"
                  value={profile.gender}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="">Select Gender</option>
                  <option value="male">👨 Male</option>
                  <option value="female">👩 Female</option>
                  <option value="other">⚧ Other</option>
                  <option value="prefer-not-to-say">🙈 Prefer not to say</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button className="save-button" onClick={handleSave}>
                <Save size={20} />
                Save Changes
              </button>
              <button 
                className="cancel-button" 
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Logout Section */}
        <div className="logout-section">
          <button
            onClick={handleLogout}
            className="logout-button"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Profilepage;