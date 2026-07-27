import React, {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import API from "../api";
import PageHero from "../components/PageHero";
import SEO from "../components/SEO";

import ServiceEnquiryModal from "../components/ServiceEnquiryModal";

import "./services.css";

export default function Services() {
  const [items, setItems] =
    useState([]);

  const [
    selectedService,
    setSelectedService,
  ] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadItems() {
      setLoading(true);
      setError("");

      try {
        const response =
          await API.get(
            "/content/services"
          );

        if (!isMounted) {
          return;
        }

        const servicesData =
          Array.isArray(
            response.data
          )
            ? response.data
            : response.data?.items ||
              [];

        setItems(servicesData);
      } catch (error) {
        console.error(
          "Services load error:",
          error
        );

        if (isMounted) {
          setError(
            error.response?.data
              ?.message ||
              "Services could not be loaded."
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

  function handleImageError(event) {
    event.currentTarget.src =
      "/service-placeholder.jpg";

    event.currentTarget.onerror =
      null;
  }

  return (
    <>
      <SEO
        title="Website, App and Digital Marketing Services"
        description="Explore website development, mobile app development, ecommerce, SEO, digital marketing, promotion, graphic design and branding services by Tech Digital Designers."
        keywords="Tech Digital Designers services, website development, app development, ecommerce website, SEO services, digital marketing, poster design"
        path="/services"
      />

      <PageHero
        eyebrow="Our Services"
        title="Complete digital services for businesses and professionals"
        text="From websites and mobile apps to social media promotion, advertising, poster design, branding and SEO, Tech Digital Designers provides complete digital support."
      />

      <section className="section">
        <div className="container">
          <div className="services-intro">
            <span className="eyebrow">
              What We Offer
            </span>

            <h2>
              Everything you need to build
              and grow your business online
            </h2>

            <p>
              Select a service and share your
              requirements. Your enquiry will
              be saved and prepared for
              WhatsApp.
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
                No services are available
                right now.
              </div>
            )}

          {!loading &&
            !error &&
            items.length > 0 && (
              <div className="services-grid">
                {items.map(
                  (item, index) => (
                    <article
                      className="service-card"
                      key={
                        item._id ||
                        `${item.title}-${index}`
                      }
                    >
                      <div className="service-image">
                        <img
                          src={
                            item.imageUrl ||
                            "/service-placeholder.jpg"
                          }
                          alt={
                            item.title ||
                            "Tech Digital Designers service"
                          }
                          loading="lazy"
                          onError={
                            handleImageError
                          }
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

                        <button
                          type="button"
                          className="service-link"
                          onClick={() =>
                            setSelectedService(
                              item
                            )
                          }
                        >
                          Get This Service
                        </button>
                      </div>
                    </article>
                  )
                )}
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
              We can create a custom website,
              application, marketing plan or
              design package according to your
              requirements and budget.
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

      {selectedService && (
        <ServiceEnquiryModal
          service={selectedService}
          onClose={() =>
            setSelectedService(null)
          }
        />
      )}
    </>
  );
}