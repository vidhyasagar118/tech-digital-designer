import React from "react";
import { useState } from "react";
import "./Navbar.css";
import {
  Link,
  NavLink,
} from "react-router-dom";
import { Menu, X } from "lucide-react";

import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, isAdmin, logout } = useAuth();

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="navbar">
      <div className="container nav-wrap">
        <Link
          className="brand"
          to="/"
          onClick={closeMenu}
        >
          <span className="brand-mark">T</span>

<span>
  Tech Digital Designer
  <small>Digital Growth Studio</small>
</span>
        </Link>

        <button
          className="menu-button"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>

        <nav
          className={
            open ? "nav-links open" : "nav-links"
          }
        >
          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink
            to="/services"
            onClick={closeMenu}
          >
            Services
          </NavLink>

          <NavLink
            to="/projects"
            onClick={closeMenu}
          >
            Projects
          </NavLink>

          <NavLink
            to="/pricing"
            onClick={closeMenu}
          >
            Pricing
          </NavLink>

          <NavLink to="/about" onClick={closeMenu}>
            About
          </NavLink>

          <NavLink
            to="/contact"
            onClick={closeMenu}
          >
            Contact
          </NavLink>

          {isAdmin && (
            <NavLink
              to="/admin"
              onClick={closeMenu}
            >
              Admin
            </NavLink>
          )}

          {user ? (
            <button
              className="nav-login"
              onClick={() => {
                logout();
                closeMenu();
              }}
            >
              Logout
            </button>
          ) : (
            <NavLink
              className="nav-login"
              to="/login"
              onClick={closeMenu}
            >
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
