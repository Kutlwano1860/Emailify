// EmptyState.tsx
import React from 'react';

export const EmptyState: React.FC = () => {
  return (
    <div className="email-empty-state">
      <div className="email-empty-state__icon-container">
        {/* Main envelope */}
        <div className="email-empty-state__envelope"></div>
        
        {/* Colored documents/emails */}
        <div className="email-empty-state__document-left"></div>
        <div className="email-empty-state__document-right"></div>
        <div className="email-empty-state__document-top"></div>
      </div>
      
      <div className="email-empty-state__content">
        <h2 className="email-empty-state__title">Select an item to read</h2>
        <p className="email-empty-state__subtitle">Nothing is selected</p>
      </div>
    </div>
  );
};

// Alternative with SVG (more precise rendering)
export const EmptyStateSVG: React.FC = () => {
  return (
    <div className="email-empty-state">
      <svg className="email-empty-state__svg-icon" viewBox="0 0 120 120">
        {/* Purple document (back) */}
        <rect 
          x="42" 
          y="10" 
          width="35" 
          height="50" 
          rx="4" 
          className="document-purple"
          transform="rotate(-5 59.5 35)"
        />
        
        {/* Left blue document */}
        <rect 
          x="15" 
          y="20" 
          width="40" 
          height="55" 
          rx="4" 
          className="document-blue"
          transform="rotate(-15 35 47.5)"
        />
        
        {/* Right blue document */}
        <rect 
          x="65" 
          y="20" 
          width="40" 
          height="55" 
          rx="4" 
          className="document-blue"
          transform="rotate(15 85 47.5)"
        />
        
        {/* Main envelope */}
        <rect 
          x="20" 
          y="45" 
          width="80" 
          height="60" 
          rx="6" 
          className="envelope-base"
        />
        
        {/* Envelope flap */}
        <path 
          d="M20 51 L60 75 L100 51 L100 45 L20 45 Z" 
          className="envelope-flap"
        />
        
        {/* Envelope opening line */}
        <line 
          x1="20" 
          y1="75" 
          x2="100" 
          y2="75" 
          stroke="#d0d0d0" 
          strokeWidth="0.5"
        />
      </svg>
      
      <div className="email-empty-state__content">
        <h2 className="email-empty-state__title">Select an item to read</h2>
        <p className="email-empty-state__subtitle">Nothing is selected</p>
      </div>
    </div>
  );
};