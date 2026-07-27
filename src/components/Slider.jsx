import React, {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

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

        setSlides(sliderData);
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
      }, 4500);

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

  if (!slides.length) {
    return (
      <section className="fallback-hero">
        <div className="container">
          <span className="eyebrow">
            Tech Digital Designers
          </span>

          <h1>
            Simple digital solutions for real
            business growth
          </h1>

          <p>
            Websites, branding, promotion,
            social media, SEO and professional
            design.
          </p>

          <Link
            className="btn"
            to="/contact"
          >
            Start a Project
          </Link>
        </div>
      </section>
    );
  }

  const slide =
    slides[activeIndex] ||
    slides[0];

  return (
    <section
      className="slider"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(15, 23, 42, 0.65),
            rgba(15, 23, 42, 0.65)
          ),
          url("${slide.imageUrl}")
        `,
      }}
    >
      <div className="container slider-content">
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
          className="btn btn-light"
          to={
            slide.buttonLink ||
            "/contact"
          }
        >
          {slide.buttonText ||
            "Start a Project"}
        </Link>

        {slides.length > 1 && (
          <div className="slider-dots">
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
        )}
      </div>
    </section>
  );
}