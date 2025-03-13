import React from 'react';
import './SliderToggle.css';

const SliderToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className="toggle-switch-wrapper">
      <span className="toggle-label">Light</span>
      <div className="physical-toggle">
        <div 
          className={`toggle-container ${darkMode ? 'dark-mode' : 'light-mode'}`}
          onClick={toggleDarkMode}
          role="switch"
          aria-checked={darkMode}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              toggleDarkMode();
              e.preventDefault();
            }
          }}
        >
          <div className="toggle-track"></div>
          <div className="toggle-handle"></div>
        </div>
      </div>
      <span className="toggle-label">Dark</span>
    </div>
  );
};

export default SliderToggle;