import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import QuestionnairePage from './pages/QuestionnairePage';
import ResultPage from './pages/ResultPage';
import './styles/globals.css';

const App = () => {
  const [page, setPage] = useState('login');
  const [phoneNumber, setPhoneNumber] = useState(localStorage.getItem('phone') || '');
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (phoneNumber) {
      localStorage.setItem('phone', phoneNumber);
    }
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [phoneNumber]);

  const renderPage = useCallback(() => {
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading PhotoSense...</p>
          </div>
        </div>
      );
    }

    switch (page) {
      case 'login':
        return <LoginPage setPage={setPage} setPhoneNumber={setPhoneNumber} />;
      case 'home':
        if (!phoneNumber) return <LoginPage setPage={setPage} setPhoneNumber={setPhoneNumber} />;
        return <HomePage setPage={setPage} setQuizAnswers={setQuizAnswers} />;
      case 'quiz':
        return <QuestionnairePage setPage={setPage} quizAnswers={quizAnswers} setQuizAnswers={setQuizAnswers} />;
      case 'result':
        return <ResultPage setPage={setPage} quizAnswers={quizAnswers} />;
      default:
        return <HomePage setPage={setPage} setQuizAnswers={setQuizAnswers} />;
    }
  }, [page, phoneNumber, quizAnswers, isLoading]);

  return (
    <div className="font-sans min-h-screen">
      <AnimatePresence mode="wait">
        {renderPage()}
      </AnimatePresence>
    </div>
  );
};

export default App;