import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Menu, ChevronRight } from 'lucide-react';
import Dashboard from '../components/Dashboard';
import './HomePage.css';

const HomePage = ({ setPage, setQuizAnswers }) => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const phone = localStorage.getItem('phone') || '0000000000';

  const startTest = () => {
    setQuizAnswers([]);
    setPage('quiz');
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-left">
          <Home className="header-icon" />
          <h1 className="header-title">PhotoSense</h1>
        </div>
        <motion.button
          onClick={() => setIsDashboardOpen(true)}
          className="menu-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Menu size={24} />
        </motion.button>
      </header>

      <main className="home-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="home-content"
        >
          <div className="assessment-card">
            <h2 className="assessment-title">Your Photosensitivity Assessment</h2>
            <p className="assessment-description">
              Take the quick 15-question test to understand your skin's risk level regarding sun exposure and potential light-induced reactions.
            </p>

            <motion.button
              onClick={startTest}
              className="start-test-button"
              whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(16, 185, 129, 0.4)" }}
              whileTap={{ scale: 0.98 }}
            >
              Start Health Test <ChevronRight size={22} className="button-icon" />
            </motion.button>
          </div>
        </motion.div>
      </main>

      <AnimatePresence>
        {isDashboardOpen && <Dashboard onClose={() => setIsDashboardOpen(false)} phone={phone} />}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;