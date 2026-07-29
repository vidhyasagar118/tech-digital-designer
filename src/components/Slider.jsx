import React, {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import API from "../api";

import {
  getImageUrl,
  handleImageError,
} from "../utils/image";

import "./Slider.css";

const AUTO_SLIDE_DELAY = 5500;

function formatSlideNumber(number) {
  return String(number).padStart(2, "0");
}

export default function Slider() {
  const [slides, setSlides] =
    useState([]);

  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadSlides() {
      try {
        setLoading(true);

        const response =
          await API.get(
            "/content/sliders"
          );

        if (!isMounted) {
          return;
        }

        const sliderData =
          Array.isArray(response.data)
            ? response.data
            : response.data?.slides ||
              response.data?.items ||
              [];

        const activeSlides =
          sliderData
            .filter(
              (slide) =>
                slide.active !== false
            )
            .sort(
              (first, second) =>
                Number(first.order || 0) -
                Number(second.order || 0)
            );

        setSlides(activeSlides);
        setActiveIndex(0);
      } catch (error) {
        console.error(
          "Slider load error:",
          error
        );

        if (isMounted) {
          setSlides([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadSlides();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (slides.length <= 1) {
      return undefined;
    }

    const intervalId =
      window.setInterval(() => {
        setActiveIndex(
          (currentIndex) =>
            (currentIndex + 1) %
            slides.length
        );
      }, AUTO_SLIDE_DELAY);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [slides.length]);

  function showPrevious() {
    if (!slides.length) {
      return;
    }

    setActiveIndex(
      (currentIndex) =>
        (currentIndex -
          1 +
          slides.length) %
        slides.length
    );
  }

  function showNext() {
    if (!slides.length) {
      return;
    }

    setActiveIndex(
      (currentIndex) =>
        (currentIndex + 1) %
        slides.length
    );
  }

  if (loading) {
    return (
      <section className="showcase-slider-section">
        <div className="showcase-slider showcase-slider-loading">
          <div className="showcase-loading-bar" />
        </div>
      </section>
    );
  }

  if (!slides.length) {
    return null;
  }

  return (
    <section
      className="showcase-slider-section"
      aria-label="Featured banners"
    >
      <div className="showcase-slider">
        <div className="showcase-track">
          {slides.map(
            (slide, index) => (
              <article
                className={`showcase-slide ${
                  index === activeIndex
                    ? "active"
                    : ""
                }`}
                key={
                  slide._id ||
                  `${slide.title}-${index}`
                }
                aria-hidden={
                  index !== activeIndex
                }
              >
                <div className="showcase-content">
                  {slide.subtitle && (
                    <span className="showcase-eyebrow">
                      {slide.subtitle}
                    </span>
                  )}

                  {slide.title && (
                    <h1>{slide.title}</h1>
                  )}

                  <p className="showcase-description">
                    {slide.description ||
                      slide.shortDescription ||
                      "Modern websites, powerful digital products and creative solutions designed to help your business grow."}
                  </p>

                  <div className="showcase-buttons">
                    {slide.buttonText &&
                      slide.buttonLink && (
                        <Link
                          className="showcase-primary-button"
                          to={slide.buttonLink}
                          tabIndex={
                            index === activeIndex
                              ? 0
                              : -1
                          }
                        >
                          {slide.buttonText}
                        </Link>
                      )}

                    <Link
                      className="showcase-secondary-button"
                      to="/projects"
                      tabIndex={
                        index === activeIndex
                          ? 0
                          : -1
                      }
                    >
                      View Work
                      <ArrowRight
                        size={18}
                        aria-hidden="true"
                      />
                    </Link>
                  </div>

                  <div className="showcase-progress">
                    <span>
                      {formatSlideNumber(
                        activeIndex + 1
                      )}{" "}
                      /{" "}
                      {formatSlideNumber(
                        slides.length
                      )}
                    </span>

                    <div className="showcase-progress-lines">
                      {slides.map(
                        (
                          progressSlide,
                          progressIndex
                        ) => (
                          <button
                            key={
                              progressSlide._id ||
                              `progress-${progressIndex}`
                            }
                            className={
                              progressIndex ===
                              activeIndex
                                ? "active"
                                : ""
                            }
                            type="button"
                            onClick={() =>
                              setActiveIndex(
                                progressIndex
                              )
                            }
                            aria-label={`Show slide ${
                              progressIndex + 1
                            }`}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>

                <div className="showcase-media">
                  <img
                    src={getImageUrl(slide)}
                    alt={
                      slide.title ||
                      "Website banner"
                    }
                    onError={
                      handleImageError
                    }
                  />

                  <span className="showcase-decoration showcase-decoration-one" />
                  <span className="showcase-decoration showcase-decoration-two" />
                </div>
              </article>
            )
          )}
        </div>

        {slides.length > 1 && (
          <>
            <button
              className="showcase-arrow showcase-arrow-left"
              type="button"
              onClick={showPrevious}
              aria-label="Previous slide"
            >
              <ChevronLeft size={26} />
            </button>

            <button
              className="showcase-arrow showcase-arrow-right"
              type="button"
              onClick={showNext}
              aria-label="Next slide"
            >
              <ChevronRight size={26} />
            </button>
          </>
        )}
      </div>

      {slides.length > 1 && (
        <div className="showcase-thumbnails">
          {slides.map(
            (slide, index) => (
              <button
                className={`showcase-thumbnail ${
                  index === activeIndex
                    ? "active"
                    : ""
                }`}
                key={
                  slide._id ||
                  `thumbnail-${index}`
                }
                type="button"
                onClick={() =>
                  setActiveIndex(index)
                }
                aria-label={`Show slide ${
                  index + 1
                }`}
              >
                <strong>
                  {formatSlideNumber(
                    index + 1
                  )}
                </strong>

                <span className="showcase-thumbnail-image">
                  <img
                    src={getImageUrl(slide)}
                    alt=""
                    onError={
                      handleImageError
                    }
                  />
                </span>
              </button>
            )
          )}
        </div>
      )}
    </section>
  );
}