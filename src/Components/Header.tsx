import React from 'react';
import './css/Header.css';

export const Header :React.FC = () =>{
  return (
    <header className="header">
      <div className="header-left">
        <img
          alt="Outlook logo white square"
          className="header-logo"
          src="https://storage.googleapis.com/a1aa/image/00dc6dc5-5183-4913-c218-fc9bba797178.jpg"
        />
        <span className="header-title">Emailo</span>
      </div>
      <div className="header-search">
        <input className="search-input" placeholder="Search" type="search" />
      </div>
      <div className="header-buttons">
        <button className="header-button">
          <i className="far fa-comment-alt"></i>
        </button>
        <button className="header-button">
          <i className="far fa-bell"></i>
        </button>
        <button className="header-button">
          <i className="fas fa-cog"></i>
        </button>
        <button className="header-button">
          <i className="fas fa-window-minimize"></i>
        </button>
      </div>
    </header>
  );
};

