import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Smartphone } from 'lucide-react';
import './LoginPage.css';

const LoginPage = ({ setPage, setPhoneNumber }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    const digits = input.replace(/\D/g, '');
    if (digits.length === 10) {
      setPhoneNumber(digits);
      setPage('home');
    } else {
      setError('Please enter a valid 10-digit phone number.');
    }
  };

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
          <p className="login-subtitle">Start your personalized photosensitivity assessment.</p>
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
            Verify & Proceed <ChevronRight size={20} className="button-icon" />
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default LoginPage;