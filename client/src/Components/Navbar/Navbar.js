import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {

    const [navbar, setNavbar] = useState(false);

    const changeNavbar = () => {
      if (window.scrollY >= 20) {
        setNavbar(true);
      } else {
        setNavbar(false);
      }
    }

    window.addEventListener('scroll', changeNavbar);

    return (
      <nav className="navbar navbar-light navbar-expand-md px-4" style={{
        background: navbar ? 'rgba(62, 62, 77, 1)' : 'none',
        position: 'fixed',
        width: '100%',
        zIndex: 200,
      }}>
        <div className="container-fluid nav-container">
          <Link to="/" className="navbar-brand d-flex flex-row align-items-center">
          <i className="fa fa-film logo pe-1 " aria-hidden="true"></i>
          <div className="logo text-white">Critic</div>
          </Link>

          <button className="me-auto btn-small d-md-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span>Browse</span>
            <i className="fa fa-caret-down ps-1" aria-hidden="true"></i>
          </button>

          
          <div className="me-auto d-none d-md-flex">
            <button className="btn-small">
              Movies
            </button>
          
            <button className="btn-small">
              TV Shows
            </button> 
          </div>
                 
          
          
          


          <i className="fa fa-ticket nav-icon xs-hidden" aria-hidden="true"></i>
          <Link to="/register" style={{
            textDecoration: 'none'
          }}>
            <button className="btn-small mx-1 xs-hidden">
              Sign Up
            </button>
          </Link>

          <Link to="/login" style={{
            textDecoration: 'none'
          }}>
            <button className="btn-login">
                Login
            </button>
          </Link>

        </div>
        <div className="collapse navbar-collapse p-1 p-md-0 mt-2" id="navbarText">
          <ul className="navbar-nav me-auto mb-0 d-inline d-md-none">
            <li className="nav-item">
              <button className="btn-small">
                Movies
              </button>
            </li>
            <li className="nav-item">
            <button className="btn-small me-auto">
                TV Shows
              </button>
            </li>
          </ul>
        </div>
       

      </nav>
    )
}

export default Navbar;