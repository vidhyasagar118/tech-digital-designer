import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function Footer() {
  const phone =
    import.meta.env.VITE_PHONE_NUMBER ||
    "+916367697913";

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="brand footer-brand">
            <span className="brand-mark">T</span>

           <span>
  Tech Digital Designer
  <small>Digital Growth Studio</small>
</span>
          </div>

          <p>
            Simple, useful and reliable digital
            services for businesses and professionals.
          </p>
        </div>

        <div>
          <h4>Pages</h4>
          <Link to="/services">Services</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/about">About</Link>
        </div>

        <div>
          <h4>Legal</h4>
          <Link to="/privacy-policy">
            Privacy Policy
          </Link>
          <Link to="/terms">
            Terms & Conditions
          </Link>
          <Link to="/disclaimer">
            Disclaimer
          </Link>
        </div>

        <div>
          <h4>Contact</h4>

          <a href={`tel:${phone}`}>
            <Phone size={16} />
            {phone}
          </a>

          <a href="mailto:hello@techdigitaldesigner.com">
            <Mail size={16} />
            hello@techdigitaldesigner.com
          </a>

          <span>
            <MapPin size={16} />
            Chittorgarh, Rajasthan
          </span>
        </div>
      </div>

<div className="container footer-bottom">
  © {new Date().getFullYear()} Tech Digital Designer.
  All rights reserved.
</div>
    </footer>
  );
}
