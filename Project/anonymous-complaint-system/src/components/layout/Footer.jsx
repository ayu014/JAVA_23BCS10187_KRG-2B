// src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      <footer className="footer">
        {/* Footer Main */}
        <div className="footer-container">
          {/* About Section */}
          <div className="footer-section about">
            <h3>Anonymous Complaint Readdressal System</h3>
            <p>
              Empowering voices through anonymity. A secure platform to lodge, track,
              and resolve complaints transparently.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="footer-section social">
            <h3>Connect with Us</h3>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <FaTwitter />
              </a>
              <a href="https://linkedin.com/in/ayu014" target="_blank" rel="noreferrer">
                <FaLinkedin />
              </a>
              <a href="https://github.com/ayu014" target="_blank" rel="noreferrer">
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="footer-divider" />

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Anonymous Complaint Readdressal System. All rights reserved.</p>
          <p>Developed with ❤️ by Ayush Ranjan</p>
        </div>
      </footer>

      {/* Inline CSS */}
      <style>{`
        .footer {
          background-color: #222;
          color: #ccc;
          padding: 2.5rem 1rem 1rem;
          text-align: center;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .footer-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          max-width: 1100px;
          margin: 0 auto;
        }

        .footer-section h3 {
          color: #fff;
          font-size: 1.2rem;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .footer-section.about p {
          line-height: 1.6;
          font-size: 0.95rem;
        }

        .footer-section.links ul {
          list-style: none;
          padding: 0;
        }

        .footer-section.links li {
          margin-bottom: 0.5rem;
        }

        .footer-section.links a {
          color: #ccc;
          text-decoration: none;
          transition: color 0.3s;
        }

        .footer-section.links a:hover {
          color: #fff;
        }

        .footer-section.social .social-icons {
          display: flex;
          justify-content: center;
          gap: 1.2rem;
        }

        .footer-section.social a {
          color: #ccc;
          font-size: 1.4rem;
          transition: color 0.3s, transform 0.2s;
        }

        .footer-section.social a:hover {
          color: #00aced;
          transform: scale(1.1);
        }

        .footer-divider {
          border: none;
          border-top: 1px solid #444;
          margin: 2rem auto 1.5rem;
          max-width: 900px;
        }

        .footer-bottom p {
          font-size: 0.9rem;
          margin: 0.2rem 0;
          color: #999;
        }

        @media (min-width: 768px) {
          .footer-container {
            grid-template-columns: repeat(3, 1fr);
            text-align: left;
          }
          .footer-section.social .social-icons {
            justify-content: flex-start;
          }
        }
      `}</style>
    </>
  );
};

export default Footer;
