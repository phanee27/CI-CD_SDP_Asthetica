import React from "react";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-section">
        <div className="footer-header">
          <h2>Asthetica</h2>
          <p>caption</p>
          <h4>Follow us on</h4>
          <FaFacebook />
          <FaInstagram />
          <FaXTwitter />
        </div>
        <div className="footer-quick-links">
          <h3>Quick Links</h3>
          <Link to="/discover">Discover</Link>
          <Link to="/artists">Artists</Link>
          <Link to="/auctions">Auctions</Link>
          <Link to="/profile">Profile</Link>
        </div>
        <div className="footer-contacts"></div>
      </div>
      <div className="footer-copyright"></div>
    </div>
  );
};

export default Footer;
