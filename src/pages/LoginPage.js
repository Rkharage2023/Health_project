import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Smartphone, User, Pill, Stethoscope } from 'lucide-react';
import './LoginPage.css';

const LoginPage = ({ setPage, setPhoneNumber, setUserRole }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [selectedRole, setSelectedRole] = useState('user');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    const digits = input.replace(/\D/g, '');
    
    if (digits.length === 10) {
      setPhoneNumber(digits);
      setUserRole(selectedRole);
      setPage('home');
    } else {
      setError('Please enter a valid 10-digit phone number.');
    }
  };

  const roles = [
    { id: 'user', label: 'User', icon: User, description: 'Get personalized skin assessments' },
    { id: 'pharmacist', label: 'Pharmacist', icon: Pill, description: 'Manage medications and consultations' },
    { id: 'dermatologist', label: 'Dermatologist', icon: Stethoscope, description: 'Provide expert skin care' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="login-container"
    >
      <div className="login-card">
        <div className="login-header">
          <Smartphone className="login-icon" />
          <h1 className="login-title">Welcome to PhotoGuard</h1>
          <p className="login-subtitle">Choose your role to continue</p>
        </div>

        {/* Role Selection */}
        <div className="role-selection">
          {roles.map((role) => (
            <motion.div
              key={role.id}
              className={`role-card ${selectedRole === role.id ? 'selected' : ''}`}
              onClick={() => setSelectedRole(role.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <role.icon size={24} className="role-icon" />
              <div className="role-info">
                <h3>{role.label}</h3>
                <p>{role.description}</p>
              </div>
              {selectedRole === role.id && (
                <motion.div
                  className="selection-indicator"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.div>
          ))}
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <div className="input-container">
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="e.g., 9876543210"
                maxLength="10"
                required
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="form-input"
              />
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="login-button"
          >
            Login as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} 
            <ChevronRight size={20} className="button-icon" />
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default LoginPage;