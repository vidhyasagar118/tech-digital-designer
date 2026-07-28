import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import API from "../api";

import SEO from "../components/SEO";
import Slider from "../components/Slider";

import {
  organizationSchema,
  websiteSchema,
  homeServiceSchema,
} from "../seo/schemas";

import {
  getImageUrl,
  handleImageError,
} from "../utils/image";

import "./home.css";

function makeSlug(value = "") {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function Home() {
  const [services, setServices] =
    useState([]);

  const [projects, setProjects] =
    useState([]);

  const [pricing, setPricing] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadHomeData() {
      setLoading(true);
      setError("");

      try {
        const [
          servicesResponse,
          projectsResponse,
          pricingResponse,
        ] = await Promise.all([
          API.get(
            "/content/services"
          ),

          API.get(
            "/content/projects"
          ),

          API.get(
            "/content/pricing"
          ),
        ]);

        if (!isMounted) {
          return;
        }

        const servicesData =
          Array.isArray(
            servicesResponse.data
          )
            ? servicesResponse.data
            : servicesResponse.data
                ?.items || [];

        const projectsData =
          Array.isArray(
            projectsResponse.data
          )
            ? projectsResponse.data
            : projectsResponse.data
                ?.items || [];

        const pricingData =
          Array.isArray(
            pricingResponse.data
          )
            ? pricingResponse.data
            : pricingResponse.data
                ?.items || [];

        setServices(servicesData);

        setProjects(
          projectsData.slice(0, 9)
        );

        setPricing(
          pricingData.slice(0, 9)
        );
      } catch (error) {
        console.error(
          "Home data error:",
          error
        );

        if (isMounted) {
          setError(
            error.response?.data
              ?.message ||
              "Home page content could not be loaded."
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

  const serviceCategories =
    useMemo(() => {
      const groups = new Map();

      services.forEach((service) => {
        const category =
          service.category?.trim() ||
          "Other Services";

        const slug =
          service.categorySlug ||
          makeSlug(category);

        if (!groups.has(slug)) {
          groups.set(slug, {
            slug,
            title: category,
            description:
              service.categoryDescription ||
              service.shortDescription ||
              "Professional digital solutions for your business.",
            imageUrl: getImageUrl(service),
            order:
              Number(
                service.categoryOrder
              ) || 0,
            representative:
              service,
          });
        }

        if (
          service.showCategoryOnHome
        ) {
          const group =
            groups.get(slug);

          group.description =
            service.categoryDescription ||
            service.shortDescription ||
            group.description;
          group.imageUrl =
            getImageUrl(service);
          group.representative =
            service;
          group.order =
            Number(
              service.categoryOrder
            ) || group.order;
        }
      });

      return [...groups.values()]
        .sort(
          (a, b) =>
            a.order - b.order ||
            a.title.localeCompare(
              b.title
            )
        )
        .slice(0, 7);
    }, [services]);

  return (
    <>
      <SEO
        title="Tech Digital Designers - Website, App, SEO & Digital Marketing Company"
        description="Grow your business with professional website development, mobile apps, SEO, digital marketing, social media promotion, poster design, ads creation and branding services by Tech Digital Designers."
        keywords="Tech Digital Designers, website development company, web designing company, app development company, digital marketing agency, SEO company India, social media marketing, Instagram promotion, Facebook promotion, WhatsApp marketing, poster design, website developer Chittorgarh"
        path="/"
        schema={{
          "@context":
            "https://schema.org",

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
            <div className="home-error">
              {error}
            </div>
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
                  Complete digital solutions
                  for every business requirement
                </h2>

                <p>
                  Website development, mobile
                  apps, marketing, social media
                  promotion, creative design and
                  advertising services.
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
            ) : serviceCategories.length ===
              0 ? (
              <div className="empty-content">
                No services are available
                right now.
              </div>
            ) : (
              <div className="home-service-category-grid">
                {serviceCategories.map(
                  (category) => (
                    <Link
                      className="home-service-category-card"
                      key={category.slug}
                      to={`/services?category=${encodeURIComponent(
                        category.slug
                      )}`}
                    >
                      <div className="home-service-category-image">
                        <img
                          src={
                            category.imageUrl
                          }
                          alt={
                            category.title
                          }
                          loading="lazy"
                          onError={
                            handleImageError
                          }
                        />
                      </div>

                      <div className="home-service-category-body">
                        <h3>
                          {category.title}
                        </h3>

                        <p>
                          {
                            category.description
                          }
                        </p>

                        <span aria-hidden="true">
                          →
                        </span>
                      </div>
                    </Link>
                  )
                )}
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
                  Explore our recently completed
                  website and digital projects.
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
            ) : projects.length ===
              0 ? (
              <div className="empty-content">
                No projects are available
                right now.
              </div>
            ) : (
              <div className="card-grid">
                {projects.map(
                  (project, index) => (
                    <article
                      className="content-card"
                      key={
                        project._id ||
                        `${project.title}-${index}`
                      }
                    >
                      <div className="content-card-image">
                        <img
                          src={getImageUrl(
                            project
                          )}
                          alt={
                            project.title ||
                            "Tech Digital Designers project"
                          }
                          loading="lazy"
                          onError={
                            handleImageError
                          }
                        />

                        {project.category && (
                          <span className="card-category">
                            {
                              project.category
                            }
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
                            href={
                              project.liveUrl
                            }
                            target="_blank"
                            rel="noopener noreferrer"
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
                  )
                )}
              </div>
            )}
          </div>
        </section>

        {/* Pricing */}
        <section className="section pricing-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">
                  Flexible Pricing
                </span>

                <h2>
                  Plans created according to
                  your needs
                </h2>

                <p>
                  Choose a suitable plan or
                  contact us for a custom
                  quotation.
                </p>
              </div>

              <Link
                className="section-link"
                to="/pricing"
              >
                View all pricing
              </Link>
            </div>

            {loading ? (
              <div className="content-loading">
                Loading pricing plans...
              </div>
            ) : pricing.length ===
              0 ? (
              <div className="empty-content">
                No pricing plans are available
                right now.
              </div>
            ) : (
              <div className="pricing-grid">
                {pricing.map(
                  (plan, index) => (
                    <article
                      className={
                        plan.highlighted
                          ? "pricing-card highlighted"
                          : "pricing-card"
                      }
                      key={
                        plan._id ||
                        `${plan.planName}-${index}`
                      }
                    >
                      {plan.highlighted && (
                        <span className="popular-badge">
                          Popular
                        </span>
                      )}

                      <div className="pricing-image">
                        <img
                          src={getImageUrl(
                            plan
                          )}
                          alt={
                            plan.planName ||
                            "Tech Digital Designers pricing plan"
                          }
                          loading="lazy"
                          onError={
                            handleImageError
                          }
                        />
                      </div>

                      <div className="pricing-card-body">
                        <small>
                          {plan.serviceName ||
                            "Digital Service"}
                        </small>

                        <h3>
                          {plan.planName ||
                            "Basic Plan"}
                        </h3>

                        <div className="price">
                          <span>
                            ₹
                          </span>

                          <strong>
                            {Number(
                              plan.price || 0
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </strong>
                        </div>

                        <p className="billing-text">
                          {plan.billingText ||
                            "Starting price"}
                        </p>

                        {Array.isArray(
                          plan.features
                        ) &&
                          plan.features
                            .length >
                            0 && (
                            <ul className="pricing-features">
                              {plan.features
                                .slice(
                                  0,
                                  5
                                )
                                .map(
                                  (
                                    feature,
                                    featureIndex
                                  ) => (
                                    <li
                                      key={
                                        featureIndex
                                      }
                                    >
                                      {
                                        feature
                                      }
                                    </li>
                                  )
                                )}
                            </ul>
                          )}

                        <Link
                          className="btn pricing-button"
                          to={`/contact?service=${encodeURIComponent(
                            plan.serviceName ||
                              plan.planName ||
                              "Pricing Plan"
                          )}`}
                        >
                          Choose Plan
                        </Link>
                      </div>
                    </article>
                  )
                )}
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
                Ready to grow your business
                digitally?
              </h2>

              <p>
                Contact Tech Digital Designers
                for websites, apps, promotion,
                designs, advertisements and
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