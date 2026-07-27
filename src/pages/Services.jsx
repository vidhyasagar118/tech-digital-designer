import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import API from "../api";
import PageHero from "../components/PageHero";
import "./services.css";

export default function Services() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadItems() {
      try {
        setLoading(true);
        setError("");

        const response = await API.get(
          "/content/services"
        );

        if (!isMounted) return;

        const servicesData = Array.isArray(
          response.data
        )
          ? response.data
          : response.data?.items || [];

        setItems(servicesData);
      } catch (err) {
        console.error("Services load error:", err);

        if (isMounted) {
          setError(
            err.response?.data?.message ||
              "Services could not be loaded. Please try again later."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadItems();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Complete digital services for businesses and professionals"
        text="From websites and mobile apps to social media promotion, advertising, poster design, branding and SEO,   Tech Digital Designer
 provides complete digital support."
      />

      <section className="section">
        <div className="container">
          <div className="services-intro">
            <span className="eyebrow">
              What We Offer
            </span>

            <h2>
              Everything you need to build and grow
              your business online
            </h2>

            <p>
              All services added from the admin panel
              will automatically appear on this page.
            </p>
          </div>

          {loading && (
            <div className="services-loading">
              Loading services...
            </div>
          )}

          {!loading && error && (
            <div className="services-loading services-error">
              {error}
            </div>
          )}

          {!loading &&
            !error &&
            items.length === 0 && (
              <div className="services-loading">
                No services available right now.
              </div>
            )}

          {!loading &&
            !error &&
            items.length > 0 && (
              <div className="services-grid">
                {items.map((item) => (
                  <article
                    className="service-card"
                    key={item._id}
                  >
                    <div className="service-image">
                      <img
                        src={item.imageUrl}
                        alt={
                          item.title ||
                          "              Tech Digital Designer service"
                        }
                        loading="lazy"
                      />

                      {item.category && (
                        <span className="service-category">
                          {item.category}
                        </span>
                      )}
                    </div>

                    <div className="service-content">
                      <h3>
                        {item.title ||
                          "Digital Service"}
                      </h3>

                      <p>
                        {item.shortDescription ||
                          item.description ||
                          "Professional digital service for your business."}
                      </p>

                      <Link
                        className="service-link"
                        to="/contact"
                      >
                        Get This Service
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
        </div>
      </section>

      <section className="services-cta">
        <div className="container services-cta-content">
          <div>
            <span className="eyebrow">
              Need a Custom Service?
            </span>

            <h2>
              Tell us what your business needs
            </h2>

            <p>
              We can create a custom website, app,
              marketing plan, advertising campaign or
              design package according to your budget.
            </p>
          </div>

          <Link
            className="btn services-cta-button"
            to="/contact"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}