import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './QuestionnairePage.css';

const QUESTIONS = [
  "Do you experience redness, burning, or a rash after being in sunlight?",
  "Do these symptoms occur only on sun-exposed areas (face, arms, neck)?",
  "Do the symptoms appear within a few hours of sunlight exposure?",
  "Does your skin itch or sting after short time in the sun?",
  "Does your skin react even under weak sunlight or through glass?",
  "Have you started any new medication in the last few weeks?",
  "Did the reaction start or worsen after taking that medicine?",
  "Are you currently using any of these: antibiotics (like doxycycline), NSAIDs, amiodarone, thiazides, sulfa drugs?",
  "Do symptoms improve when the drug is stopped (under medical advice)?",
  "Have you had similar sunlight reactions before?",
  "Does your skin burn easily but rarely tan?",
  "Do you have a family history of sunlight-triggered rashes?",
  "Have you been told by a doctor you have sensitive or photosensitive skin?",
  "Do you need to avoid sunlight because of your medicine or skin reaction?",
  "Do you notice dark spots or peeling after sun exposure?",
];

const QuestionnairePage = ({ setPage, quizAnswers, setQuizAnswers }) => {
  const [currentQ, setCurrentQ] = useState(0);

  const handleAnswer = (answer) => {
    const newAnswers = [...quizAnswers, answer];
    setQuizAnswers(newAnswers);

    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setPage('result');
    }
  };

  const progress = ((currentQ + 1) / QUESTIONS.length) * 100;
  const question = QUESTIONS[currentQ];

  const fadeVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="questionnaire-container">
      <div className="questionnaire-card">
        <h2 className="question-counter">
          Question {currentQ + 1} of {QUESTIONS.length}
        </h2>
        
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
            <p className="question-text">{question}</p>
          </motion.div>
        </AnimatePresence>
        
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
      </div>
    </div>
  );
};

export default QuestionnairePage;