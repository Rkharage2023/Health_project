import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Save, User, MapPin, Calendar, Award, Mail, Store, Trash2 } from 'lucide-react';
import './DoctorRegistration.css';

const DoctorRegistration = ({ onClose, onDoctorAdded, onDoctorDeleted, userRole, phoneNumber }) => {
  const [formData, setFormData] = useState({
    name: '',
    storeName: '',
    specialty: '',
    experience: '',
    location: '',
    email: '',
    phone: '',
    qualifications: ''
  });

  // Get existing doctors for the current user
  const existingDoctors = JSON.parse(localStorage.getItem('registeredDoctors') || '[]');
  
  // Filter doctors by current user's phone number and role
  const userDoctors = existingDoctors.filter(doctor => 
    doctor.userPhone === phoneNumber && doctor.role === userRole
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save doctor info to localStorage
    const doctorInfo = {
      ...formData,
      role: userRole,
      userPhone: phoneNumber, // Store user's phone number
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    
    const updatedDoctors = [...existingDoctors, doctorInfo];
    localStorage.setItem('registeredDoctors', JSON.stringify(updatedDoctors));
    
    if (onDoctorAdded) {
      onDoctorAdded(doctorInfo);
    }
    
    alert('Doctor information added successfully!');
    onClose();
  };

  const handleDelete = (doctorId) => {
    if (window.confirm('Are you sure you want to delete this doctor information?')) {
      const updatedDoctors = existingDoctors.filter(doctor => doctor.id !== doctorId);
      localStorage.setItem('registeredDoctors', JSON.stringify(updatedDoctors));
      
      if (onDoctorDeleted) {
        onDoctorDeleted(doctorId);
      }
      
      alert('Doctor information deleted successfully!');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="doctor-registration-overlay"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="doctor-registration-modal"
      >
        <div className="modal-header">
          <h2>Manage Doctor Information</h2>
          <button onClick={onClose} className="close-button">
            <X size={24} />
          </button>
        </div>

        {/* Show existing doctor information with delete option */}
        {userDoctors.length > 0 && (
          <div className="existing-doctors-section">
            <h3 className="existing-doctors-title">Your Registered Doctors</h3>
            <p className="existing-doctors-subtitle">
              You have registered {userDoctors.length} doctor(s)
            </p>
            <div className="existing-doctors-list">
              {userDoctors.map((doctor) => (
                <div key={doctor.id} className="existing-doctor-card">
                  <div className="doctor-details">
                    <h4>Dr. {doctor.name}</h4>
                    <p className="doctor-store">{doctor.storeName}</p>
                    <p className="doctor-specialty">{doctor.specialty}</p>
                    <p className="doctor-experience">{doctor.experience} years experience</p>
                  </div>
                  <motion.button
                    onClick={() => handleDelete(doctor.id)}
                    className="delete-doctor-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Trash2 size={16} />
                    Delete
                  </motion.button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Show message if no doctors found */}
        {userDoctors.length === 0 && (
          <div className="no-doctors-message">
            <p>No doctors registered with your account yet.</p>
          </div>
        )}

        {/* Add New Doctor Form */}
        <div className="add-doctor-section">
          <h3 className="add-doctor-title">
            {userDoctors.length > 0 ? 'Add Another Doctor' : 'Add New Doctor Information'}
          </h3>
          <form onSubmit={handleSubmit} className="doctor-form">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  <User size={18} />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Store size={18} />
                  Store Name
                </label>
                <input
                  type="text"
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter store or clinic name"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Award size={18} />
                  Specialty
                </label>
                <input
                  type="text"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., Dermatology, Pharmacology"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Calendar size={18} />
                  Experience (Years)
                </label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Years of experience"
                  min="0"
                  max="50"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <MapPin size={18} />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="City, State"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Mail size={18} />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <User size={18} />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Doctor's phone number"
                  required
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label className="form-label">Qualifications</label>
              <textarea
                name="qualifications"
                value={formData.qualifications}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Medical degrees, certifications, etc."
                rows="3"
                required
              />
            </div>

            <div className="form-actions">
              <motion.button
                type="button"
                onClick={onClose}
                className="cancel-button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                className="save-button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Save size={20} />
                Save Information
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DoctorRegistration;