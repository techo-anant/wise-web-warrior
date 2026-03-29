import React from 'react';
import './VideoPlayer.css';

const VideoPlayer = ({ videoId, title }) => {
  if (!videoId) return null;

  // Added ?rm=minimal to reduce as much Google UI as possible
  const videoSrc = `https://drive.google.com/file/d/${videoId}/preview?rm=minimal`;

  return (
    <div className="video-player-container">
      <div className="video-wrapper">
        <iframe
          src={videoSrc}
          title={title || "Help Tutorial Video"}
          className="google-drive-iframe"
          allow="autoplay"
          allowFullScreen
        ></iframe>
      </div>
      <p className="video-caption">
        <i className="fas fa-play-circle"></i> {title}
      </p>
    </div>
  );
};

export default VideoPlayer;