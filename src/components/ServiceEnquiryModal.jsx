import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  CheckCircle2,
  IndianRupee,
  X,
} from "lucide-react";

import API from "../api";
import "./ServiceEnquiryModal.css";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  pricingId: "",
  message: "",
  whatsappConsent: true,
};

function normalize(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]/g, "");
}

function normalizeWhatsAppNumber(
  value
) {
  const digits = String(
    value || ""
  ).replace(/\D/g, "");

  if (digits.length === 10) {
    return `91${digits}`;
  }

  return digits;
}

export default function ServiceEnquiryModal({
  service,
  onClose,
}) {
  const [form, setForm] =
    useState(initialForm);
  const [plans, setPlans] = useState([]);
  const [plansLoading, setPlansLoading] =
    useState(true);
  const [submitting, setSubmitting] =
    useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] =
    useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    let active = true;

    async function loadPlans() {
      setPlansLoading(true);
      setError("");

      try {
        const response =
          await API.get("/content/pricing");

        if (!active) return;

        const allPlans = Array.isArray(
          response.data
        )
          ? response.data
          : response.data?.items || [];

        const serviceSlug = normalize(
          service?.serviceSlug
        );
        const serviceTitle = normalize(
          service?.title
        );

        /*
         * पहले exact serviceSlug match करें।
         * Category slug से filter करने पर उसी
         * category की सभी services के plans
         * dropdown में आ जाते थे।
         */
        const plansByServiceSlug =
          serviceSlug
            ? allPlans.filter(
                (plan) =>
                  normalize(
                    plan.serviceSlug
                  ) === serviceSlug
              )
            : [];

        /*
         * पुराने database records में
         * serviceSlug न होने पर exact service
         * name से fallback matching होगी।
         */
        const plansByServiceName =
          allPlans.filter(
            (plan) =>
              normalize(
                plan.serviceName
              ) === serviceTitle
          );

        const matchingPlans =
          plansByServiceSlug.length > 0
            ? plansByServiceSlug
            : plansByServiceName;

        setPlans(
          matchingPlans.sort(
            (a, b) =>
              (Number(a.order) || 0) -
                (Number(b.order) || 0) ||
              (Number(a.price) || 0) -
                (Number(b.price) || 0)
          )
        );
      } catch (requestError) {
        console.error(
          "Pricing plans load error:",
          requestError
        );
        setError(
          "Pricing plans could not be loaded."
        );
      } finally {
        if (active) {
          setPlansLoading(false);
        }
      }
    }

    loadPlans();

    return () => {
      active = false;
    };
  }, [service]);

  const selectedPlan = useMemo(
    () =>
      plans.find(
        (plan) =>
          plan._id === form.pricingId
      ) || null,
    [plans, form.pricingId]
  );

  function handleChange(event) {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setForm((current) => ({
      ...current,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (
      plans.length > 0 &&
      !form.pricingId
    ) {
      setError(
        "Please select a pricing plan."
      );
      return;
    }

    /*
     * Window user click के दौरान खोलना जरूरी है,
     * वरना async request के बाद browser popup
     * block कर सकता है।
     */
    const whatsappWindow =
      window.open("", "_blank");

    setSubmitting(true);

    try {
      const response = await API.post(
        "/contact",
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          pricingId:
            form.pricingId || null,
          message: form.message,
          whatsappConsent:
            form.whatsappConsent,
          serviceId: service?._id,
          service:
            service?.title ||
            "Digital Service",
          serviceImage:
            service?.imageUrl || "",
        }
      );

      setSuccess(
        response.data?.message ||
          "Enquiry submitted successfully."
      );

      const savedEnquiry =
        response.data?.enquiry || {};

      const adminNumber =
        normalizeWhatsAppNumber(
          import.meta.env
            .VITE_ADMIN_WHATSAPP_NUMBER ||
            "6367697913"
        );

      const planName =
        savedEnquiry.selectedPlan ||
        selectedPlan?.planName ||
        "Custom Quote";

      const planPrice =
        savedEnquiry.selectedPrice !==
          undefined &&
        savedEnquiry.selectedPrice !== null
          ? `₹${Number(
              savedEnquiry.selectedPrice
            ).toLocaleString("en-IN")}`
          : "Custom quotation required";

      const whatsappMessage = [
        "Hello Tech Digital Designers,",
        "",
        "I have submitted a new service enquiry.",
        "",
        response.data?.enquiryId
          ? `Enquiry ID: ${response.data.enquiryId}`
          : "",
        `Name: ${form.name}`,
        `Phone: ${form.phone}`,
        `Email: ${form.email}`,
        `Service: ${
          service?.title ||
          "Digital Service"
        }`,
        service?.category
          ? `Category: ${service.category}`
          : "",
        `Selected Plan: ${planName}`,
        `Price: ${planPrice}`,
        "",
        `Requirements: ${form.message}`,
      ]
        .filter(Boolean)
        .join("\n");

      const whatsappUrl =
        `https://wa.me/${adminNumber}` +
        `?text=${encodeURIComponent(
          whatsappMessage
        )}`;

      if (whatsappWindow) {
        whatsappWindow.location.href =
          whatsappUrl;
      } else {
        window.location.href =
          whatsappUrl;
      }

      setForm(initialForm);
    } catch (requestError) {
      if (whatsappWindow) {
        whatsappWindow.close();
      }

      console.error(
        "Service enquiry error:",
        requestError
      );
      setError(
        requestError.response?.data
          ?.message ||
          "Enquiry could not be submitted."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="service-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <section
        className="service-enquiry-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-enquiry-title"
      >
        <button
          type="button"
          className="service-modal-close"
          onClick={onClose}
          aria-label="Close enquiry form"
        >
          <X size={20} />
        </button>

        <div className="service-modal-heading">
          <span>Service Enquiry</span>
          <h2 id="service-enquiry-title">
            {service?.title ||
              "Digital Service"}
          </h2>
          <p>
            {service?.category ||
              "Tech Digital Designers"}
          </p>
        </div>

        {error && (
          <div className="service-modal-message error">
            {error}
          </div>
        )}

        {success ? (
          <div className="service-modal-success">
            <CheckCircle2 size={42} />
            <h3>Enquiry Submitted</h3>
            <p>{success}</p>
            <button
              type="button"
              className="btn"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        ) : (
          <form
            className="service-enquiry-form"
            onSubmit={handleSubmit}
          >
            <div className="service-modal-row">
              <label>
                Name
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Phone
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  pattern="[6-9][0-9]{9}"
                  placeholder="10-digit mobile number"
                  required
                />
              </label>
            </div>

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
              Select Service Plan
              <select
                name="pricingId"
                value={form.pricingId}
                onChange={handleChange}
                disabled={plansLoading}
                required={plans.length > 0}
              >
                <option value="">
                  {plansLoading
                    ? "Loading plans..."
                    : plans.length > 0
                      ? "Choose Basic, Professional or Advanced"
                      : "Custom quotation"}
                </option>

                {plans.map((plan) => (
                  <option
                    value={plan._id}
                    key={plan._id}
                  >
                    {plan.planName} — ₹
                    {Number(
                      plan.price
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </option>
                ))}
              </select>
            </label>

            {!plansLoading &&
              plans.length === 0 && (
                <div className="pricing-plan-warning">
                  इस service के लिए कोई matching
                  active pricing plan नहीं मिला।
                  Service और Pricing records में
                  Service Slug को
                  <strong>
                    {" "}
                    {service?.serviceSlug ||
                      "service-slug"}
                  </strong>{" "}
                  के समान रखें।
                </div>
              )}

            {selectedPlan && (
              <div className="selected-plan-summary">
                <div>
                  <small>Selected Plan</small>
                  <strong>
                    {selectedPlan.planName}
                  </strong>
                </div>

                <div className="selected-plan-price">
                  <IndianRupee size={17} />
                  <strong>
                    {Number(
                      selectedPlan.price
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>

                {Array.isArray(
                  selectedPlan.features
                ) &&
                  selectedPlan.features
                    .length > 0 && (
                    <ul>
                      {selectedPlan.features
                        .slice(0, 5)
                        .map((feature) => (
                          <li key={feature}>
                            {feature}
                          </li>
                        ))}
                    </ul>
                  )}
              </div>
            )}

            <label>
              Requirements
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="Tell us about your required features and timeline."
                required
              />
            </label>

            <label className="service-whatsapp-consent">
              <input
                type="checkbox"
                name="whatsappConsent"
                checked={
                  form.whatsappConsent
                }
                onChange={handleChange}
              />
              Contact me on WhatsApp regarding
              this enquiry.
            </label>

            <button
              type="submit"
              className="btn service-modal-submit"
              disabled={submitting}
            >
              {submitting
                ? "Submitting..."
                : "Submit Enquiry"}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
