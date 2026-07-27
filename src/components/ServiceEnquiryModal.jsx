import React, {
  useEffect,
  useState,
} from "react";

import {
  CheckCircle2,
  ExternalLink,
  Phone,
  Send,
  X,
} from "lucide-react";

import API from "../api";

import "./ServiceEnquiryModal.css";

const ADMIN_WHATSAPP =
  "916367697913";

function createInitialForm(
  service
) {
  return {
    name: "",
    email: "",
    phone: "",
    service:
      service?.title || "",
    budget: "",
    message: "",
    whatsappConsent: false,
  };
}

export default function ServiceEnquiryModal({
  service,
  onClose,
}) {
  const [form, setForm] =
    useState(() =>
      createInitialForm(service)
    );

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState(null);

  useEffect(() => {
    setForm(
      createInitialForm(service)
    );

    setSuccess(null);
    setError("");
  }, [service]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.body.style.overflow =
      "hidden";

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        "";

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [onClose]);

  function handleChange(event) {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  }

  function buildWhatsAppUrl({
    enquiryId,
  }) {
    const message = [
      "Hello Tech Digital Designers,",
      "",
      "I have submitted a new service enquiry.",
      "",
      `Enquiry ID: ${enquiryId}`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Service: ${service?.title || form.service}`,
      `Budget: ${form.budget || "Not decided"}`,
      `Requirements: ${form.message}`,
      "",
      "Please review my enquiry and contact me with further details.",
    ].join("\n");

    return `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(
      message
    )}`;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      !form.whatsappConsent
    ) {
      setError(
        "Please allow WhatsApp updates before submitting."
      );

      return;
    }

    setSubmitting(true);
    setError("");

    /*
     * Browser async request के बाद popup
     * block कर सकता है, इसलिए user click
     * के समय blank window open करते हैं।
     */
    const whatsappWindow =
      window.open(
        "",
        "_blank"
      );

    try {
      const response =
        await API.post(
          "/contact",
          {
            ...form,

            serviceId:
              service?._id || null,

            service:
              service?.title ||
              form.service,

            serviceImage:
              service?.imageUrl ||
              "",
          }
        );

      const enquiryId =
        response.data?.enquiryId ||
        response.data?.enquiry?._id;

      if (!enquiryId) {
        throw new Error(
          "Enquiry ID was not received."
        );
      }

      const whatsappUrl =
        buildWhatsAppUrl({
          enquiryId,
        });

      setSuccess({
        enquiryId,
        whatsappUrl,
      });

      if (whatsappWindow) {
        whatsappWindow.location.href =
          whatsappUrl;
      }

      setForm(
        createInitialForm(service)
      );
    } catch (error) {
      if (whatsappWindow) {
        whatsappWindow.close();
      }

      console.error(
        "Service enquiry error:",
        error
      );

      setError(
        error.response?.data?.message ||
          error.message ||
          "Enquiry could not be submitted."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (!service) {
    return null;
  }

  return (
    <div
      className="service-modal-backdrop"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div
        className="service-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-modal-title"
      >
        <button
          type="button"
          className="service-modal-close"
          onClick={onClose}
          aria-label="Close enquiry form"
        >
          <X size={22} />
        </button>

        {success ? (
          <div className="service-success">
            <div className="service-success-icon">
              <CheckCircle2
                size={35}
                aria-hidden="true"
              />
            </div>

            <span>
              Enquiry Submitted
            </span>

            <h2>
              Your form has been submitted
              successfully
            </h2>

            <p>
              Your enquiry has been saved in
              our system. WhatsApp should now
              open with your enquiry details.
              Please press the Send button in
              WhatsApp.
            </p>

            <div className="enquiry-id">
              Enquiry ID:
              <strong>
                {success.enquiryId}
              </strong>
            </div>

            <div className="success-actions">
              <a
                className="btn whatsapp-action"
                href={success.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Send size={17} />
                Send on WhatsApp
                <ExternalLink size={14} />
              </a>

              <a
                className="call-action"
                href="tel:+916367697913"
              >
                <Phone size={17} />
                Call Now
              </a>
            </div>

            <p className="success-note">
              Admin review के बाद आगे की
              जानकारी आपके दिए हुए phone
              number पर दी जाएगी।
            </p>

            <button
              type="button"
              className="close-success"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="service-modal-header">
              <span className="eyebrow">
                Service Enquiry
              </span>

              <h2 id="service-modal-title">
                Get {service.title}
              </h2>

              <p>
                Complete the form to send your
                requirements to Tech Digital
                Designers.
              </p>
            </div>

            <div className="selected-service">
              {service.imageUrl && (
                <img
                  src={service.imageUrl}
                  alt={service.title}
                />
              )}

              <div>
                <small>
                  Selected Service
                </small>

                <strong>
                  {service.title}
                </strong>

                <p>
                  {service.shortDescription ||
                    service.description ||
                    "Professional digital service for your business."}
                </p>
              </div>
            </div>

            <form
              className="service-enquiry-form"
              onSubmit={handleSubmit}
            >
              <div className="enquiry-form-row">
                <label>
                  Full Name

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    autoComplete="name"
                    required
                  />
                </label>

                <label>
                  Phone Number

                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    autoComplete="tel"
                    pattern="[6-9][0-9]{9}"
                    title="Enter a valid 10-digit Indian mobile number"
                    required
                  />
                </label>
              </div>

              <div className="enquiry-form-row">
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
                  Estimated Budget

                  <select
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select budget
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
              </div>

              <label>
                Project Requirements

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Describe the features, design, timeline and other requirements."
                  required
                />
              </label>

              <label className="whatsapp-consent">
                <input
                  type="checkbox"
                  name="whatsappConsent"
                  checked={
                    form.whatsappConsent
                  }
                  onChange={handleChange}
                  required
                />

                <span>
                  I agree to send this enquiry
                  to Tech Digital Designers on
                  WhatsApp and receive enquiry
                  updates on my provided phone
                  number.
                </span>
              </label>

              {error && (
                <p
                  className="service-form-error"
                  role="alert"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="btn service-submit-button"
                disabled={submitting}
              >
                {submitting ? (
                  "Submitting..."
                ) : (
                  <>
                    Submit & Open WhatsApp
                    <Send size={17} />
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}