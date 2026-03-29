import React from 'react';
import VideoPlayer from '../../components/media/VideoPlayer';
import './Help.css';

const HelpAdminPrmissnNavi = () => {
  return (
    <div className="help-page-container">
      <h1>Help: <span>Admin Permissions & Navigation</span></h1>
      <div className="help-main-layout">
        <section className="help-content">
          <h3>Admin Dashboard Access</h3>
          <p>Users with administrator privileges have access to exclusive management tools. To access these:</p>
          <ul>
            <li>Ensure you are logged in with an authorized Admin account.</li>
            <li>Look for the <strong>Admin Dashboard</strong> link in the main navigation menu.</li>
            <li>The sidebar will provide options for User Management and System Settings.</li>
          </ul>
          <h3>Permission Levels</h3>
          <p>Standard users can view and edit their own profiles, while Admins can manage the entire vehicle inventory and user database.</p>
        </section>

        <div className="help-video-section">
          <VideoPlayer 
            videoId="1IV6HWqvcXYT7oFT8APEca2RHeC9C1zUy" 
            title="Admin & Navigation Tutorial" 
          />
        </div>
      </div>
    </div>
  );
};

export default HelpAdminPrmissnNavi;