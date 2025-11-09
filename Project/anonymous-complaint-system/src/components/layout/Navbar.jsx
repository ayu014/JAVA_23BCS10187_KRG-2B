// src/components/layout/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout(); // This clears the token from context and localStorage
    navigate('/admin/login'); // Redirect the user to the login page
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Brand */}
          <Link to="/" className="navbar-brand">
            ACRS
          </Link>

          {/* Hamburger Menu */}
          <button className="menu-toggle" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Nav Links: switch between user and admin views */}
          <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
            {!isAuthenticated ? (
              // Regular user navigation
              <>
                <li>
                  <Link
                    to="/"
                    className={location.pathname === '/' ? 'active' : ''}
                    onClick={() => setMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/submit-complaint"
                    className={location.pathname === '/submit-complaint' ? 'active' : ''}
                    onClick={() => setMenuOpen(false)}
                  >
                    Submit Complaint
                  </Link>
                </li>
                <li>
                  <Link
                    to="/track-status"
                    className={location.pathname === '/track-status' ? 'active' : ''}
                    onClick={() => setMenuOpen(false)}
                  >
                    Track Status
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/login"
                    className={location.pathname === '/admin/login' ? 'active' : ''}
                    onClick={() => setMenuOpen(false)}
                  >
                    Admin
                  </Link>
                </li>
              </>
            ) : (
              // Admin navigation: only the things an admin needs
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className={location.pathname.startsWith('/admin/dashboard') ? 'active' : ''}
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                   to="/admin/complaints"
                   
                   className={location.pathname.startsWith('/admin/complaints') ? 'active' : ''}
                    onClick={() => setMenuOpen(false)}
                    >Complaints</Link></li>
                <li>  
                </li>
                {/* <li>
                  <Link
                    to="/admin/users"
                    className={location.pathname === '/admin/users' ? 'active' : ''}
                    onClick={() => setMenuOpen(false)}
                  >
                    Users
                  </Link>
                </li> */}
                <li>
                  {/* Logout as a button so we can call logout logic directly */}
                  <button
                    className="logout-link"
                    onClick={() => { setMenuOpen(false); handleLogout(); }}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      {/* Internal CSS */}
      <style>
        {`
        /* Navbar */
        .navbar {
          position: sticky;
          top: 0;
          width: 100%;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 0.8rem 2rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          transition: background 0.3s ease, padding 0.3s ease;
        }

        .navbar-container {
          max-width: 1140px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        /* Brand */
        .navbar-brand {
          font-size: 1.8rem;
          font-weight: 800;
          color: #00bfa6;
          text-decoration: none;
          letter-spacing: 1px;
          transition: color 0.3s ease;
        }

        .navbar-brand:hover {
          color: #008f7e;
        }

        /* Nav Links */
        .navbar-links {
          list-style: none;
          display: flex;
          gap: 1.8rem;
          margin: 0;
          padding: 0;
        }

        .navbar-links li {
          position: relative;
        }

        .navbar-links a {
          text-decoration: none;
          color: #333;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          transition: all 0.3s ease;
        }

        .navbar-links a:hover {
          background-color: #00bfa6;
          color: #fff;
          transform: translateY(-2px);
        }

        .navbar-links a.active {
          background-color: #008f7e;
          color: #fff;
        }

        /* Logout button styled like links */
        .logout-link {
          background: none;
          border: none;
          color: #333;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          cursor: pointer;
        }

        .logout-link:hover {
          background-color: #ff6b6b;
          color: #fff;
          transform: translateY(-2px);
        }

        /* Hamburger */
        .menu-toggle {
          display: none;
          font-size: 1.6rem;
          background: none;
          border: none;
          cursor: pointer;
          color: #333;
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .menu-toggle {
            display: block;
          }

          .navbar-links {
            position: absolute;
            top: 64px;
            left: 0;
            width: 100%;
            flex-direction: column;
            background: rgba(255,255,255,0.97);
            backdrop-filter: blur(10px);
            padding: 1.5rem 0;
            gap: 1rem;
            border-top: 1px solid #eee;
            transform: translateY(-200%);
            opacity: 0;
            pointer-events: none;
            transition: all 0.3s ease;
          }

          .navbar-links.active {
            transform: translateY(0);
            opacity: 1;
            pointer-events: auto;
          }

          .navbar-links a {
            width: 80%;
            margin: 0 auto;
            text-align: center;
          }
        }
      `}
      </style>
    </>
  );
};

export default Navbar;
