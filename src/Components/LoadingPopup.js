import React from 'react';
import './LoadingPopup.css';

const LoadingPopup = () => {
  return (
    <div className="loading-popup-overlay">
      <div className="loading-popup">
        <div className="loading-spinner"></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingPopup;
