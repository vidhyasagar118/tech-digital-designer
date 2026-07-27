import React, {
  useEffect,
  useState,
} from "react";
import "./Projects.css";

import API from "../api";
import PageHero from "../components/PageHero";

export default function Projects() {
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
          "/content/projects"
        );

        if (!isMounted) return;

        const projectsData = Array.isArray(
          response.data
        )
          ? response.data
          : response.data?.items || [];

        setItems(projectsData);
      } catch (error) {
        console.error(
          "Projects load error:",
          error
        );

        if (isMounted) {
          setError(
            error.response?.data?.message ||
              "Projects load nahi ho sake."
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
    <main className="projects-page">
      <PageHero
        eyebrow="Our Projects"
        title="Projects created for different business needs"
        text="Explore websites and digital platforms designed and developed by     Tech Digital Designer."
      />

      <section className="section projects-section">
        <div className="container">
          <div className="projects-heading">
            <span className="eyebrow">
              Recent Work
            </span>

            <h2>
              Ideas transformed into useful digital
              products
            </h2>

            <p>
              Click on View Live Project to explore the
              complete website.
            </p>
          </div>

          {loading && (
            <div className="projects-message">
              Loading projects...
            </div>
          )}

          {!loading && error && (
            <div className="projects-message projects-error">
              {error}
            </div>
          )}

          {!loading &&
            !error &&
            items.length === 0 && (
              <div className="projects-message">
                No projects available right now.
              </div>
            )}

          {!loading &&
            !error &&
            items.length > 0 && (
              <div className="projects-grid">
                {items.map((item) => (
                  <article
                    className="project-card"
                    key={item._id}
                  >
                    <div className="project-image">
                      <img
                        src={item.imageUrl}
                        alt={
                          item.title ||
                          "WebVistiq project"
                        }
                        loading="lazy"
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
                          {item.category}
                        </small>
                      )}

                      <h3>
                        {item.title ||
                          "WebVistiq Project"}
                      </h3>

                      <p>
                        {item.shortDescription ||
                          item.description ||
                          "A professionally developed digital project."}
                      </p>

                      {item.liveUrl ? (
                        <a
                          className="project-live-button"
                          href={item.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Live Project
                          <span aria-hidden="true">
                            ↗
                          </span>
                        </a>
                      ) : (
                        <span className="project-unavailable">
                          Live demo coming soon
                        </span>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
        </div>
      </section>
    </main>
  );
}