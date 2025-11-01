import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle, Mail } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import VideoCard from '../pages/VideoCard';
import './Dashboard.css';

const Dashboard = ({ onClose, phone }) => {
  const sidebarVariants = {
    hidden: { x: '-100%' }, // Changed from right to left
    visible: { x: 0 },
  };

  return (
    <motion.div
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ type: "tween", duration: 0.3 }}
      className="dashboard-sidebar"
    >
      <div className="dashboard-header">
        <h2 className="dashboard-title">Dashboard</h2>
        <motion.button
          onClick={onClose}
          className="close-button"
          whileHover={{ rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <XCircle size={24} />
        </motion.button>
      </div>

      <p className="dashboard-welcome">
        <h1 >
        Welcome.
        </h1>
      </p>

      <h3 className="section-title primary-section">Primary Protection</h3>
      <div className="video-section">
        <VideoCard
          title="Understanding UV & SPF"
          src="https://www.youtube.com/embed/g2qFq-uS7aE"
          description="A quick guide to broad-spectrum protection and SPF rating."
        />
        <VideoCard
          title="Managing Drug-Induced Photosensitivity"
          src="https://www.youtube.com/embed/n3H-l7Q9-2U"
          description="Tips for patients on light-sensitizing medications."
        />
      </div>

      <h3 className="section-title achievement-section">Pharmacy Achievements</h3>
      <div className="achievements-section">
        <DashboardCard
          title="Clinical Certification"
          content="Certified specialist in Dermatological Photodetection."
          icon={CheckCircle}
          color="text-green-500"
        />
        <DashboardCard
          title="5000+ Consultations"
          content="Successfully managed over five thousand patient cases involving sun-related skin reactions."
          icon={Mail}
          color="text-blue-500"
        />
      </div>
    </motion.div>
  );
};

export default Dashboard;