import React, { useState } from 'react';
import '../styles/settings.css';
import defaultUserIcon from '../assets/person.svg';
function Settings() {
  const [activeTab, setActiveTab] = useState('User');
  const [profileImage, setProfileImage] = useState(null); // State to store the uploaded profile image
  const [imagePreview, setImagePreview] = useState(null); // State to store the image preview URL

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Handle file input change for profile picture
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(file);  // Store the selected image file
        setImagePreview(reader.result); // Set image preview
      };
      reader.readAsDataURL(file); // Convert the image to base64 string for preview
    }
  };
  

  // Optional: Handle reset profile image
  const handleImageReset = () => {
    setProfileImage(null);
    setImagePreview(null);
  };

  return (
    <div className='settings-page-container'>
      <div className="settings-navbar-container">
        <ul className="settings-navbar">
          <li className={activeTab === 'User' ? 'active' : ''} onClick={() => handleTabClick('User')}>User</li>
          <li className={activeTab === 'Notifications' ? 'active' : ''} onClick={() => handleTabClick('Notifications')}>Notifications</li>
        </ul>
      </div>

      {/* User Settings */}
      {activeTab === 'User' && (
        <div className="settings-content active">
          <div className='info-container'>
            <h1>User Settings</h1>

            {/* Flex container for profile picture and form fields */}
            <div className='info-section'>
              {/* Other User Settings */}
              <div className='input-fields'>
                <div className='info-section'>
                  <input type="text" placeholder="Enter your name" className='name-input' />
                </div>
                <div className='info-section'>
                  <input type="email" placeholder="Enter your email" className='email-input' />
                </div>
                <button className='info-save-button'>Save</button>
              </div>

            {/* Profile Picture Upload Section */}
            <div className='profile-picture-section'>
              <div className='profile-picture-preview'>
                {/* Preview the selected profile image */}
                {imagePreview ? (
                  <img src={imagePreview} alt="Profile Preview" className="profile-image" />
                ) : (
                  <div className="profile-placeholder"><img src={defaultUserIcon} alt="default-user-icon" /></div>
                )}
              </div>
              
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
              />

                {/* Optional: Button to reset/remove the profile picture */}
                {profileImage && (
                  <button onClick={handleImageReset} className="reset-button">Remove</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Settings (if needed) */}
      {activeTab === 'Notifications' && (
        <div className="settings-content active">
          {/* Notification settings content */}
          
        </div>
      )}
    </div>
  );
}

export default Settings;
