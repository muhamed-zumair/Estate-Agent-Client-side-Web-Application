import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <h2 className="footer-logo">
          Estate<span>Agent</span>
        </h2>
        <p className="footer-slogan">Your trusted partner in real estate</p>
      </div>

      {/* Contact info */}
      <div className="footer-contact-horizontal">
        <p><FaMapMarkerAlt /> Colombo, SriLanka</p>
        <p><FaPhoneAlt /> +94 78 540 3834</p>
        <p><FaEnvelope /> mohozumair26@gmail.com</p>
      </div>

      <hr className="footer-separator" />

      <div className="footer-bottom">
        <div className="footer-links-bottom">
          <a href="#" onClick={(e) => e.preventDefault()}>Home</a>
          <a href="#" onClick={(e) => e.preventDefault()}>About</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Contact</a>
        </div>
        <div className="footer-copyright">
          © {new Date().getFullYear()} EstateAgent. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
