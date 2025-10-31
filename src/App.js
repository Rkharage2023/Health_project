import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion'; // Added motion import
import SplashScreen from './components/SplashScreen';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/Profilepage';
import VideosPage from './pages/VideoCard';
import QuestionnairePage from './pages/QuestionnairePage';
import ResultPage from './pages/ResultPage';
import Navbar from './components/Navbar';
import './styles/globals.css';

const App = () => {
  const [page, setPage] = useState('splash');
  const [activeTab, setActiveTab] = useState('home');
  const [phoneNumber, setPhoneNumber] = useState(localStorage.getItem('phone') || '');
  const [quizAnswers, setQuizAnswers] = useState([]);

  useEffect(() => {
    if (phoneNumber) {
      localStorage.setItem('phone', phoneNumber);
    }
  }, [phoneNumber]);

  const handleSplashComplete = () => {
    if (phoneNumber) {
      setPage('main');
      setActiveTab('home');
    } else {
      setPage('login');
    }
  };

  // Debug function to check state
  useEffect(() => {
    console.log('Current activeTab:', activeTab);
    console.log('Current page:', page);
  }, [activeTab, page]);

  const renderPage = useCallback(() => { // Fixed: Added this function
    switch (page) {
      case 'splash':
        return <SplashScreen onComplete={handleSplashComplete} />;
      case 'login':
        return <LoginPage setPage={setPage} setPhoneNumber={setPhoneNumber} />;
      case 'main':
        return (
          <div className="app-container">
            <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
            <main className="main-content">
              <AnimatePresence mode="wait">
                {activeTab === 'home' && (
                  <motion.div
                    key="home"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <HomePage setPage={setPage} setQuizAnswers={setQuizAnswers} />
                  </motion.div>
                )}
                {activeTab === 'videos' && (
                  <motion.div
                    key="videos"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <VideosPage />
                  </motion.div>
                )}
                {activeTab === 'profile' && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <ProfilePage setPage={setPage} />
                  </motion.div>
                )}
              </AnimatePresence>
            </main>
          </div>
        );
      case 'quiz':
        return <QuestionnairePage setPage={setPage} quizAnswers={quizAnswers} setQuizAnswers={setQuizAnswers} />;
      case 'result':
        return <ResultPage setPage={setPage} quizAnswers={quizAnswers} />;
      default:
        return (
          <div className="app-container">
            <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
            <main className="main-content">
              <HomePage setPage={setPage} setQuizAnswers={setQuizAnswers} />
            </main>
          </div>
        );
    }
  }, [page, activeTab, phoneNumber, quizAnswers]);

  return (
    <div className="font-sans min-h-screen">
      <AnimatePresence mode="wait">
        {renderPage()}
      </AnimatePresence>
    </div>
  );
};

export default App;