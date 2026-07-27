import React from "react";
import "./Slider.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import API from "../api";

export default function Slider() {
  const [slides, setSlides] = useState([]);
  const [activeIndex, setActiveIndex] =
    useState(0);

  useEffect(() => {
    async function loadSlides() {
      try {
        const response = await API.get(
          "/content/sliders"
        );

        setSlides(response.data);
      } catch (error) {
        console.error(
          "Slider load error:",
          error
        );
      }
    }

    loadSlides();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) {
      return undefined;
    }

    const interval = setInterval(() => {
      setActiveIndex((current) =>
        (current + 1) % slides.length
      );
    }, 4500);

    return () => clearInterval(interval);
  }, [slides.length]);

  if (!slides.length) {
    return (
      <section className="fallback-hero">
        <div className="container">
          <span className="eyebrow">
              Tech Digital Designer

          </span>

          <h1>
            Simple digital solutions for real
            business growth
          </h1>

          <p>
            Websites, branding, promotion, social
            media, SEO and professional design.
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

  const slide = slides[activeIndex];

  return (
    <section
      className="slider"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(15, 23, 42, 0.65),
            rgba(15, 23, 42, 0.65)
          ),
          url(${slide.imageUrl})
        `,
      }}
    >
      <div className="container slider-content">
        <span className="eyebrow">
                        Tech Digital Designer

        </span>

        <h1>{slide.title}</h1>
        <p>{slide.subtitle}</p>

        <Link
          className="btn btn-light"
          to={slide.buttonLink}
        >
          {slide.buttonText}
        </Link>

        <div className="slider-dots">
          {slides.map((item, index) => (
            <button
              key={item._id}
              className={
                index === activeIndex
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveIndex(index)
              }
              aria-label={`Open slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
