import React, {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import API from "../api";
import SEO from "../components/SEO";

import {
  useAuth,
} from "../context/AuthContext";

import "./Auth.css";

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

    setForm((current) => ({
      ...current,
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

      /*
       * AuthContext login() को पूरा
       * response.data चाहिए:
       * { token, user }
       */
      login(response.data);

      const role =
        response.data?.user?.role;

      navigate(
        role === "admin"
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
        error.response?.data
          ?.message ||
          "Login failed. Check your email and password."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <SEO
        title="Account Login"
        description="Secure login for Tech Digital Designers users and administrators."
        path="/login"
        noIndex
      />

      <section className="auth-page">
        <form
          className="auth-card"
          onSubmit={handleSubmit}
        >
          <h1>
            User Login
          </h1>

          <label>
            Email

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
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
              autoComplete="current-password"
              required
            />
          </label>

          <button
            className="btn"
            type="submit"
            disabled={submitting}
          >
            {submitting
              ? "Logging in..."
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

          <p>
            New user?{" "}

            <Link to="/register">
              Create account
            </Link>
          </p>
        </form>
      </section>
    </>
  );
}