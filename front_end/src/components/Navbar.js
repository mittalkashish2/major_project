import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
  var user = window.localStorage.getItem('user');
  return (
    <nav className="navbar">
    <h2 style={{ color: "rgb(14, 240, 14)", fontWeight:"bolder",fontStyle: "italic",
    fontSize:"19px", fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>
    Hello, {user}.</h2>
    <div className="links">
      <div className="class-link">
        <div className="class-link"><Link to="/home" className="link">Home</Link></div>
        <div className="class-link"><Link to="/feedback"className="link">Feedback</Link></div>
      </div>
    </div>
    </nav>
  )
}

export default Navbar;