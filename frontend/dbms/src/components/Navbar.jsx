import React from 'react';
import logo from "./logo.png";
import './container.css';

const Navbar = ({ adminName }) => {
  
  return (
    <nav className="navbar">
      <img src={logo} alt="logo" className="logo" />
      <div className="nav-links">
        <a href="/student" className="nav-link">Student</a>
        <a href="/teacher" className="nav-link">Teacher</a>
        <a href="/schedule" className="nav-link">Schedule</a>
      </div>
    </nav>
  );
}

export default Navbar; 