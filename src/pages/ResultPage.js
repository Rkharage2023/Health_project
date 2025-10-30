import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Home, RefreshCw } from 'lucide-react';
import './ResultPage.css';

const STAGE_MAPPING = {
  mild: {
    range: "0–5 Yes answers",
    stage: "Stage 1 (Mild Photosensitivity Risk)",
    color: "result-mild",
    bgColor: "result-bg-mild",
    treatment: "Your risk appears mild. Focus on **daily broad-spectrum SPF 30+**, protective clothing, and avoiding peak sun hours (10 AM - 4 PM). Monitor your skin for changes.",
  },
  moderate: {
    range: "6–10 Yes answers",
    stage: "Stage 2 (Moderate Photosensitivity)",
    color: "result-moderate",
    bgColor: "result-bg-moderate",
    treatment: "You show signs of moderate photosensitivity. Strict sun avoidance and wearing **UV-protective clothing** (UPF rated) are essential. Consult a dermatologist to review medications or conditions.",
  },
  severe: {
    range: "11–15 Yes answers",
    stage: "Stage 3 (Severe Photosensitivity)",
    color: "result-severe",
    bgColor: "result-bg-severe",
    treatment: "Your responses indicate severe photosensitivity or a high likelihood of a photo-induced condition. You must minimize sun exposure. **Seek immediate consultation** with a healthcare professional to identify and manage the underlying cause.",
  },
};

const ResultPage = ({ setPage, quizAnswers }) => {
  const yesCount = quizAnswers.filter(answer => answer === true).length;
  let result;

  if (yesCount <= 5) {
    result = STAGE_MAPPING.mild;
  } else if (yesCount <= 10) {
    result = STAGE_MAPPING.moderate;
  } else {
    result = STAGE_MAPPING.severe;
  }

  const handleGoHome = () => setPage('home');
  const handleRetake = () => setPage('quiz');

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="result-container"
    >
      <div className="result-card">
        <CheckCircle size={64} className={`result-icon ${result.color}`} />
        
        <h1 className="result-title">Assessment Complete!</h1>
        <p className="result-subtitle">
          Based on your answers, here is your photosensitivity assessment:
        </p>

        <div className={`result-box ${result.bgColor} ${result.color}`}>
          <h2 className={`result-stage ${result.color}`}>{result.stage}</h2>
          <p className="result-count">
            (Count: **{yesCount}** 'Yes' answers, which falls into the {result.range} category.)
          </p>
        </div>

        <div className="treatment-section">
          <h3 className="treatment-title">Suggested Next Steps</h3>
          <p className="treatment-text">{result.treatment}</p>
        </div>

        <div className="action-buttons">
          <motion.button
            onClick={handleRetake}
            className="action-button retake-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RefreshCw size={20} className="button-icon" /> Retake Test
          </motion.button>
          <motion.button
            onClick={handleGoHome}
            className="action-button home-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Home size={20} className="button-icon" /> Go Back to Home
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultPage;