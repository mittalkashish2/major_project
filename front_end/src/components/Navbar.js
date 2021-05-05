import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
    <h1>Course Recommeder System</h1>
    <div className="links">
      <Link to="/home">Home</Link>
      <Link to="/feedback">Feedback</Link>
    </div>
    </nav>
  )
}

export default Navbar;