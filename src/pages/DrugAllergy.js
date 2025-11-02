import React from 'react';
import { motion } from 'framer-motion';
import './DrugAllergy.css';

const DrugAllergy = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="drug-allergy-container"
    >
      <div className="drug-allergy-content">
        {/* Header Section */}
        <div className="drug-allergy-header">
          <h1 className="drug-allergy-title">Food Drug Allergy</h1>
          <p className="drug-allergy-subtitle">
            Understanding food-drug interactions and allergies for better health management
          </p>
        </div>

        {/* Section 1: Food's might cause allergy */}
        <div className="allergy-section">
          <h2 className="section-title">1. Food's might cause allergy</h2>
          <div className="info-space">
            {/* Empty space for information - content to be added later */}
          </div>
        </div>

        {/* Section 2: Wrong combination of food's and drug */}
        <div className="allergy-section">
          <h2 className="section-title">2. Wrong combination of food's and drug</h2>
          <div className="info-space">
            {/* Empty space for information - content to be added later */}
          </div>
        </div>

        {/* Section 3: Common problem of food-drug interactions */}
        <div className="allergy-section">
          <h2 className="section-title">3. Common problem of food-drug interactions</h2>
          <div className="interactions-list">
            <div className="interaction-item">
              <h3 className="interaction-point">a. Dairy products and antibiotics:</h3>
              <p className="interaction-detail">
                Dairy products like milk, yogurt, and cheese
              </p>
            </div>
            
            <div className="interaction-item">
              <h3 className="interaction-point">b. Grapefruit and certain medications:</h3>
              <p className="interaction-detail">
                {/* Content will be added here later */}
              </p>
            </div>
            
            <div className="interaction-item">
              <h3 className="interaction-point">c. Alcohol and medications:</h3>
              <p className="interaction-detail">
                {/* Content will be added here later */}
              </p>
            </div>
            
            <div className="interaction-item">
              <h3 className="interaction-point">d. Green leafy vegetables and blood thinners:</h3>
              <p className="interaction-detail">
                {/* Content will be added here later */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DrugAllergy;