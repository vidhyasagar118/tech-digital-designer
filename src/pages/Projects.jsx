import React, {
  useEffect,
  useState,
} from "react";

import "./Projects.css";

import API from "../api";
import PageHero from "../components/PageHero";
import SEO from "../components/SEO";

export default function Projects() {
  const [items, setItems] =
    useState([]);

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
            "/content/projects"
          );

        if (!isMounted) {
          return;
        }

        const projectsData =
          Array.isArray(
            response.data
          )
            ? response.data
            : response.data?.items ||
              response.data?.projects ||
              [];

        setItems(projectsData);
      } catch (error) {
        console.error(
          "Projects load error:",
          error
        );

        if (isMounted) {
          setError(
            error.response?.data
              ?.message ||
              "Projects could not be loaded."
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
      "/project-placeholder.jpg";

    event.currentTarget.onerror =
      null;
  }

  return (
    <>
      <SEO
        title="Website and App Development Portfolio"
        description="Explore website development, ecommerce, education, business, car rental, taxi service and digital design projects completed by Tech Digital Designers."
        keywords="Tech Digital Designers projects, website development portfolio, web design projects, React projects, app development portfolio, ecommerce website portfolio, digital agency projects India"
        path="/projects"
      />

      <main className="projects-page">
        <PageHero
          eyebrow="Our Projects"
          title="Projects created for different business needs"
          text="Explore websites and digital platforms designed and developed by Tech Digital Designers."
        />

        <section className="section projects-section">
          <div className="container">
            <div className="projects-heading">
              <span className="eyebrow">
                Recent Work
              </span>

              <h2>
                Ideas transformed into useful
                digital products
              </h2>

              <p>
                Explore our website,
                application and digital design
                projects created for different
                industries and business
                requirements.
              </p>
            </div>

            {loading && (
              <div
                className="projects-message"
                role="status"
              >
                Loading projects...
              </div>
            )}

            {!loading && error && (
              <div
                className="projects-message projects-error"
                role="alert"
              >
                {error}
              </div>
            )}

            {!loading &&
              !error &&
              items.length === 0 && (
                <div className="projects-message">
                  No projects are available
                  right now.
                </div>
              )}

            {!loading &&
              !error &&
              items.length > 0 && (
                <div className="projects-grid">
                  {items.map(
                    (item) => (
                      <article
                        className="project-card"
                        key={
                          item._id ||
                          item.id ||
                          item.title
                        }
                      >
                        <div className="project-image">
                          <img
                            src={
                              item.imageUrl ||
                              "/project-placeholder.jpg"
                            }
                            alt={
                              item.title
                                ? `${item.title} project by Tech Digital Designers`
                                : "Digital project by Tech Digital Designers"
                            }
                            loading="lazy"
                            onError={
                              handleImageError
                            }
                          />

                          {item.featured && (
                            <span className="featured-label">
                              Featured
                            </span>
                          )}
                        </div>

                        <div className="project-content">
                          {item.category && (
                            <small>
                              {
                                item.category
                              }
                            </small>
                          )}

                          <h3>
                            {item.title ||
                              "Tech Digital Designers Project"}
                          </h3>

                          <p>
                            {item.shortDescription ||
                              item.description ||
                              "A professionally designed and developed digital project."}
                          </p>

                          {item.liveUrl ? (
                            <a
                              className="project-live-button"
                              href={
                                item.liveUrl
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`View ${
                                item.title ||
                                "project"
                              } live`}
                            >
                              View Live Project

                              <span aria-hidden="true">
                                ↗
                              </span>
                            </a>
                          ) : (
                            <span className="project-unavailable">
                              Live demo coming
                              soon
                            </span>
                          )}
                        </div>
                      </article>
                    )
                  )}
                </div>
              )}
          </div>
        </section>
      </main>
    </>
  );
}