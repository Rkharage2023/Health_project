import React from 'react';
import Card from '../components/Card';
import './DashboardCard.css';

const DashboardCard = ({ title, content, icon: Icon, color, images }) => {
  const handleImageClick = (imageSrc, imageAlt) => {
    // For local images, we need to create a blob URL or open in new tab
    if (typeof imageSrc === 'string' && imageSrc.startsWith('blob:')) {
      // If it's already a blob URL (from imported image), open directly
      window.open(imageSrc, '_blank', 'noopener,noreferrer');
    } else if (typeof imageSrc === 'string') {
      // If it's a regular URL
      window.open(imageSrc, '_blank', 'noopener,noreferrer');
    } else {
      // If it's an imported image module, create a blob URL
      fetch(imageSrc)
        .then(response => response.blob())
        .then(blob => {
          const blobUrl = URL.createObjectURL(blob);
          window.open(blobUrl, '_blank', 'noopener,noreferrer');
          // Clean up the blob URL after some time
          setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
        })
        .catch(error => {
          console.error('Error opening image:', error);
          // Fallback: try to open directly
          window.open(imageSrc, '_blank', 'noopener,noreferrer');
        });
    }
  };

  return (
    <Card className="dashboard-card">
      <div className="dashboard-card-header">
        <Icon size={24} className={color} />
        <h3 className={`dashboard-card-title ${color}`}>{title}</h3>
      </div>
      <p className="dashboard-card-content">{content}</p>
      
      {images && images.length > 0 && (
        <div className="dashboard-card-images">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="dashboard-image-container"
              onClick={() => handleImageClick(image.src, image.alt)}
              title={`Click to view ${image.alt}`}
            >
              <img 
                src={image.src} 
                alt={image.alt || `${title} image ${index + 1}`}
                className="dashboard-image"
              />
              <div className="image-overlay">
                <span className="view-text">View Full Size</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default DashboardCard;