import React from 'react';
import VideoPlayer from '../../components/media/VideoPlayer';
import './Help.css';

const HelpLoginRegister = () => {
  return (
    <div className="help-page-container">
      <h1>Help: <span>Login & Registration</span></h1>

      {/* NEW: Wrapper for side-by-side layout */}
      <div className="help-main-layout">
        
        {/* LEFT SIDE: TEXT */}
        <section className="help-content">
          <h3>How to Register</h3>
          <ol>
            <li>Click the <strong>Login</strong> button in the navigation bar.</li>
            <li>Select the <strong>Register here</strong> link at the bottom of the card.</li>
            <li>Enter your Name, Email, and a secure Password.</li>
            <li>Click <strong>Register</strong> to create your account.</li>
          </ol>
          
          <h3>How to Login</h3>
          <ol>
            <li>Navigate to the Login page.</li>
            <li>Enter your registered Email Address and Password.</li>
            <li>Click the <strong>Login</strong> button to access your dashboard.</li>
            <li><em>Note:</em> To login as an Admin, use an email address containing "admin".</li>
          </ol>
        </section>

        {/* RIGHT SIDE: VIDEO */}
        <div className="help-video-section">
          <VideoPlayer 
            videoId="15ZZtTjQlak0PwkxWYCzDjr4vY-NPn-hg" 
            title="Login and Registration Guide" 
          />
        </div>

      </div> {/* End help-main-layout */}
    </div>
  );
};

export default HelpLoginRegister;