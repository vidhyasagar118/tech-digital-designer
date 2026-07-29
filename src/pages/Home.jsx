import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  BadgeIndianRupee,
  BarChart3,
  Clock3,
  Cpu,
  FileText,
  Headphones,
  Monitor,
  Palette,
  Search,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Users,
  Wrench,
} from "lucide-react";

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

import "./Home.css";

function makeSlug(value = "") {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getServiceIcon(value = "") {
  const normalizedValue =
    String(value).toLowerCase();

  if (
    normalizedValue.includes("e-commerce") ||
    normalizedValue.includes("ecommerce") ||
    normalizedValue.includes("store") ||
    normalizedValue.includes("shop")
  ) {
    return ShoppingCart;
  }

  if (
    normalizedValue.includes("mobile") ||
    normalizedValue.includes("app")
  ) {
    return Smartphone;
  }

  if (
    normalizedValue.includes("marketing") ||
    normalizedValue.includes("ads") ||
    normalizedValue.includes("promotion")
  ) {
    return BarChart3;
  }

  if (
    normalizedValue.includes("graphic") ||
    normalizedValue.includes("brand") ||
    normalizedValue.includes("design")
  ) {
    return Palette;
  }

  if (
    normalizedValue.includes("maintenance") ||
    normalizedValue.includes("support")
  ) {
    return Wrench;
  }

  if (
    normalizedValue.includes("resume") ||
    normalizedValue.includes("document")
  ) {
    return FileText;
  }

  if (
    normalizedValue.includes("seo") ||
    normalizedValue.includes("search")
  ) {
    return Search;
  }

  return Monitor;
}

function getServiceIconTheme(value = "") {
  const normalizedValue =
    String(value).toLowerCase();

  if (
    normalizedValue.includes("e-commerce") ||
    normalizedValue.includes("ecommerce") ||
    normalizedValue.includes("store") ||
    normalizedValue.includes("shop")
  ) {
    return "orange";
  }

  if (
    normalizedValue.includes("mobile") ||
    normalizedValue.includes("app")
  ) {
    return "violet";
  }

  if (
    normalizedValue.includes("marketing") ||
    normalizedValue.includes("ads") ||
    normalizedValue.includes("promotion")
  ) {
    return "pink";
  }

  if (
    normalizedValue.includes("graphic") ||
    normalizedValue.includes("brand") ||
    normalizedValue.includes("design")
  ) {
    return "purple";
  }

  if (
    normalizedValue.includes("maintenance") ||
    normalizedValue.includes("support")
  ) {
    return "green";
  }

  if (
    normalizedValue.includes("resume") ||
    normalizedValue.includes("document")
  ) {
    return "amber";
  }

  if (
    normalizedValue.includes("seo") ||
    normalizedValue.includes("search")
  ) {
    return "teal";
  }

  return "blue";
}

const whyChooseItems = [
  {
    icon: Clock3,
    title: "Fast Delivery",
    text: "On-time delivery with an agile and transparent working process.",
  },
  {
    icon: ShieldCheck,
    title: "Premium Quality",
    text: "Reliable digital solutions created with attention to every detail.",
  },
  {
    icon: Users,
    title: "Expert Team",
    text: "Skilled professionals with practical design and development expertise.",
  },
  {
    icon: Cpu,
    title: "Latest Technologies",
    text: "Modern, scalable and future-ready technology solutions.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    text: "Helpful support before, during and after project delivery.",
  },
  {
    icon: BadgeIndianRupee,
    title: "Affordable Pricing",
    text: "Flexible packages designed around your goals and budget.",
  },
];

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
        );
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

        {/* Why Choose Us */}
        <section className="section why-choose-section">
          <div className="container why-choose-layout">
            <div className="why-choose-visual">
              <div className="why-choose-glow" />

              <img
                src="/why-choose-us-rocket.jpeg"
                alt="Digital business growth rocket illustration"
                loading="lazy"
                onError={handleImageError}
              />
            </div>

            <div className="why-choose-content">
              <div className="why-choose-heading">
                <span className="eyebrow">
                  Why Choose Us?
                </span>

                <h2>
                  Your success is our priority
                </h2>

                <p>
                  We combine strategy,
                  creativity and technology to
                  deliver solutions that create
                  measurable business impact.
                </p>
              </div>

              <div className="why-choose-grid">
                {whyChooseItems.map(
                  ({
                    icon: Icon,
                    title,
                    text,
                  }) => (
                    <article
                      className="why-choose-card"
                      key={title}
                    >
                      <span className="why-choose-icon">
                        <Icon
                          size={24}
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </span>

                      <div>
                        <h3>{title}</h3>
                        <p>{text}</p>
                      </div>
                    </article>
                  )
                )}
              </div>
            </div>
          </div>
        </section>
        {/* Services */}
        <section className="section home-services-showcase">
          <div className="container">
            <div className="home-services-heading">
              <span className="eyebrow">
                Our Services
              </span>

              <h2>
                Complete digital solutions to
                grow your business online.
              </h2>
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
              <div className="home-services-grid">
                {serviceCategories
                  .slice(0, 8)
                  .map((category) => {
                    const ServiceIcon =
                      getServiceIcon(
                        `${category.title} ${category.description}`
                      );

                    const iconTheme =
                      getServiceIconTheme(
                        `${category.title} ${category.description}`
                      );

                    return (
                      <Link
                        className="home-service-box"
                        key={category.slug}
                        to={`/services?category=${encodeURIComponent(
                          category.slug
                        )}`}
                      >
                        <span
                          className={`home-service-icon ${iconTheme}`}
                        >
                          <ServiceIcon
                            size={27}
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        </span>

                        <h3>
                          {category.title}
                        </h3>

                        <p>
                          {
                            category.description
                          }
                        </p>

                        <span className="home-service-learn">
                          Learn more
                          <span aria-hidden="true">
                            →
                          </span>
                        </span>
                      </Link>
                    );
                  })}
              </div>
            )}

            <div className="home-services-footer">
              <Link
                className="section-link"
                to="/services"
              >
                View all services
              </Link>
            </div>
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
  {/* About Preview */}
        <section className="section home-about-section">
          <div className="container home-about-layout">
            <div className="home-about-content">
              <span className="eyebrow">
                About Tech Digital Designers
              </span>

              <h2>
                Creative ideas, useful
                technology and measurable
                digital growth
              </h2>

              <p>
                Tech Digital Designers helps
                businesses, professionals and
                startups create a strong digital
                presence through modern
                websites, mobile applications,
                marketing, branding and creative
                design.
              </p>

              <p>
                We focus on understanding your
                goals and delivering practical,
                reliable and affordable
                solutions that support long-term
                business growth.
              </p>

              <Link
                className="btn home-about-button"
                to="/about"
              >
                Learn More About Us
              </Link>
            </div>

            <div className="home-about-highlights">
              <article>
                <strong>Complete</strong>
                <span>Digital Solutions</span>
                <p>
                  Development, marketing and
                  creative services in one place.
                </p>
              </article>

              <article>
                <strong>Custom</strong>
                <span>Business Strategy</span>
                <p>
                  Solutions planned according to
                  your goals and audience.
                </p>
              </article>

              <article>
                <strong>Modern</strong>
                <span>Technology</span>
                <p>
                  Responsive, scalable and
                  future-ready digital products.
                </p>
              </article>

              <article>
                <strong>Reliable</strong>
                <span>Project Support</span>
                <p>
                  Clear communication and
                  support throughout the project.
                </p>
              </article>
            </div>
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