import React from "react";

import {
  Link,
} from "react-router-dom";

import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import "./Footer.css";

export default function Footer() {
  const phone =
    import.meta.env
      .VITE_PHONE_NUMBER ||
    "+916367697913";

  const email =
    import.meta.env.VITE_EMAIL ||
    "hello@techdigitaldesigner.com";

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-about">
          <Link
            className="footer-brand"
            to="/"
            aria-label="Tech Digital Designers home"
          >
            <span className="footer-brand-mark">
              T
            </span>

            <span className="footer-brand-text">
              <strong>
                Tech Digital Designers
              </strong>

              <small>
                Next Generation Digital Agency
              </small>
            </span>
          </Link>

          <p>
            Simple, useful and reliable
            digital services for businesses
            and professionals.
          </p>
        </div>

        <div className="footer-column">
          <h4>
            Pages
          </h4>

          <Link to="/services">
            Services
          </Link>

          <Link to="/projects">
            Projects
          </Link>

          <Link to="/pricing">
            Pricing
          </Link>

          <Link to="/about">
            About
          </Link>
        </div>

        <div className="footer-column">
          <h4>
            Legal
          </h4>

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

        <div className="footer-column footer-contact">
          <h4>
            Contact
          </h4>

          <a href={`tel:${phone}`}>
            <Phone
              size={16}
              aria-hidden="true"
            />

            <span>
              {phone}
            </span>
          </a>

          <a href={`mailto:${email}`}>
            <Mail
              size={16}
              aria-hidden="true"
            />

            <span>
              {email}
            </span>
          </a>

          <div className="footer-contact-item">
            <MapPin
              size={16}
              aria-hidden="true"
            />

            <span>
              Chittorgarh, Rajasthan
            </span>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        © {new Date().getFullYear()}{" "}
        Tech Digital Designers. All rights
        reserved.
      </div>
    </footer>
  );
}