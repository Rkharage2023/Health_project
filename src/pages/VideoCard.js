import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './VideoCard.css';

const VideosPage = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState('');

  const videos = [
    {
      id: 1,
      title: "Daily Skin Care Routine",
      description: "Best practices for maintaining healthy Skin",
      duration: "5:30",
      playable: true,
      src: require('../assets/video1.mp4') // Your first video
    },
    {
      id: 2,
      title: "Healthy diet",
      description: "Best Healthy diet ",
      duration: "7:15",
      playable: true,
      src: require('../assets/video2.mp4') // Your second video
    },
    {
      id: 3,
      title: "Success Stories",
      description: "Real people, real results with our program",
      duration: "10:20",
      playable: false
    },
    {
      id: 4,
      title: "Understanding Skin Health",
      description: "Learn about common Skin issues and solutions",
      duration: "6:45",
      playable: false
    },
    {
      id: 5,
      title: "Nutrition for skin",
      description: "Foods that promote healthy Skin",
      duration: "8:30",
      playable: false
    },
    {
      id: 6,
      title: "Expert Tips & Advice",
      description: "Professional insights from our doctors",
      duration: "9:10",
      playable: false
    }
  ];

  const handleVideoClick = (video) => {
    if (video.playable && video.src) {
      setCurrentVideo(video.src);
      setIsVideoOpen(true);
    }
  };

  const handleCloseVideo = () => {
    setIsVideoOpen(false);
    setCurrentVideo('');
  };

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
              className={`video-card ${video.playable ? 'playable' : 'non-playable'}`}
              onClick={() => handleVideoClick(video)}
            >
              <div className="video-thumbnail">
                {video.playable && <div className="play-button">▶</div>}
                <div className="video-duration">{video.duration}</div>
              </div>
              <div className="video-info">
                <h3 className="video-title">{video.title}</h3>
                <p className="video-description">{video.description}</p>
                {!video.playable && <div className="coming-soon">Coming Soon</div>}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Video Modal */}
      {isVideoOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="video-modal"
          onClick={handleCloseVideo}
        >
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleCloseVideo}>
              ×
            </button>
            <div className="video-wrapper">
              <video controls autoPlay style={{ width: '100%', height: '100%' }}>
                <source src={currentVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default VideosPage;