import React from 'react';
import Card from '../components/Card';
import './VideoCard.css';

const VideoCard = ({ title, src, description }) => (
  <Card className="video-card">
    <iframe
      className="video-iframe"
      src={src}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      loading="lazy"
    ></iframe>
    <h4 className="video-title">{title}</h4>
    <p className="video-description">{description}</p>
  </Card>
);

export default VideoCard;