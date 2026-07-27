import React, {
  useState,
} from "react";

import "./Contact.css";

import API from "../api";
import PageHero from "../components/PageHero";
import SEO from "../components/SEO";

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

  const [submitting, setSubmitting] =
    useState(false);

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

    setSubmitting(true);
    setStatus("");

    try {
      const response =
        await API.post(
          "/contact",
          form
        );

      setForm(initialForm);

      setStatus(
        response.data?.message ||
          "Enquiry sent successfully."
      );
    } catch (error) {
      console.error(
        "Contact form error:",
        error
      );

      setStatus(
        error.response?.data?.message ||
          "Could not send enquiry. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <SEO
        title="Contact Tech Digital Designers for Website and Digital Marketing"
        description="Contact Tech Digital Designers for website development, mobile applications, ecommerce websites, SEO, digital marketing, social media handling, promotion and graphic design services."
        keywords="Tech Digital Designers contact, contact website developer, hire web developer India, hire digital marketer, website development quotation, app development quotation, digital marketing company contact"
        path="/contact"
      />

      <PageHero
        eyebrow="Contact"
        title="Tell us about your project"
        text="Share your requirements and our team will help you choose the right digital solution."
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
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
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
                placeholder="Enter your email address"
                autoComplete="email"
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Phone

              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                autoComplete="tel"
                pattern="[0-9+\-\s]{10,16}"
                required
              />
            </label>

            <label>
              Service

              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select a service
                </option>

                <option value="Website Development">
                  Website Development
                </option>

                <option value="Ecommerce Development">
                  Ecommerce Development
                </option>

                <option value="Mobile App Development">
                  Mobile App Development
                </option>

                <option value="SEO Services">
                  SEO Services
                </option>

                <option value="Digital Marketing">
                  Digital Marketing
                </option>

                <option value="Social Media Management">
                  Social Media Management
                </option>

                <option value="Poster and Graphic Design">
                  Poster and Graphic Design
                </option>

                <option value="Business Branding">
                  Business Branding
                </option>

                <option value="Other">
                  Other Service
                </option>
              </select>
            </label>
          </div>

          <label>
            Estimated Budget

            <select
              name="budget"
              value={form.budget}
              onChange={handleChange}
            >
              <option value="">
                Select your budget
              </option>

              <option value="Below ₹10,000">
                Below ₹10,000
              </option>

              <option value="₹10,000 - ₹25,000">
                ₹10,000 – ₹25,000
              </option>

              <option value="₹25,000 - ₹50,000">
                ₹25,000 – ₹50,000
              </option>

              <option value="₹50,000 - ₹1,00,000">
                ₹50,000 – ₹1,00,000
              </option>

              <option value="Above ₹1,00,000">
                Above ₹1,00,000
              </option>

              <option value="Not decided">
                Not decided yet
              </option>
            </select>
          </label>

          <label>
            Project Requirements

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={7}
              placeholder="Tell us about your business, required features and expected timeline."
              required
            />
          </label>

          <button
            className="btn"
            type="submit"
            disabled={submitting}
          >
            {submitting
              ? "Sending..."
              : "Send Enquiry"}
          </button>

          {status && (
            <p
              className="form-status"
              role="status"
            >
              {status}
            </p>
          )}
        </form>
      </section>
    </>
  );
}