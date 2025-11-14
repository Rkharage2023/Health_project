import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle, Mail } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import VideoCard from '../pages/VideoCard';
import './Dashboard.css';

// Import your local images
import certification1 from '../assets/certificate 1.jpg';
import certification2 from '../assets/certificate 2.jpg';
import certification3 from '../assets/certificate 3.jpg';

const Dashboard = ({ onClose, phone }) => {
  const sidebarVariants = {
    hidden: { x: '-100%' },
    visible: { x: 0 },
  };

  // Use imported local images
  const certificationImages = [
    {
      src: certification1,
      alt: "Dermatology Certification"
    },
    {
      src: certification2,
      alt: "Clinical Laboratory Certification"
    },
    {
      src: certification3,
      alt: "Professional Training Certificate"
    }
  ];

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
        <h1>Welcome.</h1>
      </p>

      <h3 className="section-title primary-section">Primary Protection</h3>
      <div className="video-section">
        <VideoCard
          title="Understanding UV & SPF"
          src="https://www.youtube.com/embed/g2qFq-uS7aE"
          description="A quick guide to broad-spectrum protection and SPF rating."
        />
      </div>

      <h3 className="section-title achievement-section">Pharmacy Achievements</h3>
      <div className="achievements-section">
        <DashboardCard
          title="Clinical Certification"
          content="Certified specialist in Dermatological Photodetection with advanced training in photosensitivity management."
          icon={CheckCircle}
          color="text-green-500"
          images={certificationImages}
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