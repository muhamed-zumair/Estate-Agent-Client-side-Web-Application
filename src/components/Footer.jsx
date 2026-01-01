import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Top: Logo + slogan */}
      <div className="footer-top">
        <h2 className="footer-logo">
          Estate<span>Agent</span>
        </h2>
        <p className="footer-slogan">Your trusted partner in real estate</p>
      </div>

      {/* Middle: Contact info horizontally */}
      <div className="footer-contact-horizontal">
        <p><FaMapMarkerAlt /> 123 Main Street, City</p>
        <p><FaPhoneAlt /> +1 234 567 890</p>
        <p><FaEnvelope /> info@estateagent.com</p>
      </div>

      <hr className="footer-separator" />

      {/* Bottom: Links left, copyright right */}
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
