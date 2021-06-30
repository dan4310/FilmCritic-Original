import React, { useEffect, useState } from 'react';
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
      <nav className="navbar navbar-light px-4" style={{
        background: navbar ? 'rgba(80, 80, 100, 1)' : 'none',
        position: 'fixed',
        width: '100%',
        zIndex: 200,
      }}>
        <div className="container-fluid my-auto">
          <a className="navbar-brand text-white d-flex flex-row align-items-center" href="#">
          <i className="fa fa-film pe-2 logo" aria-hidden="true"></i>
          <div className="logo text-white">Critic</div>
          </a>
          <button className="btn-small">
            Movies
          </button>
          <button className="btn-small me-auto">
            TV Shows
          </button>


          <i class="fa fa-ticket logo" aria-hidden="true" style={{
            fontSize: "30px"
          }}></i>
          <button className="btn-small mx-1">
            Sign Up
          </button>
          <button className="btn-login">
              Login
          </button>
        </div>
      </nav>
    )
}

export default Navbar;