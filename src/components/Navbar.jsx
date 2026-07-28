import React, {
  useState,
} from "react";

import {
  Link,
  NavLink,
} from "react-router-dom";

import {
  Menu,
  X,
} from "lucide-react";

import {
  useAuth,
} from "../context/AuthContext";

import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] =
    useState(false);

  const auth = useAuth();

  const user =
    auth?.user || null;

  const isAdmin =
    auth?.isAdmin || false;

  const logout =
    auth?.logout || (() => {});

  function closeMenu() {
    setOpen(false);
  }

  function handleLogout() {
    logout();
    closeMenu();
  }

  return (
    <header className="navbar">
      <div className="container nav-wrap">
        <Link
          className="brand"
          to="/"
          onClick={closeMenu}
          aria-label="Tech Digital Designers home"
        >
          <span className="brand-mark">
            T
          </span>

          <span className="brand-content">
            <strong>
              Tech Digital Designers
            </strong>

            <small>
              Next Generation Digital Agency
            </small>
          </span>
        </Link>

        <button
          type="button"
          className="menu-button"
          onClick={() =>
            setOpen(
              (current) => !current
            )
          }
          aria-label={
            open
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={open}
        >
          {open ? (
            <X size={25} />
          ) : (
            <Menu size={25} />
          )}
        </button>

        <nav
          className={
            open
              ? "nav-links open"
              : "nav-links"
          }
        >
          <NavLink
            to="/"
            onClick={closeMenu}
          >
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

          <NavLink
            to="/about"
            onClick={closeMenu}
          >
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
              type="button"
              className="nav-login"
              onClick={handleLogout}
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