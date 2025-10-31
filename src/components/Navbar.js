import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Video, User, Menu, Stethoscope } from 'lucide-react';
import Dashboard from './Dashboard';
import './Navbar.css';

const Navbar = ({ activeTab, setActiveTab }) => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const phone = localStorage.getItem('phone') || '0000000000';

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const handleTabClick = (tabId) => {
    console.log('Tab clicked:', tabId);
    setActiveTab(tabId);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Left Section - Logo and Dashboard */}
          <div className="navbar-left">
            <motion.button
              className="dashboard-toggle"
              onClick={() => setIsDashboardOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Menu size={24} />
            </motion.button>
            
            <div className="navbar-brand">
              <Stethoscope className="logo-icon" size={28} />
              <h1 className="navbar-title">PhotoGuard</h1>
            </div>
          </div>
          
          {/* Center Section - Navigation Tabs */}
          <div className="navbar-center">
            <div className="navbar-tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    className={`navbar-tab ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => handleTabClick(tab.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={20} />
                    <span>{tab.label}</span>
                    {activeTab === tab.id && (
                      <motion.div
                        className="active-indicator"
                        layoutId="activeTab"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
          
          {/* Right Section - Placeholder for balance */}
          <div className="navbar-right">
            <div className="navbar-placeholder"></div>
          </div>
        </div>
      </nav>

      {/* Dashboard Sidebar */}
      <AnimatePresence>
        {isDashboardOpen && (
          <Dashboard 
            onClose={() => setIsDashboardOpen(false)} 
            phone={phone} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;