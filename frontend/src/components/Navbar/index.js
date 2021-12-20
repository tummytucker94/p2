import React from 'react';
import './style.css'
import { Link } from 'react-router-dom';

const Navbar = () => {

  function logoutHandler(){
    localStorage.clear();
    window.location = "/";
  }

    return (
        <nav id="my-nav-bar" className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/landing">Project Productivity</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/landing">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/timer">Timer</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/templates">Templates</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/editor">Editor</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/stats">Stats</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/about">About</Link>
              </li>
            </ul>
          </div>
          <button id="logout-btn" className='btn btn-warning' onClick={logoutHandler}>Logout</button>
        </div>
      </nav>
    );
}

export default Navbar;