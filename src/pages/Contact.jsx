import React from "react";
import "./Contact.css";
import { useState } from "react";

import API from "../api";
import PageHero from "../components/PageHero";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  service: "",
  budget: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] =
    useState(initialForm);

  const [status, setStatus] =
    useState("");

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]:
        event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await API.post("/contact", form);

      setForm(initialForm);
      setStatus(
        "Enquiry sent successfully."
      );
    } catch (error) {
      setStatus(
        error.response?.data?.message ||
          "Could not send enquiry."
      );
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us about your project"
        text="Use this simple form to send your requirements."
      />

      <section className="section">
        <form
          className="contact-form container"
          onSubmit={handleSubmit}
        >
          <div className="form-row">
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
          </div>

          <div className="form-row">
            <label>
              Phone

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Service

              <input
                name="service"
                value={form.service}
                onChange={handleChange}
              />
            </label>
          </div>

          <label>
            Budget

            <input
              name="budget"
              value={form.budget}
              onChange={handleChange}
            />
          </label>

          <label>
            Message

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={6}
              required
            />
          </label>

          <button
            className="btn"
            type="submit"
          >
            Send Enquiry
          </button>

          {status && (
            <p className="form-status">
              {status}
            </p>
          )}
        </form>
      </section>
    </>
  );
}
