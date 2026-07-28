import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Link,
  useSearchParams,
} from "react-router-dom";

import API from "../api";
import PageHero from "../components/PageHero";
import SEO from "../components/SEO";
import ServiceEnquiryModal from "../components/ServiceEnquiryModal";

import "./services.css";

function makeSlug(value = "") {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function Services() {
  const [items, setItems] = useState([]);
  const [selectedService, setSelectedService] =
    useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] =
    useSearchParams();
  const selectedSectionRef = useRef(null);

  const requestedCategory =
    searchParams.get("category") || "";

  useEffect(() => {
    let isMounted = true;

    async function loadItems() {
      setLoading(true);
      setError("");

      try {
        const response =
          await API.get("/content/services");

        if (!isMounted) return;

        setItems(
          Array.isArray(response.data)
            ? response.data
            : response.data?.items || []
        );
      } catch (requestError) {
        console.error(
          "Services load error:",
          requestError
        );

        if (isMounted) {
          setError(
            requestError.response?.data?.message ||
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

  const categories = useMemo(() => {
    const groups = new Map();

    items.forEach((item) => {
      const category =
        item.category?.trim() ||
        "Other Services";
      const slug =
        item.categorySlug ||
        makeSlug(category);

      if (!groups.has(slug)) {
        groups.set(slug, {
          slug,
          title: category,
          description:
            item.categoryDescription ||
            `Explore our ${category} solutions.`,
          order:
            Number(item.categoryOrder) || 0,
          items: [],
        });
      }

      const group = groups.get(slug);
      group.items.push(item);

      if (item.showCategoryOnHome) {
        group.description =
          item.categoryDescription ||
          group.description;
        group.order =
          Number(item.categoryOrder) ||
          group.order;
      }
    });

    const result = [...groups.values()]
      .map((group) => ({
        ...group,
        items: group.items.sort(
          (a, b) =>
            (Number(a.order) || 0) -
              (Number(b.order) || 0) ||
            String(a.title).localeCompare(
              String(b.title)
            )
        ),
      }))
      .sort(
        (a, b) =>
          a.order - b.order ||
          a.title.localeCompare(b.title)
      );

    if (!requestedCategory) {
      return result;
    }

    return result.sort((a, b) => {
      if (a.slug === requestedCategory) return -1;
      if (b.slug === requestedCategory) return 1;
      return 0;
    });
  }, [items, requestedCategory]);

  useEffect(() => {
    if (
      !loading &&
      requestedCategory &&
      selectedSectionRef.current
    ) {
      window.setTimeout(() => {
        selectedSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 150);
    }
  }, [loading, requestedCategory, categories]);

  function selectCategory(slug) {
    setSearchParams({ category: slug });
  }

  function handleImageError(event) {
    event.currentTarget.src =
      "/service-placeholder.jpg";
    event.currentTarget.onerror = null;
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
        text="Choose a category and explore every service available inside it."
      />

      <section className="section services-page-section">
        <div className="container">
          <div className="services-intro">
            <span className="eyebrow">
              What We Offer
            </span>
            <h2>
              Category-wise digital solutions
            </h2>
            <p>
              Select a category, choose a service
              and share your requirements.
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
            categories.length === 0 && (
              <div className="services-loading">
                No services are available right now.
              </div>
            )}

          {!loading &&
            !error &&
            categories.length > 0 && (
              <>
                <nav
                  className="service-category-nav"
                  aria-label="Service categories"
                >
                  {categories.map((category) => (
                    <button
                      type="button"
                      key={category.slug}
                      className={
                        requestedCategory ===
                        category.slug
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        selectCategory(category.slug)
                      }
                    >
                      {category.title}
                    </button>
                  ))}
                </nav>

                <div className="service-category-sections">
                  {categories.map(
                    (category, categoryIndex) => {
                      const isSelected =
                        requestedCategory ===
                          category.slug ||
                        (!requestedCategory &&
                          categoryIndex === 0);

                      return (
                        <section
                          className={
                            isSelected
                              ? "service-category-section selected"
                              : "service-category-section"
                          }
                          id={category.slug}
                          key={category.slug}
                          ref={
                            isSelected
                              ? selectedSectionRef
                              : null
                          }
                        >
                          <div className="service-category-heading">
                            <div>
                              <span>
                                Service Category
                              </span>
                              <h2>
                                {category.title}
                              </h2>
                              <p>
                                {category.description}
                              </p>
                            </div>

                            <strong>
                              {category.items.length}{" "}
                              Services
                            </strong>
                          </div>

                          <div className="services-grid">
                            {category.items.map(
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
                                        category.title
                                      }
                                      loading="lazy"
                                      onError={
                                        handleImageError
                                      }
                                    />
                                    <span className="service-category">
                                      {category.title}
                                    </span>
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
                        </section>
                      );
                    }
                  )}
                </div>
              </>
            )}
        </div>
      </section>

      <section className="services-cta">
        <div className="container services-cta-content">
          <div>
            <span className="eyebrow">
              Need a Custom Service?
            </span>
            <h2>Tell us what your business needs</h2>
            <p>
              We can create a custom digital package
              according to your requirements and budget.
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