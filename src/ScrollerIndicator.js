import React, { useState, useEffect } from 'react';

const ScrollIndicator = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Get the scroll position
      const scrollY = window.scrollY || window.pageYOffset;
      // Make the indicator disappear after user has scrolled down a bit
      if (scrollY > 150) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`scroll-indicator ${visible ? 'visible' : 'hidden'}`}>
      <div className="scroll-text"></div>
      <div className="scroll-arrow">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default ScrollIndicator;