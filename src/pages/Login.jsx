import React, {
  useState,
} from "react";

import "./Auth.css";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import API from "../api";
import SEO from "../components/SEO";
import "./Auth.css"
import {
  useAuth,
} from "../context/AuthContext";

export default function Login() {
  const [form, setForm] =
    useState({
      email: "",
      password: "",
    });

  const [error, setError] =
    useState("");

  const [submitting, setSubmitting] =
    useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  function handleChange(event) {
    const {
      name,
      value,
    } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSubmitting(true);

    try {
      const response =
        await API.post(
          "/auth/login",
          form
        );

      const user =
        response.data?.user;

      const token =
        response.data?.token ||
        response.data?.accessToken;

      if (!user) {
        throw new Error(
          "User information was not received."
        );
      }

      login(user, token);

      navigate(
        user.role === "admin"
          ? "/admin"
          : "/",
        {
          replace: true,
        }
      );
    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      setError(
        error.response?.data?.message ||
          error.message ||
          "Login failed. Please check your details."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <SEO
        title="Account Login"
        description="Secure login page for Tech Digital Designers users and administrators."
        path="/login"
        noIndex
      />

      <section className="auth-page">
        <form
          className="auth-card"
          onSubmit={handleSubmit}
        >
          <p className="auth-eyebrow">
            Welcome Back
          </p>

          <h1>
            User Login
          </h1>

          <p className="auth-description">
            Sign in to access your Tech
            Digital Designers account.
          </p>

          <label>
            Email Address

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
              required
            />
          </label>

          <label>
            Password

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              minLength={6}
              required
            />
          </label>

          <button
            className="btn"
            type="submit"
            disabled={submitting}
          >
            {submitting
              ? "Signing In..."
              : "Login"}
          </button>

          {error && (
            <p
              className="error-text"
              role="alert"
            >
              {error}
            </p>
          )}

          <p className="auth-switch">
            New user?{" "}

            <Link to="/register">
              Create an account
            </Link>
          </p>
        </form>
      </section>
    </>
  );
}