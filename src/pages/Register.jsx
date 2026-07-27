import React from "react";
import "./Auth.css";
import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import API from "../api";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
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
        "/auth/register",
        form
      );

      login(response.data);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed"
      );
    }
  }

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]:
        event.target.value,
    });
  }

  return (
    <section className="auth-page">
      <form
        className="auth-card"
        onSubmit={handleSubmit}
      >
        <h1>Create Account</h1>

        <label>
          Name

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Phone

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
        </label>

        <label>
          Password

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>

        <button
          className="btn"
          type="submit"
        >
          Register
        </button>

        {error && (
          <p className="error-text">
            {error}
          </p>
        )}

        <p>
          Already registered?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
}
