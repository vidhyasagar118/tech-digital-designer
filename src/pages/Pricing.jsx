import React, {
  useEffect,
  useState,
} from "react";

import {
  CheckCircle2,
} from "lucide-react";

import API from "../api";
import PageHero from "../components/PageHero";
import SEO from "../components/SEO";

import "./Pricing.css";

export default function Pricing() {
  const [plans, setPlans] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadPricing() {
      setLoading(true);
      setError("");

      try {
        const response =
          await API.get(
            "/content/pricing"
          );

        if (!isMounted) return;

        const pricingData =
          Array.isArray(response.data)
            ? response.data
            : response.data?.items ||
              response.data?.plans ||
              [];

        setPlans(pricingData);
      } catch (error) {
        console.error(
          "Pricing load error:",
          error
        );

        if (isMounted) {
          setError(
            error.response?.data
              ?.message ||
              "Pricing plans could not be loaded."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadPricing();

    return () => {
      isMounted = false;
    };
  }, []);

  function formatPrice(price) {
    const numericPrice =
      Number(price);

    if (
      Number.isNaN(numericPrice)
    ) {
      return price || "Contact us";
    }

    return new Intl.NumberFormat(
      "en-IN"
    ).format(numericPrice);
  }

  function handleImageError(event) {
    event.currentTarget.src =
      "/pricing-placeholder.jpg";

    event.currentTarget.onerror =
      null;
  }

  return (
    <>
      <SEO
        title="Website, App and Digital Marketing Pricing in India"
        description="Explore affordable website development, ecommerce website, mobile app, SEO, digital marketing, social media promotion and graphic design packages from Tech Digital Designers."
        keywords="Tech Digital Designers pricing, website development price India, ecommerce website cost, app development price, SEO packages, digital marketing charges, poster design price"
        path="/pricing"
      />

      <PageHero
        eyebrow="Pricing"
        title="Flexible pricing plans for every business"
        text="Compare website, application, marketing and creative service packages offered by Tech Digital Designers."
      />

      <section className="section pricing-page-section">
        <div className="container">
          <div className="pricing-intro">
            <span className="eyebrow">
              Choose Your Plan
            </span>

            <h2>
              Basic, moderate and advanced
              digital solutions
            </h2>

            <p>
              Select a suitable package or
              contact us for a custom quotation.
              Final prices may vary according to
              features, integrations, content
              and delivery timeline.
            </p>
          </div>

          {loading && (
            <div
              className="pricing-message"
              role="status"
            >
              Loading pricing plans...
            </div>
          )}

          {!loading && error && (
            <div
              className="pricing-message pricing-error"
              role="alert"
            >
              {error}
            </div>
          )}

          {!loading &&
            !error &&
            plans.length === 0 && (
              <div className="pricing-message">
                No pricing plans are available
                right now. Please contact us
                for a custom quotation.
              </div>
            )}

          {!loading &&
            !error &&
            plans.length > 0 && (
              <div className="pricing-grid">
                {plans.map(
                  (plan, index) => {
                    const features =
                      Array.isArray(
                        plan.features
                      )
                        ? plan.features
                        : [];

                    return (
                      <article
                        className={
                          plan.highlighted
                            ? "pricing-card highlighted"
                            : "pricing-card"
                        }
                        key={
                          plan._id ||
                          plan.id ||
                          `${plan.planName}-${index}`
                        }
                      >
                        {plan.highlighted && (
                          <span className="pricing-badge">
                            Most Popular
                          </span>
                        )}

                        <div className="pricing-image">
                          <img
                            src={
                              plan.imageUrl ||
                              "/pricing-placeholder.jpg"
                            }
                            alt={
                              plan.planName
                                ? `${plan.planName} pricing plan`
                                : "Tech Digital Designers pricing plan"
                            }
                            loading="lazy"
                            onError={
                              handleImageError
                            }
                          />
                        </div>

                        <div className="pricing-card-content">
                          <small className="pricing-service">
                            {plan.serviceName ||
                              "Digital Service"}
                          </small>

                          <h2>
                            {plan.planName ||
                              "Custom Plan"}
                          </h2>

                          <div className="pricing-price">
                            {plan.price !==
                              undefined &&
                            plan.price !==
                              null &&
                            plan.price !==
                              "" ? (
                              <>
                                <span>
                                  ₹
                                </span>

                                <strong>
                                  {formatPrice(
                                    plan.price
                                  )}
                                </strong>
                              </>
                            ) : (
                              <strong className="contact-price">
                                Contact Us
                              </strong>
                            )}
                          </div>

                          <p className="pricing-billing">
                            {plan.billingText ||
                              "Price depends on project requirements."}
                          </p>

                          {features.length >
                            0 && (
                            <ul className="pricing-features">
                              {features.map(
                                (
                                  feature,
                                  featureIndex
                                ) => (
                                  <li
                                    key={`${feature}-${featureIndex}`}
                                  >
                                    <CheckCircle2
                                      size={18}
                                      aria-hidden="true"
                                    />

                                    <span>
                                      {feature}
                                    </span>
                                  </li>
                                )
                              )}
                            </ul>
                          )}

                          <a
                            className="btn pricing-button"
                            href={`/contact?service=${encodeURIComponent(
                              plan.serviceName ||
                                plan.planName ||
                                "Custom Project"
                            )}`}
                          >
                            Request Plan
                          </a>
                        </div>
                      </article>
                    );
                  }
                )}
              </div>
            )}
        </div>
      </section>
    </>
  );
}