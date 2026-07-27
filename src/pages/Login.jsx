import React from "react";
import "./Auth.css";
import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import API from "../api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] =
    useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await API.post(
        "/auth/login",
        form
      );

      login(response.data);

      navigate(
        response.data.user.role === "admin"
          ? "/admin"
          : "/"
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed"
      );
    }
  }

  return (
    <section className="auth-page">
      <form
        className="auth-card"
        onSubmit={handleSubmit}
      >
        <h1>User Login</h1>

        <label>
          Email

          <input
            type="email"
            value={form.email}
            onChange={(event) =>
              setForm({
                ...form,
                email: event.target.value,
              })
            }
            required
          />
        </label>

        <label>
          Password

          <input
            type="password"
            value={form.password}
            onChange={(event) =>
              setForm({
                ...form,
                password:
                  event.target.value,
              })
            }
            required
          />
        </label>

        <button
          className="btn"
          type="submit"
        >
          Login
        </button>

        {error && (
          <p className="error-text">
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
  );
}
