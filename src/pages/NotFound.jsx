import React from "react";
import "./Auth.css";
import "./NotFound.css";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>404</h1>
        <p>Page not found.</p>

        <Link className="btn" to="/">
          Go Home
        </Link>
      </div>
    </section>
  );
}
