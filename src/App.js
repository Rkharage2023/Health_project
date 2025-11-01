import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
  const [isProfileCompleted, setIsProfileCompleted] = useState(false);

  // Check profile completion status
  useEffect(() => {
    const checkProfileCompletion = () => {
      const completed = localStorage.getItem('profileCompleted') === 'true';
      setIsProfileCompleted(completed);
    };

    checkProfileCompletion();
    
    // Listen for storage changes (when profile gets completed)
    const handleStorageChange = () => {
      checkProfileCompletion();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    if (phoneNumber) {
      localStorage.setItem('phone', phoneNumber);
    }
  }, [phoneNumber]);

  const handleSplashComplete = useCallback(() => {
    if (phoneNumber) {
      // Check profile completion status
      const profileCompleted = localStorage.getItem('profileCompleted') === 'true';
      
      if (!profileCompleted) {
        setPage('main');
        setActiveTab('profile');
      } else {
        setPage('main');
        setActiveTab('home');
      }
    } else {
      setPage('login');
    }
  }, [phoneNumber]);

  // Handle tab changes - redirect to profile if not completed
  const handleTabChange = useCallback((tab) => {
    // If trying to access other tabs but profile is not completed, force profile tab
    const profileCompleted = localStorage.getItem('profileCompleted') === 'true';
    
    if (!profileCompleted && tab !== 'profile') {
      setActiveTab('profile');
      alert('Please complete your profile first to access other features.');
    } else {
      setActiveTab(tab);
    }
  }, []);

  // Handle page changes with profile completion check
  const handlePageChange = useCallback((newPage) => {
    // Special handling for 'home' navigation - go to main page with home tab
    if (newPage === 'home') {
      setPage('main');
      setActiveTab('home');
      return;
    }
    
    // If trying to access quiz or other features without profile completion
    if (newPage !== 'profile' && newPage !== 'login' && newPage !== 'splash') {
      const profileCompleted = localStorage.getItem('profileCompleted') === 'true';
      if (!profileCompleted) {
        setPage('main');
        setActiveTab('profile');
        alert('Please complete your profile first to access this feature.');
        return;
      }
    }
    
    setPage(newPage);
  }, []);

  // Update profile completion state when profile is completed
  const handleProfileCompletion = useCallback(() => {
    setIsProfileCompleted(true);
    setActiveTab('home');
  }, []);

  // Debug function to check state
  useEffect(() => {
    console.log('Current activeTab:', activeTab);
    console.log('Current page:', page);
    console.log('Profile completed:', isProfileCompleted);
    console.log('Phone number:', phoneNumber);
  }, [activeTab, page, isProfileCompleted, phoneNumber]);

  // Add this useEffect to debug the profile completion state
  useEffect(() => {
    console.log('=== DEBUG INFO ===');
    console.log('Phone Number:', phoneNumber);
    console.log('Profile Completed:', isProfileCompleted);
    console.log('Current Page:', page);
    console.log('Active Tab:', activeTab);
    console.log('Local Storage - phone:', localStorage.getItem('phone'));
    console.log('Local Storage - profileCompleted:', localStorage.getItem('profileCompleted'));
    console.log('==================');
  }, [phoneNumber, isProfileCompleted, page, activeTab]);

        const renderPage = useCallback(() => {
        switch (page) {
          case 'splash':
            return <SplashScreen onComplete={handleSplashComplete} />;
          case 'login':
            return <LoginPage setPage={handlePageChange} setPhoneNumber={setPhoneNumber} />;
          case 'main':
            return (
              <div className="app-container">
                <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />
                <main className="main-content">
                  <AnimatePresence mode="wait">
                    {activeTab === 'home' && (
                      <motion.div
                        key="home"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <HomePage setPage={handlePageChange} setQuizAnswers={setQuizAnswers} />
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
                        <ProfilePage setPage={handlePageChange} onProfileComplete={handleProfileCompletion} />
                      </motion.div>
                    )}
                    {activeTab === 'drug-allergy' && (
                      <motion.div
                        key="drug-allergy"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {/* Add your DrugAllergy component here */}
                        <div>Drug Allergy Page - To be implemented</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </main>
              </div>
            );
          case 'quiz':
            // Check if profile is completed before allowing quiz
            if (!isProfileCompleted) {
              setPage('main');
              setActiveTab('profile');
              return null;
            }
            return <QuestionnairePage setPage={handlePageChange} quizAnswers={quizAnswers} setQuizAnswers={setQuizAnswers} />;
          case 'result':
            return <ResultPage setPage={handlePageChange} quizAnswers={quizAnswers} />;
          default:
            return (
              <div className="app-container">
                <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />
                <main className="main-content">
                  <HomePage setPage={handlePageChange} setQuizAnswers={setQuizAnswers} />
                </main>
              </div>
            );
        }
      }, [page, activeTab, quizAnswers, isProfileCompleted, handleSplashComplete, handleTabChange, handlePageChange, handleProfileCompletion]);
        return (
          <div className="font-sans min-h-screen">
            <AnimatePresence mode="wait">
              {renderPage()}
            </AnimatePresence>
          </div>
        );
      };

export default App;