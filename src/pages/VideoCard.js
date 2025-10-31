import React from 'react';
import { motion } from 'framer-motion';
import './VideoCard.css';

const VideosPage = () => {
  const videos = [
    {
      id: 1,
      title: "Understanding Skin Health",
      description: "Learn about common Skin issues and solutions",
      duration: "5:30"
    },
    {
      id: 2,
      title: "Treatment Guidelines",
      description: "How to follow your personalized treatment plan",
      duration: "7:15"
    },
    {
      id: 3,
      title: "Success Stories",
      description: "Real people, real results with our program",
      duration: "10:20"
    },
    {
      id: 4,
      title: "Daily Skin Care Routine",
      description: "Best practices for maintaining healthy Skin",
      duration: "6:45"
    },
    {
      id: 5,
      title: "Nutrition for skin",
      description: "Foods that promote healthy Skin",
      duration: "8:30"
    },
    {
      id: 6,
      title: "Expert Tips & Advice",
      description: "Professional insights from our doctors",
      duration: "9:10"
    }
  ];

  return (
    <div className="videos-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="videos-content"
      >
        <div className="videos-header">
          <h1 className="videos-title">Educational Videos</h1>
          <p className="videos-subtitle">Learn everything about Skin care and treatment</p>
        </div>

        <div className="videos-grid">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="video-card"
            >
              <div className="video-thumbnail">
                <div className="play-button">▶</div>
                <div className="video-duration">{video.duration}</div>
              </div>
              <div className="video-info">
                <h3 className="video-title">{video.title}</h3>
                <p className="video-description">{video.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default VideosPage;