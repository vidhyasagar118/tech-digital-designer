import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import SEO from "../components/SEO";

import {
  organizationSchema,
  websiteSchema,
  homeServiceSchema,
} from "../seo/schemas";
import API from "../api";
import Slider from "../components/Slider";
import {
  getImageUrl,
  handleImageError,
} from "../utils/image";

export default function Home() {
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [pricing, setPricing] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadHomeData() {
      try {
        setLoading(true);
        setError("");

        const [
          servicesResponse,
          projectsResponse,
          pricingResponse,
        ] = await Promise.all([
          API.get("/content/services"),
          API.get("/content/projects"),
          API.get("/content/pricing"),
        ]);

        if (!isMounted) return;

        const servicesData = Array.isArray(
          servicesResponse.data
        )
          ? servicesResponse.data
          : servicesResponse.data?.items || [];

        const projectsData = Array.isArray(
          projectsResponse.data
        )
          ? projectsResponse.data
          : projectsResponse.data?.items || [];

        const pricingData = Array.isArray(
          pricingResponse.data
        )
          ? pricingResponse.data
          : pricingResponse.data?.items || [];

        setServices(servicesData.slice(0, 9));
        setProjects(projectsData.slice(0, 9));
        setPricing(pricingData.slice(0, 9));
      } catch (err) {
        console.error("Home data error:", err);

        if (isMounted) {
          setError(
            err.response?.data?.message ||
              "Home page content load nahi ho saka."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadHomeData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <SEO
    title="Tech Digital Designers - Website, App, SEO & Digital Marketing Company"
    description="Grow your business with professional website development, mobile apps, SEO, digital marketing, social media promotion, poster design, ads creation and branding services by Tech Digital Designers."
    keywords="Tech Digital Designers, tech digital designer, website development company, web designing company, app development company, digital marketing agency, SEO company India, social media marketing, Instagram promotion, Facebook promotion, WhatsApp marketing, poster design, graphic designer, business promotion, website developer Chittorgarh, website developer Motihari"
    path="/"
    schema={{
      "@context": "https://schema.org",
      "@graph": [
        organizationSchema,
        websiteSchema,
        homeServiceSchema,
      ],
    }}
  />
      <main className="home-page">
        

      <Slider />

      {error && (
        <div className="container">
          <div className="home-error">{error}</div>
        </div>
      )}

      {/* Services */}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                Our Services
              </span>

              <h2>
                Complete digital solutions for every
                business requirement
              </h2>

              <p>
                Website development, mobile apps,
                marketing, social media promotion,
                creative design and advertising
                services.
              </p>
            </div>

            <Link
              className="section-link"
              to="/services"
            >
              View all services
            </Link>
          </div>

          {loading ? (
            <div className="content-loading">
              Loading services...
            </div>
          ) : services.length === 0 ? (
            <div className="empty-content">
              Admin panel se services add karo.
            </div>
          ) : (
            <div className="card-grid">
              {services.map((service) => (
                <article
                  className="content-card"
                  key={service._id}
                >
                  <Link
                    className="content-card-image"
                    to="/services"
                  >
                    <img
                      src={getImageUrl(service)}
                      alt={
                        service.title ||
                        "Tech Digital Designers service"
                      }
                      loading="lazy"
                      onError={handleImageError}
                    />

                    {service.category && (
                      <span className="card-category">
                        {service.category}
                      </span>
                    )}
                  </Link>

                  <div className="content-card-body">
                    <h3>
                      {service.title ||
                        "Digital Service"}
                    </h3>

                    <p>
                      {service.shortDescription ||
                        service.description ||
                        "Professional digital services for your business."}
                    </p>

                    <Link
                      className="card-link"
                      to="/contact"
                    >
                      Get this service
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Projects */}
      <section className="section section-muted">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                Recent Projects
              </span>

              <h2>
                Work created for businesses,
                professionals and startups
              </h2>

              <p>
                All projects can be added, updated and
                removed directly from the admin panel.
              </p>
            </div>

            <Link
              className="section-link"
              to="/projects"
            >
              View all projects
            </Link>
          </div>

          {loading ? (
            <div className="content-loading">
              Loading projects...
            </div>
          ) : projects.length === 0 ? (
            <div className="empty-content">
              Admin panel se projects add karo.
            </div>
          ) : (
            <div className="card-grid">
              {projects.map((project) => (
                <article
                  className="content-card"
                  key={project._id}
                >
                  <div className="content-card-image">
                    <img
                      src={getImageUrl(project)}
                      alt={
                        project.title ||
                        "Tech Digital Designers project"
                      }
                      loading="lazy"
                      onError={handleImageError}
                    />

                    {project.category && (
                      <span className="card-category">
                        {project.category}
                      </span>
                    )}
                  </div>

                  <div className="content-card-body">
                    <h3>
                      {project.title ||
                        "Digital Project"}
                    </h3>

                    <p>
                      {project.shortDescription ||
                        project.description ||
                        "A professionally completed Tech Digital Designers project."}
                    </p>

                    {project.liveUrl ? (
                      <a
                        className="card-link"
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View live project
                      </a>
                    ) : (
                      <Link
                        className="card-link"
                        to="/projects"
                      >
                        View details
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Pricing */}
      <section className="section pricing-section">
        <div className="container">
                            <Link
              className="section-link"
              to="/pricing"
            >
              View all pricing
            </Link>
            
          <div className="center-heading">
            
            <span className="eyebrow">
              Flexible Pricing
            </span>

            <h2>
              Plans created according to your needs
            </h2>

            <p>
              Choose a suitable plan or contact us for
              a custom quotation.
            </p>
          </div>


          {loading ? (
            <div className="content-loading">
              Loading pricing plans...
            </div>
          ) : pricing.length === 0 ? (
            <div className="empty-content">
              Admin panel se pricing plans add karo.
            </div>
          ) : (
            <div className="pricing-grid">
              {pricing.map((plan) => (
                <article
                  className={
                    plan.highlighted
                      ? "pricing-card highlighted"
                      : "pricing-card"
                  }
                  key={plan._id}
                >
                  {plan.highlighted && (
                    <span className="popular-badge">
                      Popular
                    </span>
                  )}

                  <div className="pricing-image">
                    <img
                      src={getImageUrl(plan)}
                      alt={
                        plan.planName ||
                        "Tech Digital Designers pricing plan"
                      }
                      loading="lazy"
                      onError={handleImageError}
                    />
                  </div>

                  <div className="pricing-card-body">
                    <small>
                      {plan.serviceName ||
                        "Digital Service"}
                    </small>

                    <h3>
                      {plan.planName || "Basic Plan"}
                    </h3>

                    <div className="price">
                      <span>₹</span>

                      <strong>
                        {Number(
                          plan.price || 0
                        ).toLocaleString("en-IN")}
                      </strong>
                    </div>

                    <p className="billing-text">
                      {plan.billingText ||
                        "Starting price"}
                    </p>

                    {Array.isArray(plan.features) &&
                      plan.features.length > 0 && (
                        <ul className="pricing-features">
                          {plan.features
                            .slice(0, 5)
                            .map((feature, index) => (
                              <li key={index}>
                                {feature}
                              </li>
                            ))}
                        </ul>
                      )}

                    <Link
                      className="btn pricing-button"
                      to="/contact"
                    >
                      Choose Plan
                    </Link>
                  </div>
                </article>
              ))}

            </div>
            
          )}
                        
             
        </div>
        
      </section>

      {/* CTA */}
      <section className="home-cta">
        <div className="container home-cta-content">
          <div>
            <span className="eyebrow">
              Start Your Project
            </span>

            <h2>
              Ready to grow your business digitally?
            </h2>

            <p>
              Contact Tech Digital Designers for websites, apps,
              promotion, designs, advertisements and
              complete digital support.
            </p>
          </div>

          <Link
            className="btn home-cta-button"
            to="/contact"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
    </>
  );
}