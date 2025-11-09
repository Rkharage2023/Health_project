import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Home, RefreshCw, Phone, MessageCircle } from 'lucide-react';
import './ResultPage.css';

const STAGE_MAPPING = {
  mild: {
    range: "0–5 Yes answers",
    stage: "Stage 1 (Mild Photosensitivity Risk)",
    color: "result-mild",
    bgColor: "result-bg-mild",
    treatment: "Your risk appears mild. Focus on **daily broad-spectrum SPF 30+**, protective clothing, and avoiding peak sun hours (10 AM - 4 PM). Monitor your skin for changes.",
    medications: [
      "Aloe vera gel / Aloe lotion - Soothes irritated skin (use fragrance-free)",
      "Calamine lotion - Reduces itching and redness (apply 2-3 times daily)",
      "Moisturizers with ceramides - Repairs skin barrier (good for dryness/peeling)",
      "0.5–1% Hydrocortisone cream - Reduces inflammation, redness, itching (short-term use only - 3-5 days)"
    ]
  },
  moderate: {
    range: "6–10 Yes answers",
    stage: "Stage 2 (Moderate Photosensitivity)",
    color: "result-moderate",
    bgColor: "result-bg-moderate",
    treatment: "You show signs of moderate photosensitivity. Strict sun avoidance and wearing **UV-protective clothing** (UPF rated) are essential. Consult a dermatologist to review medications or conditions.",
    medications: [
      "Cetirizine - 10 mg once daily (non-sedating antihistamine)",
      "Loratadine - 10 mg once daily (non-drowsy)"
    ]
  },
  severe: {
    range: "11–13 Yes answers",
    stage: "Stage 3 (Severe Photosensitivity)",
    color: "result-severe",
    bgColor: "result-bg-severe",
    treatment: "Your responses indicate severe photosensitivity or a high likelihood of a photo-induced condition. You must minimize sun exposure. **Seek immediate consultation** with a healthcare professional to identify and manage the underlying cause.",
    medications: [
      "Fexofenadine - 120-180 mg once daily (stronger option for itching)",
      "Diphenhydramine (Benadryl) - 25 mg at night (causes drowsiness - avoid driving)"
    ]
  },
  critical: {
    range: "14–15 Yes answers",
    stage: "Stage 4 (Critical Photosensitivity)",
    color: "result-critical",
    bgColor: "result-bg-critical",
    treatment: "Your responses indicate critical photosensitivity requiring immediate medical attention. Please contact a healthcare professional immediately for proper diagnosis and treatment.",
    medications: []
  }
};

const ResultPage = ({ setPage, quizAnswers }) => {
  const yesCount = quizAnswers.filter(answer => answer === true).length;
  let result;

  if (yesCount <= 5) {
    result = STAGE_MAPPING.mild;
  } else if (yesCount <= 10) {
    result = STAGE_MAPPING.moderate;
  } else if (yesCount <= 13) {
    result = STAGE_MAPPING.severe;
  } else {
    result = STAGE_MAPPING.critical;
  }

  const handleGoHome = () => setPage('home');
  const handleRetake = () => setPage('quiz');

  // Contact functions
  const handleCallDoctor = () => {
    const phoneNumber = "+1234567890"; // Replace with actual doctor's number
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      // Mobile device
      window.location.href = `tel:${phoneNumber}`;
    } else {
      // PC - show number and instructions
      alert(`Please call: ${phoneNumber}\n\nOn mobile devices, this would automatically open your dialer.`);
    }
  };

  const handleMessageDoctor = () => {
    const phoneNumber = "+1234567890"; // Replace with actual doctor's number
    const message = "Hello, I need to schedule an appointment regarding photosensitivity concerns from the assessment.";
    
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      // Mobile device
      window.location.href = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
    } else {
      // PC - show instructions
      alert(`To message the doctor:\n\nNumber: ${phoneNumber}\nMessage: ${message}\n\nOn mobile devices, this would automatically open your messaging app.`);
    }
  };

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
            (Count: **{yesCount}** 'Yes' answers)
          </p>
        </div>

        <div className="treatment-section">
          <h3 className="treatment-title">Suggested Next Steps</h3>
          <p className="treatment-text">{result.treatment}</p>
          
          {result === STAGE_MAPPING.critical ? (
            <div className="critical-contact-section">
              <div className="doctor-info">
                <h4 className="contact-title">🚨 Immediate Medical Attention Recommended</h4>
                <p className="contact-message">
                  Based on your assessment results, we strongly recommend contacting a healthcare professional immediately for proper diagnosis and treatment.
                </p>
                
                <div className="contact-options">
                  <motion.button
                    onClick={handleCallDoctor}
                    className="contact-button call-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Phone size={20} className="button-icon" />
                    Call Healthcare Provider
                  </motion.button>
                  
                  <motion.button
                    onClick={handleMessageDoctor}
                    className="contact-button message-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageCircle size={20} className="button-icon" />
                    Message Healthcare Provider
                  </motion.button>
                </div>
                
                <p className="contact-disclaimer">
                  Note: These contact options will connect you with our recommended healthcare provider. On mobile devices, they will open your phone dialer and messaging app automatically.
                </p>
              </div>
            </div>
          ) : (
            <div className="medications-section">
              <h4 className="medications-title">
                {result === STAGE_MAPPING.mild ? "Topical Options (Over-the-counter):" : "Oral OTC Options (for itching or allergic-type reaction):"}
              </h4>
              <ul className="medications-list">
                {result.medications.map((medication, index) => (
                  <li key={index} className="medication-item">
                    {medication}
                  </li>
                ))}
              </ul>
              <p className="medication-disclaimer">
                {result === STAGE_MAPPING.mild 
                  ? "These can help with sunburn-like symptoms, itching, redness, and inflammation."
                  : "These antihistamines help if the photosensitivity has an allergic or rash component."
                }
              </p>
              <p className="medical-warning">
                ⚠️ Always consult with a healthcare professional before starting any new medication.
              </p>
            </div>
          )}
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