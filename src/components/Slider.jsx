import React, {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import API from "../api";

import "./Slider.css";

export default function Slider() {
  const [slides, setSlides] =
    useState([]);

  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function loadSlides() {
      try {
        const response =
          await API.get(
            "/content/sliders"
          );

        if (!isMounted) {
          return;
        }

        const sliderData =
          Array.isArray(
            response.data
          )
            ? response.data
            : response.data?.slides ||
              response.data?.items ||
              [];

        const activeSlides =
          sliderData.filter(
            (slide) =>
              slide.active !== false
          );

        setSlides(activeSlides);
      } catch (error) {
        console.error(
          "Slider load error:",
          error
        );
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

    const interval =
      window.setInterval(() => {
        setActiveIndex(
          (currentIndex) =>
            (currentIndex + 1) %
            slides.length
        );
      }, 5000);

    return () => {
      window.clearInterval(
        interval
      );
    };
  }, [slides.length]);

  useEffect(() => {
    if (
      slides.length > 0 &&
      activeIndex >= slides.length
    ) {
      setActiveIndex(0);
    }
  }, [
    activeIndex,
    slides.length,
  ]);

  function showPreviousSlide() {
    setActiveIndex(
      (currentIndex) =>
        currentIndex === 0
          ? slides.length - 1
          : currentIndex - 1
    );
  }

  function showNextSlide() {
    setActiveIndex(
      (currentIndex) =>
        (currentIndex + 1) %
        slides.length
    );
  }

  if (!slides.length) {
    return (
      <section className="fallback-hero">
        <div className="slider-overlay" />

        <div className="container slider-content">
          <div className="slider-text">
            <span className="eyebrow">
              Tech Digital Designers
            </span>

            <h1>
              Simple digital solutions for
              real business growth
            </h1>

            <p>
              Websites, branding, promotion,
              social media, SEO and
              professional design.
            </p>

            <Link
              className="btn slider-button"
              to="/contact"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const slide =
    slides[activeIndex] ||
    slides[0];

  const slideKey =
    slide._id ||
    slide.id ||
    activeIndex;

  return (
    <section
      className="slider"
      style={{
        backgroundImage: `
          linear-gradient(
            90deg,
            rgba(2, 6, 23, 0.82) 0%,
            rgba(15, 23, 42, 0.64) 48%,
            rgba(15, 23, 42, 0.38) 100%
          ),
          url("${slide.imageUrl}")
        `,
      }}
    >
      <div className="slider-overlay" />

      <div className="container slider-content">
        <div
          className="slider-text"
          key={slideKey}
        >
          <span className="eyebrow">
            Tech Digital Designers
          </span>

          <h1>
            {slide.title ||
              "Simple digital solutions for real business growth"}
          </h1>

          <p>
            {slide.subtitle ||
              "Websites, branding, promotion, social media, SEO and professional design."}
          </p>

          <Link
            className="btn btn-light slider-button"
            to={
              slide.buttonLink ||
              "/contact"
            }
          >
            {slide.buttonText ||
              "Start a Project"}
          </Link>
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            className="slider-arrow slider-arrow-left"
            onClick={showPreviousSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft
              size={25}
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            className="slider-arrow slider-arrow-right"
            onClick={showNextSlide}
            aria-label="Next slide"
          >
            <ChevronRight
              size={25}
              aria-hidden="true"
            />
          </button>

          <div
            className="slider-dots"
            aria-label="Slider navigation"
          >
            {slides.map(
              (item, index) => (
                <button
                  type="button"
                  key={
                    item._id ||
                    item.id ||
                    index
                  }
                  className={
                    index === activeIndex
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setActiveIndex(
                      index
                    )
                  }
                  aria-label={`Open slide ${
                    index + 1
                  }`}
                  aria-current={
                    index === activeIndex
                      ? "true"
                      : undefined
                  }
                />
              )
            )}
          </div>
        </>
      )}
    </section>
  );
}