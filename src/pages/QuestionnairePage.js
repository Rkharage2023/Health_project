import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './QuestionnairePage.css';

const QUESTIONS = [
  // Section 1: General Symptoms
  {
    section: "🩺 Section 1: General Symptoms",
    question: "Do you experience redness, itching, or burning on your skin after exposure to sunlight?"
  },
  {
    section: "🩺 Section 1: General Symptoms", 
    question: "Does this reaction occur only on sun-exposed areas (face, neck, forearms, hands)?"
  },
  {
    section: "🩺 Section 1: General Symptoms",
    question: "Do you notice these reactions appearing within a few hours after sun exposure?"
  },
  {
    section: "🩺 Section 1: General Symptoms",
    question: "Have you ever developed rashes, blisters, or peeling after being in sunlight?"
  },
  {
    section: "🩺 Section 1: General Symptoms",
    question: "Does your skin remain sensitive for several days even after avoiding sunlight?"
  },
  
  // Section 2: Drug Association
  {
    section: "💊 Section 2: Drug Association",
    question: "Have you started any new medication in the last 2–4 weeks?"
  },
  {
    section: "💊 Section 2: Drug Association",
    question: "Did the skin reaction begin after starting that medication?"
  },
  {
    section: "💊 Section 2: Drug Association", 
    question: "Does the reaction reduce or disappear when you stop the medicine?"
  },
  {
    section: "💊 Section 2: Drug Association",
    question: "Are you currently taking any of the following: antibiotics, NSAIDs, diuretics, retinoids, or antifungals?"
  },
  {
    section: "💊 Section 2: Drug Association",
    question: "Have you ever noticed worsening skin reaction when taking a medicine and going out in the sun?"
  },
  
  // Section 3: Pattern & Severity
  {
    section: "☀ Section 3: Pattern & Severity", 
    question: "Does your skin tolerate indoor light but react to direct sunlight?"
  },
  {
    section: "☀ Section 3: Pattern & Severity",
    question: "Do you notice dark pigmentation or spots after the redness subsides?"
  },
  {
    section: "☀ Section 3: Pattern & Severity",
    question: "Do you experience eye irritation or tearing when exposed to sunlight while on medication?"
  },
  {
    section: "☀ Section 3: Pattern & Severity",
    question: "Have you ever been told by a doctor that your reaction is drug-related or photosensitive?"
  },
  {
    section: "☀ Section 3: Pattern & Severity",
    question: "Do you have a family history of similar sunlight-related reactions?"
  },
  
  // Image Upload Section
  {
    section: "📷 Additional Information",
    question: "Upload images of affected areas (optional)"
  }
];

const QuestionnairePage = ({ setPage, quizAnswers, setQuizAnswers }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleAnswer = (answer) => {
    const newAnswers = [...quizAnswers, answer];
    setQuizAnswers(newAnswers);

    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setPage('result');
    }
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedImages(prev => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const progress = ((currentQ + 1) / QUESTIONS.length) * 100;
  const questionData = QUESTIONS[currentQ];
  const isImageQuestion = currentQ === QUESTIONS.length - 1;

  const fadeVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="questionnaire-container">
      <div className="questionnaire-card">
        <div className="question-header">
          <h2 className="section-indicator">{questionData.section}</h2>
          <h3 className="question-counter">
            Question {currentQ + 1} of {QUESTIONS.length}
          </h3>
        </div>
        
        <div className="progress-container">
          <motion.div
            className="progress-bar"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          ></motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="question-content"
          >
            <p className="question-text">{questionData.question}</p>
            
            {isImageQuestion && (
              <div className="image-upload-section">
                <div className="upload-area">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="file-input"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="upload-label">
                    <div className="upload-icon">📷</div>
                    <p>Click to upload images</p>
                    <span>or drag and drop</span>
                  </label>
                </div>
                
                {uploadedImages.length > 0 && (
                  <div className="uploaded-images">
                    <h4>Uploaded Images ({uploadedImages.length})</h4>
                    <div className="image-grid">
                      {uploadedImages.map((file, index) => (
                        <div key={index} className="image-preview">
                          <img 
                            src={URL.createObjectURL(file)} 
                            alt={`Upload ${index + 1}`}
                            className="preview-image"
                          />
                          <button 
                            onClick={() => removeImage(index)}
                            className="remove-image"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        
        {!isImageQuestion ? (
          <div className="answer-buttons">
            <motion.button
              onClick={() => handleAnswer(true)}
              className="answer-button yes-button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Yes
            </motion.button>
            <motion.button
              onClick={() => handleAnswer(false)}
              className="answer-button no-button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              No
            </motion.button>
          </div>
        ) : (
          <div className="image-actions">
            <motion.button
              onClick={() => handleAnswer(true)}
              className="continue-button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Continue to Results
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionnairePage;