import React from "react";
import "./PageHero.css";
export default function PageHero({
  eyebrow,
  title,
  text,
}) {
  return (
    <section className="page-hero">
      <div className="container">
        <span className="eyebrow">
          {eyebrow}
        </span>

        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  );
}
